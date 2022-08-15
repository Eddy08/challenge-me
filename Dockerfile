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
# FROM library/postgres
# COPY ./init-database.sh /docker-entrypoint-initdb.d/init-database.sh

RUN which psql
SHELL ["/bin/bash", "--login", "-i", "-c"]

# COPY init-database.sh /scripts/init-database.sh
# WORKDIR /scripts
# RUN chmod +x init-database.sh
# RUN ./init-database.sh
# SHELL ["/bin/bash", "--login", "-i", "-c"]

# RUN systemctl restart postgresql.service
# RUN which mysql
# SHELL ["/bin/bash", "--login",  "-c"]

# RUN /etc/init.d/postgresql restart && su - postgres && psql && CREATE ROLE root superuser && CREATE USER root && GRANT ROOT to root && alter role root WITH PASSWORD 'root'

#  && SELECT 'CREATE DATABASE mydb' WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'mydb') && \c company; && CREATE TABLE IF NOT EXISTS public.companies \
# (                                                \          
#     company_name character varying(255) COLLATE pg_catalog."default" NOT NULL, \
#     company_id character varying(255) COLLATE pg_catalog."default", \
#     on_record boolean, \
#     "createdAt" timestamp with time zone NOT NULL, \
#     "updatedAt" timestamp with time zone NOT NULL, \
#     CONSTRAINT companies_pkey PRIMARY KEY (company_name) \
# ); && \q && exit
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
# RUN cd backend
# RUN 
# RUN npm install nodemon -g
# COPY . .
RUN npm install
WORKDIR /challenge-me/frontend/app

# RUN nodemon index.js &
# RUN cd frontend/app
# COPY . .
RUN npm install
WORKDIR /challenge-me
RUN chmod +x /challenge-me/startup.sh
# ENTRYPOINT ["/challenge-me/startup.sh"]
EXPOSE 3000 4000 5050 5432
ENV PORT=4000
CMD ["/challenge-me/startup.sh"]
# CMD cd frontend/app && npm run start && cd ../backend && nodemon index.js && /etc/init.d/postgresql restart

