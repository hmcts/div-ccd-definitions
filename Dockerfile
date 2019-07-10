# ---- Base image - order important ----
FROM hmcts/ccd-definition-processor:latest as processor

# ----        Runtime image         ----
FROM hmcts/ccd-definition-importer:latest as importer

FROM hmcts.azurecr.io/hmcts/base/node/stretch-slim-lts-8 as runtime

COPY --from=importer /scripts /scripts
COPY --from=importer /wait /wait
COPY package.json yarn.lock ./
COPY /definitions/divorce/xlsx /
ADD ./config "/config"
COPY ./scripts/init.sh /
RUN yarn install --production && yarn cache clean
COPY index.js ./
ENV NODE_CONFIG_DIR="/config"
CMD ["/init.sh"]
EXPOSE 3000
