FROM node:12

RUN apt-get update \
    && apt-get install build-essential \
    && apt-get install g++ \
    && apt-get install python3

WORKDIR /usr/src/app
COPY . . 

EXPOSE 4040

CMD ["node", "server.js"]