#extract the project id and store it in a variable for later usage
PROJECT_ID="$(gcloud projects list \
--format='value(PROJECT_ID)' \
--filter=${project})"
#set a default project against which we need to setup cloud-build notifications
gcloud config set project

#enable apis
gcloud services enable eventarc.googleapis.com
gcloud services enable run.googleapis.com
gcloud services enable cloudbuild.googleapis.com

#set cloud run's region
gcloud config set run/region us-central1
#set eventarc region
gcloud config set eventarc/location us-central1

#set cloud run platfrom to managed
gcloud config set run/platform managed

#extract project number and store it in variable for later usage
PROJECT_NUMBER="$(gcloud projects list \
--filter=$(gcloud config get-value project) \
--format='value(PROJECT_NUMBER)')"

#Grant the eventarc.admin role to the default Compute Engine service account
gcloud projects add-iam-policy-binding $(gcloud config get-value project) \
--member=serviceAccount:${PROJECT_NUMBER}-compute@developer.gserviceaccount.com \
--role='roles/eventarc.admin'


#now create our service in the cloud run which will handle the build messages and process them
#first create a docker image
IMAGE_NAME="gcr.${PROJECT_ID}.cloud-build-notifications:latest"
docker build . -t cloud-build-notifications:latest
docker tag cloud-build-notifications:latest IMAGE_NAME
docker push IMAGE_NAME
SERVICE_NAME=send-build-alerts
#now create a run service through this image
gcloud run deploy ${SERVICE_NAME} \
--project="${PROJECT_ID}" \
--image="${IMAGE}" \
--region="${location}" \
--platform="managed" \
--no-allow-unauthenticated


#first check whether `cloud-build` topic exists
#if not then create one
TOPIC_ID=$(gcloud pubsub topics list --filter='cloud-builds' --format='value(name)')

if [ ! "$TOPIC_ID" ];then
   gcloud pubsub topics create cloud-builds
fi

#create pub/sub trigger to receive the `cloud-build` messages
#and to deliver it to our service
gcloud beta eventarc triggers create send-build-alerts-trigger \
--project="${PROJECT_ID}" \
--location="${location}" \
--destination-run-service="${SERVICE_NAME}" \
--destination-run-region="${location}" \
--transport-topic="cloud-builds" \
--matching-criteria="type=google.cloud.pubsub.topic.v1.messagePublished" \
--service-account="${PROJECT_NUMBER}-compute@developer.gserviceaccount.com"