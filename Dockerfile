# ---- Base images - order important ----
FROM hmcts/ccd-definition-processor:latest as prcoessor
FROM hmcts/ccd-definition-importer:latest as importer
FROM hmctspublic.azurecr.io/base/node/stretch-slim-lts-8:8-stretch-slim as runtime

COPY package.json yarn.lock ./
COPY /definitions/divorce/xlsx /
ADD ./config "/config"
RUN yarn install --production && yarn cache clean
COPY index.js ./
ENV NODE_CONFIG_DIR="/config"
CMD ["yarn", "start"]
EXPOSE 3000
