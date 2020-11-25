FROM node:14.15.1-buster-slim
LABEL maintainer="ops@rockalabs.com"

RUN apt-get update -y && \
    apt-get install less git wget unzip -y && \
    # --- Install AWS CLI ---
    wget -O /tmp/awscliv2.zip https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip && \
    unzip /tmp/awscliv2.zip -d /tmp/ && \
    sh /tmp/aws/install && \
    # --- Clean ---
    apt-get remove wget unzip -y && \
    rm -Rf /tmp/aws /tmp/awscliv2.zip && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*