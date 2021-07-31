# Cloud Build Notifications

Cloud Build Notifications simplifies the setup of receiving, parsing and delivering the `cloud-build` messages to different channels.

Currently, it supports the following recepient channels:

1. Google Chat Room

## How to Setup?

1. Take a clone of this repository:

   ```shell
   git clone https://github.com/mukarramishaq/cloud-build-notifications.git
   ```

2. Install dependencies:

   ```shell
   yarn install
   ```

3. Make you have gcloud cli setup. ([gcloud sdk installation](https://cloud.google.com/sdk/docs/install))

4. Change permission of `setup.sh` file:

    ```shell
   chmod +x ./setup.sh
   ```

5. Run the following command configure the rest:

    ```shell
    ./setup.sh -p {PROJECT_NAME} -l {LOCATION}
    ```

   Here `PROJECT_NAME` is where you want to configure this cloud build notifications system and `LOCATION` is the default location of all the necessary apis which will be configured for this installation.

   For example:

   ```shell
   ./setup.sh -p whiteboard -l us-central1
   ```
