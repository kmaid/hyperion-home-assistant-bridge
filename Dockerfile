FROM node:current-alpine

WORKDIR /src

COPY . .

EXPOSE 41234

ENTRYPOINT [ "node", "index.js" ]
