# Cloud Build Notifications

Cloud Build Notifications simplifies the setup of receiving, parsing and delivering the `cloud-build` messages to different channels.

Currently, it supports the following recepient channels:

1. Google Chat Room
2. SMTP for Emails

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

This setup process is same for all type of recipient channels. The only difference is in updating the `.env` file.

### Setup for Google Chat Room Messages

Repeast all the steps in [How to Setup?](#how-to-setup). When you are on updating `.env` variables, uncomment `PROJECT_NAME` and `GOOGLE_CHAT_ROOM_WEBHOOK` and update their values to that of yours.

### Setup for SMTP Email Notifications

Repeast all the steps in [How to Setup?](#how-to-setup). When you are on updating `.env` variables, uncomment and update EMAIL and SMTP variables.

This repository use [nodemailer](https://nodemailer.com/about/) to send emails through SMTP transporter. Currently, [cloud-build-notifications](https://github.com/mukarramishaq/cloud-build-notifications) supports two types of authentication for SMTP:

1. LOGIN
   1. It uses `Email Address` and `Password` to authenticate. It is less secure and for gmail, you'll have to allow less secure apps beforehand.
2. OAUTH2
   1. It uses `Client ID`, `Client Secret` and `Refresh Token` to authenticate

Following ENV variables are necessary irrespective of the authentication type:

1. `SMTP_HOST` e.g for gmail its value is `smtp.gmail.com`.
2. `SMTP_PORT` e.g `465` for secure and `587` for not secure.
3. `SMTP_AUTH_TYPE` It can have one of the following values:
   1. `LOGIN`
   2. `OAUTH2`
4. `SMTP_AUTH_USER` this is an email address through this nodemailer will authenticate and send emails

Now if your authentication type is `LOGIN`, uncomment and update the values of the following ENV variables:

1. `SMTP_AUTH_LOGIN_PASS` This is password to email address

And if your authentication type is `OAUTH2`, uncomment and update the values of the following ENV variables:

1. `SMTP_AUTH_OAUTH2_CLIENT_ID`
2. `SMTP_AUTH_OAUTH2_CLIENT_SECRET`
3. `SMTP_AUTH_OAUTH2_REFRESH_TOKEN`

Rest of the steps in [How to Setup?](#how-to-setup) will remain same.