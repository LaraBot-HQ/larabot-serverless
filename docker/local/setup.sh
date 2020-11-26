#!/bin/bash

# Utils functions
. ./../utils.sh

# Create envs vars if don't exist
ENV_FILES=(".env" "app/.env")
utils.check_envs_files "${ENV_FILES[@]}"

# Load environment vars, to use from console, run follow command:
utils.load_environment
utils.load_environment_permissions
utils.check_local_network
utils.load_vscode_configs

echo "Setup done..."

if [[ "$1" == "setup.base" ]]; then
  utils.printer "Setup done..."
elif [[ "$1" == "setup.dynamodb" ]]; then
  utils.printer "Setup tables..."
  echo "Create table: 'conversations-context'"

fi