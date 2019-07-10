FROM hmcts.azurecr.io/hmcts/base/node/stretch-slim-lts-8
USER hmcts
COPY package.json yarn.lock ./
COPY /definitions/divorce/xlsx /
ADD ./config "/config"
RUN yarn install --production && yarn cache clean
COPY index.js ./
ENV NODE_CONFIG_DIR="/config"
CMD ["yarn", "start"]
EXPOSE 3000
