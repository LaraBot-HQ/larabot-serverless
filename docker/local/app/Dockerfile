FROM node:14.15.1-buster-slim
LABEL maintainer="xergioalex@gmail.com"

RUN apt-get update -y && \
    apt-get install less git wget unzip curl make -y && \
    # --- Install AWS CLI ---
    wget -O /tmp/awscliv2.zip https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip && \
    unzip /tmp/awscliv2.zip -d /tmp/ && \
    sh /tmp/aws/install && \
    sh -c "$(wget -O- https://github.com/deluan/zsh-in-docker/releases/download/v1.1.1/zsh-in-docker.sh)" -- \
    -t robbyrussell && \
    # --- Clean ---
    apt-get remove wget unzip -y && \
    rm -Rf /tmp/aws /tmp/awscliv2.zip && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*
