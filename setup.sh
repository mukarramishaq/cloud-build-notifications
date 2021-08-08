while getopts p:l: flag
do
    case "${flag}" in
        p) project=${OPTARG};;
        l) location=${OPTARG};;
    esac
done
gcloud components update
#extract the project id and store it in a variable for later usage
PROJECT_ID="$(gcloud projects list \
--format='value(PROJECT_ID)' \
--filter=${project})"
echo "setting default project to ${PROJECT_ID} ..."
#set a default project against which we need to setup cloud-build notifications
gcloud config set project "${PROJECT_ID}"

#enable apis
echo "enabling apis ..."
gcloud services enable eventarc.googleapis.com
gcloud services enable run.googleapis.com
gcloud services enable cloudbuild.googleapis.com

#set cloud run's region
echo "setting location for cloud run ..."
gcloud config set run/region ${location}

#set eventarc region
echo "setting location for eventarc ..."
gcloud config set eventarc/location ${location}

#set cloud run platfrom to managed
echo "configuring run platform to managed ..."
gcloud config set run/platform managed

#extract project number and store it in variable for later usage
PROJECT_NUMBER="$(gcloud projects list \
--filter=$(gcloud config get-value project) \
--format='value(PROJECT_NUMBER)')"

#Grant the eventarc.admin role to the default Compute Engine service account
echo "granting eventarc.admin role to default Compute Engine service account ..."
gcloud projects add-iam-policy-binding $(gcloud config get-value project) \
--member=serviceAccount:${PROJECT_NUMBER}-compute@developer.gserviceaccount.com \
--role='roles/eventarc.admin'


#now create our service in the cloud run which will handle the build messages and process them
#first create a docker image
echo "creating docker image of cloud-build-notifications ..."
IMAGE_NAME="gcr.io/${PROJECT_ID}/cloud-build-notifications:latest"
docker build . -t cloud-build-notifications:latest
echo "tagging built image with ${IMAGE_NAME} ..."
docker tag cloud-build-notifications:latest ${IMAGE_NAME}
echo "pushing ${IMAGE_NAME} to GCR ..."
docker push ${IMAGE_NAME}

SERVICE_NAME=send-build-alerts

#now create a run service through this image
echo "creating run service of ${IMAGE_NAME} with name ${SERVICE_NAME} ..."
gcloud run deploy ${SERVICE_NAME} \
--project="${PROJECT_ID}" \
--image="${IMAGE_NAME}" \
--region="${location}" \
--platform="managed" \
--no-allow-unauthenticated


#first check whether `cloud-build` topic exists
#if not then create one
echo "checking if cloud-builds topic exists already ..."
TOPIC_ID=$(gcloud pubsub topics list --filter='cloud-builds' --format='value(name)')

if [ ! "$TOPIC_ID" ];then
   echo "creating cloud-builds topic ..."
   gcloud pubsub topics create cloud-builds
fi

#create pub/sub trigger to receive the `cloud-build` messages
#and to deliver it to our service
TRIGGER_NAME="send-build-alerts-trigger"
echo "creating pub/sub trigger ${TRIGGER_NAME} ..."
gcloud eventarc triggers create ${TRIGGER_NAME} \
--project="${PROJECT_ID}" \
--location="${location}" \
--destination-run-service="${SERVICE_NAME}" \
--destination-run-region="${location}" \
--transport-topic="projects/${PROJECT_ID}/topics/cloud-builds" \
--event-filters="type=google.cloud.pubsub.topic.v1.messagePublished" \
--service-account="${PROJECT_NUMBER}-compute@developer.gserviceaccount.com"