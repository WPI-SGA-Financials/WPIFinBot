FROM node:12.18-alpine

WORKDIR /src

COPY ./package*.json .
RUN npm install

ENV DB_HOST=localhost
ENV DB_USER=root
ENV DB_PASS=password
ENV DB_DATABASE=sgadb
ENV SLACK_OATH_TOKEN=token
ENV BOT_SPAM_CHANNEL=#bot-spam

COPY ./src /src/app

CMD ["npm", "start"]