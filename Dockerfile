FROM node:12.18.1-alpine3.9

WORKDIR /app

COPY ./yarn.lock ./package.json /app/
RUN yarn install --frozen-lockfile

COPY . /app/
RUN yarn run build:client && yarn run build:server

EXPOSE 8090
ENTRYPOINT ["npx"]
CMD ["/app/bin/index.js"]
