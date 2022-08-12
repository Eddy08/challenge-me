FROM node:alpine
RUN apk --no-cache add git
ARG PAT
RUN git clone https://${PAT}@github.com/Eddy08/challenge-me
RUN git pull
WORKDIR /challenge-me/frontend/app
# COPY . .
RUN npm install
CMD npm run start