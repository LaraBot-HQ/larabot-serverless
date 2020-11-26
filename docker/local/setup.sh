#!/bin/bash

# Utils functions
. ./../utils.sh

# Create envs vars if don't exist
utils.load_environment

if [[ "$1" == "base" ]]; then
  utils.printer "Tip: Run this command only the first time outside the container"
  ENV_FILES=(".env" "../../.env" "app/.env")
  utils.check_envs_files "${ENV_FILES[@]}"
  utils.load_vscode_configs
  utils.load_environment_permissions
  utils.check_local_network
  utils.printer "Setup done..."
elif [[ "$1" == "permissions" ]]; then
  utils.printer "Setup permissions..."
  chown -R ${SERVICE_PERMISSIONS} /home/node/app
elif [[ "$1" == "dynamodb:list" ]]; then
  utils.printer "List tables..."
  DYNAMODB_TABLES_LIST=$(npm run dynamodb:local:list)
  echo $DYNAMODB_TABLES_LIST
elif [[ "$1" == "dynamodb:create" ]]; then
  utils.printer "Setup tables..."
  utils.printer
  utils.printer "List tables..."
  DYNAMODB_TABLES_LIST=$(npm run dynamodb:local:list)
  echo $DYNAMODB_TABLES_LIST
  if [[ -z $(echo $DYNAMODB_TABLES_LIST | grep ${DYNAMODB_TABLE_NAME_CONVERSATIONS_CONTEXT}) ]]; then
    echo "Creating table: ${DYNAMODB_TABLE_NAME_CONVERSATIONS_CONTEXT}"
    npm run dynamodb:local:create:conversations-context
  fi
  if [[ -z $(echo $DYNAMODB_TABLES_LIST | grep ${DYNAMODB_TABLE_NAME_CONSTANCES}) ]]; then
    echo "Creating table: ${DYNAMODB_TABLE_NAME_CONSTANCES}"
    npm run dynamodb:local:create:constances
  fi
elif [[ "$1" == "dynamodb:delete" ]]; then
  utils.printer "Setup tables..."
  DYNAMODB_TABLES_LIST=$(npm run dynamodb:local:list)
  utils.printer
  utils.printer "Current Tables..."
  echo $DYNAMODB_TABLES_LIST
  if [[ $(echo $DYNAMODB_TABLES_LIST | grep ${DYNAMODB_TABLE_NAME_CONVERSATIONS_CONTEXT}) ]]; then
    echo "Creating table: ${DYNAMODB_TABLE_NAME_CONVERSATIONS_CONTEXT}"
    npm run dynamodb:local:delete:conversations-context
  fi
  if [[ $(echo $DYNAMODB_TABLES_LIST | grep ${DYNAMODB_TABLE_NAME_CONSTANCES}) ]]; then
    echo "Creating table: ${DYNAMODB_TABLE_NAME_CONSTANCES}"
    npm run dynamodb:local:delete:constances
  fi
fi
