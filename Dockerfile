# ---- Base image - order important ----
FROM hmcts/`:latest as base

# ----        Runtime image         ----
FROM hmcts/ccd-definition-importer:latest as runtime

USER hmcts
COPY package.json yarn.lock ./
COPY /definitions/divorce/xlsx /
ADD ./config "/config"
RUN yarn install --production && yarn cache clean
COPY index.js ./
ENV NODE_CONFIG_DIR="/config"
CMD "/wait" && "/scripts/upload-definition.sh" && "yarn start"
EXPOSE 3000
