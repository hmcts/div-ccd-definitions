FROM hmctspublic.azurecr.io/base/node:14-alpine as base
USER root
RUN corepack enable
RUN apk add git
USER hmcts
COPY --chown=hmcts:hmcts package.json yarn.lock ./
COPY /definitions/divorce/xlsx /
ADD ./config "/config"
COPY --chown=hmcts:hmcts . .
RUN yarn install && yarn cache clean
COPY index.js ./
ENV NODE_CONFIG_DIR="/config"
CMD ["yarn", "start"]