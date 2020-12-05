FROM node:12 AS BUILD

WORKDIR /client

COPY ./client/package*.json .
COPY ./client/*.lock .

RUN yarn install

COPY ./client/. .

RUN yarn build

FROM node:12

RUN apt-get update \
    && apt-get install build-essential \
    && apt-get install g++ \
    && apt-get install python3

WORKDIR /server
COPY server.js .
COPY --from=BUILD /client/build ./public

RUN mkdir submissions
RUN ls -R

CMD ["node", "server.js"]