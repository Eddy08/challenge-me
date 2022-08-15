FROM ubuntu:latest
ARG DEBIAN_FRONTEND=noninteractive
ENV POSTGRES_USER: root
ENV POSTGRES_PASSWORD: root
ENV POSTGRES_DB: test_db
RUN  apt-get update \
    && apt-get install -y wget \
    && rm -rf /var/lib/apt/lists/*
# RUN wget --quiet -O - https://www.postgresql.org/media/keys/ACCC4CF8.asc |  apt-key add -
# RUN sh -c 'echo "deb http://apt.postgresql.org/pub/repos/apt/ $(lsb_release -cs)-pgdg main" >> /etc/apt/sources.list.d/pgdg.list'
RUN apt update
RUN apt install postgresql postgresql-contrib -f -y
FROM library/postgres
COPY ./init-database.sh /docker-entrypoint-initdb.d/init-database.sh

SHELL ["/bin/bash", "--login", "-i", "-c"]

COPY init-database.sh /scripts/init-database.sh
# WORKDIR /scripts
# RUN chmod +x init-database.sh
# RUN ./init-database.sh
SHELL ["/bin/bash", "--login",  "-c"]

RUN apt install git -y
RUN apt install curl -y
SHELL ["/bin/bash", "--login", "-i", "-c"]
RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.2/install.sh | bash
RUN source /root/.bashrc && nvm install node
RUN nvm use node
RUN git clone https://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@github.com/Eddy08/challenge-me
# RUN node -v
WORKDIR /challenge-me/backend
# RUN 
RUN npm install nodemon -g
# COPY . .
RUN npm install
RUN nodemon index.js &
RUN cd /challenge-me/frontend/app
# COPY . .
RUN npm install
CMD npm run start &
