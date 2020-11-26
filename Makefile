# Utils functions

# Create envs vars if don't exist
ENV_FILES=(".env" "app/.env")
for i in "${ENV_FILES[@]}";  do
	if [[ ! -f "$i" ]]; then
		cp "$i.example" "$i"
	fi
done
# bash docker/utils.sh utils.check_envs_files "${ENV_FILES[@]}"

# # Load environment vars, to use from console, run follow command:
# utils.load_environment
# utils.load_environment_permissions
# utils.check_local_network
# utils.load_vscode_configs

help:  ## Display this help text
	@ grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-27s\033[0m %s\n", $$1, $$2}'

hellomake:  ## Display hello 2
	echo "hello1"

setup:  ## Display hello 1
	echo "hola"

hellomake_two:  ## Display hello 3
	echo "hello2"