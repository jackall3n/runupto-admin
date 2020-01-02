FROM node:10

WORKDIR /usr/src/app

COPY package.json .
COPY yarn.lock .
RUN yarn

COPY ./src src
COPY ./public public
