# Cloud Build Notifications

Cloud Build Notifications simplifies the setup of receiving, parsing and delivering the `cloud-build` messages to different channels.

Currently, it supports the following recepient channels:

1. Google Chat Room

## Prerequisites

Make sure you have the following items setup on your system:

1. [gcloud sdk](https://cloud.google.com/sdk/docs/install)
2. [Docker](https://docs.docker.com/engine/install/)
3. git
4. bash

## How to Setup?

1. Take a clone of this repository:

   ```shell
   git clone https://github.com/mukarramishaq/cloud-build-notifications.git
   ```

2. Rename `.env.sample` file to `.env` and update the values to that of yours.

3. Make sure you have gcloud cli setup on system and initialized it with your credentials. ([gcloud sdk installation](https://cloud.google.com/sdk/docs/install))

4. Make sure [Docker](https://docs.docker.com/engine/install/) is installed.

5. Change permission of `setup.sh` file:

    ```shell
   chmod +x ./setup.sh
   ```

6. Run the following command to configure the rest:

    ```shell
    ./setup.sh -p {PROJECT_NAME} -l {LOCATION}
    ```

   Here `PROJECT_NAME` is where you want to configure this cloud build notifications system and `LOCATION` is the default location of all the necessary apis which will be configured for this installation.

   For example:

   ```shell
   ./setup.sh -p whiteboard -l us-central1
   ```
