# ---- Base image - order important ----
FROM hmcts/ccd-definition-processor:latest as base

# ----        Runtime image         ----
FROM hmcts/ccd-definition-importer:latest as runtime

COPY package.json yarn.lock ./
COPY /definitions/divorce/xlsx /
ADD ./config "/config"
RUN apk add --no-cache nodejs yarn
RUN yarn install --production && yarn cache clean
COPY index.js ./
ENV NODE_CONFIG_DIR="/config"
CMD ["yarn", "start"]
EXPOSE 3000
