# AWS config
mkdir -p ~/.aws

cat << EOF > ~/.aws/credentials
[default]
aws_access_key_id = ${AWS_ACCESS_KEY_ID}
aws_secret_access_key = ${AWS_SECRET_ACCESS_KEY}
EOF

cat << EOF > ~/.aws/config
[default]
region = ${AWS_DEFAULT_REGION}
output = ${AWS_DEFAULT_OUTPUT}
EOF


# Lambda environment config
cat << EOF > config/environment.json
{
  "DEBUG": "${DEBUG}",
  "ENVIRONMENT": "${ENVIRONMENT}",

  "DAILYBOT_ASSETS_URL": "${DAILYBOT_ASSETS_URL}",
  "DAILYBOT_APP_MAIN_URL": "${DAILYBOT_APP_MAIN_URL}",
  "DAILYBOT_LANDING_PAGE": "${DAILYBOT_LANDING_PAGE}",
  "DAILYBOT_CHICKEN_URL": "${DAILYBOT_CHICKEN_URL}",
  "DAILYBOT_API_PREFIX": "${DAILYBOT_API_PREFIX}",
  "DAILYBOT_SECRET_TOKEN": "${DAILYBOT_SECRET_TOKEN}",
  "DAILYBOT_FEEDBACK_WEBHOOK": "${DAILYBOT_FEEDBACK_WEBHOOK}",
  "DAILYBOT_FEEDBACK_CHANNEL": "${DAILYBOT_FEEDBACK_CHANNEL}",

  "DYNAMODB_TABLE_NAME_USERCHATS": "${DYNAMODB_TABLE_NAME_USERCHATS}",
  "DYNAMODB_TABLE_NAME_CHANNELS": "${DYNAMODB_TABLE_NAME_CHANNELS}",
  "DYNAMODB_TABLE_NAME_RESPONSES": "${DYNAMODB_TABLE_NAME_RESPONSES}",
  "DYNAMODB_TABLE_NAME_CONSTANCES": "${DYNAMODB_TABLE_NAME_CONSTANCES}",

  "GAUTH_type": "${GAUTH_type}",
  "GAUTH_project_id": "${GAUTH_project_id}",
  "GAUTH_private_key_id": "${GAUTH_private_key_id}",
  "GAUTH_private_key": "${GAUTH_private_key}",
  "GAUTH_client_email": "${GAUTH_client_email}",
  "GAUTH_client_id": "${GAUTH_client_id}",
  "GAUTH_auth_uri": "${GAUTH_auth_uri}",
  "GAUTH_token_uri": "${GAUTH_token_uri}",
  "GAUTH_auth_provider_x509_cert_url": "${GAUTH_auth_provider_x509_cert_url}",
  "GAUTH_client_x509_cert_url": "${GAUTH_client_x509_cert_url}",

  "MSTEAMS_CLIENT_ID": "${MSTEAMS_CLIENT_ID}",
  "MSTEAMS_CLIENT_SECRET": "${MSTEAMS_CLIENT_SECRET}",
  "MSTEAMS_BOT_ID": "${MSTEAMS_BOT_ID}",
  "MSTEAMS_BOT_SECRET": "${MSTEAMS_BOT_SECRET}",
  "MSTEAMS_BOT_NAME": "${MSTEAMS_BOT_NAME}",
  "MSTEAMS_API_URL_LOGIN": "${MSTEAMS_API_URL_LOGIN}",

  "GANALYTICS_TRACKINGID": "${GANALYTICS_TRACKINGID}",

  "SENTRY_DNS": "${SENTRY_DNS}"
}
EOF
