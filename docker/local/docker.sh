#!/bin/bash

# Utils functions
. ./../utils.sh

# Create envs vars if don't exist
ENV_FILES=(".env" "claudia/.env")
utils.check_envs_files "${ENV_FILES[@]}"

# Load environment vars, to use from console, run follow command:
utils.load_environment
utils.load_environment_permissions
utils.check_local_network


# Set default value
export YARN_COMMAND="run build"