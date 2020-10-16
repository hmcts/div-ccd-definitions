const { Logger } = require('@hmcts/nodejs-logging');
const request = require('request-promise-native');
const date = require('moment');
/* eslint-disable */
const fs = require('fs');

const logger = Logger.getLogger('helpers/utils.js');

const env = process.env.RUNNING_ENV || 'aat';
async function getUserToken(username, password) {
  logger.info('Getting User Token');
  const redirectUri = `https://div-pfe-${env}.service.core-compute-${env}.internal/authenticated`;
  const idamClientSecret = process.env.IDAM_CLIENT_SECRET;
  const idamBaseUrl = 'https://idam-api.aat.platform.hmcts.net';

  const idamCodePath = `/oauth2/authorize?response_type=code&client_id=divorce&redirect_uri=${redirectUri}`;

  let retryCount = 0;
  let statusCode = 400;
  let codeResponse;
  do {
    codeResponse = await request.post(
      {
        uri: idamBaseUrl + idamCodePath,
        headers: {
          Authorization: `Basic ${Buffer.from(`${username}:${password}`).toString('base64')}`,
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      },
      (error, response, body) => {
        statusCode = response.statusCode;
      }
    ).catch(error => {
      console.log(error);
    });
    if (retryCount > 1) {
      logger.info(`retrying idam code response ${retryCount}`);
    }
    retryCount++;
  } while (retryCount <= 3 && statusCode > 300);
  const code = JSON.parse(codeResponse).code;

  const idamAuthPath = `/oauth2/token?grant_type=authorization_code&client_id=divorce&client_secret=${idamClientSecret}&redirect_uri=${redirectUri}&code=${code}`;
  let authTokenResponse;
  retryCount = 0;
  statusCode = 400;
  do {
    authTokenResponse = await request.post({
      uri: idamBaseUrl + idamAuthPath,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    },
    (error, response, body) => {
      statusCode = response.statusCode;
    }
    ).catch(error => {
      console.log(error);
    });
    if (retryCount > 1) {
      logger.info(`retrying idam token response ${retryCount}`);
    }
    retryCount++;
  } while (retryCount <= 3 && statusCode > 300);

  logger.debug(JSON.parse(authTokenResponse).access_token);

  return JSON.parse(authTokenResponse).access_token;
}

async function getUserId(authToken) {
  logger.info('Getting User Id');

  const idamBaseUrl = 'https://idam-api.aat.platform.hmcts.net';

  const idamDetailsPath = '/details';
  const userDetails = await request.get({
    uri: idamBaseUrl + idamDetailsPath,
    headers: { Authorization: `Bearer ${authToken}` }
  });

  logger.debug(JSON.parse(userDetails).id);

  return JSON.parse(userDetails).id;
}

async function getServiceToken() {
  logger.info('Getting Service Token');

  const serviceSecret = process.env.CCD_SUBMIT_S2S_SECRET;

  const s2sBaseUrl = `http://rpe-service-auth-provider-${env}.service.core-compute-${env}.internal`;
  const s2sAuthPath = '/lease';
  // eslint-disable-next-line global-require
  const oneTimePassword = require('otp')({ secret: serviceSecret }).totp();

  const serviceToken = await request({
    method: 'POST',
    uri: s2sBaseUrl + s2sAuthPath,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      microservice: 'divorce_ccd_submission',
      oneTimePassword
    })
  });

  logger.debug(serviceToken);

  return serviceToken;
}

async function createCaseInCcd(userName, password, dataLocation, caseType, eventId) {
  const authToken = await getUserToken(userName, password);

  const userId = await getUserId(authToken);

  const serviceToken = await getServiceToken();

  logger.info('Creating Case');

  const ccdApiUrl = process.env.CCD_DATA_API_URL;
  const divCaseType = caseType;
  const divEventId = eventId;
  const ccdStartCasePath = `/caseworkers/${userId}/jurisdictions/DIVORCE/case-types/${divCaseType}/event-triggers/${divEventId}/token`;
  const ccdSaveCasePath = `/caseworkers/${userId}/jurisdictions/DIVORCE/case-types/${divCaseType}/cases`;
  const startCaseOptions = {
    method: 'GET',
    uri: ccdApiUrl + ccdStartCasePath,
    headers: {
      Authorization: `Bearer ${authToken}`,
      ServiceAuthorization: `Bearer ${serviceToken}`,
      'Content-Type': 'application/json'
    }
  };

  const startCaseResponse = await request(startCaseOptions);
  const eventToken = JSON.parse(startCaseResponse).token;
  /* eslint id-blacklist: ["error", "undefined"] */
  const data = fs.readFileSync(dataLocation);

  const saveBody = {
    data: JSON.parse(data),
    event: {
      id: `${divEventId}`,
      summary: 'Creating Basic Case',
      description: 'For CCD E2E Test'
    },
    event_token: eventToken
  };

  const saveCaseOptions = {
    method: 'POST',
    uri: ccdApiUrl + ccdSaveCasePath,
    headers: {
      Authorization: `Bearer ${authToken}`,
      ServiceAuthorization: `Bearer ${serviceToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(saveBody)
  };

  const saveCaseResponse = await request(saveCaseOptions).catch(error => {
    console.log(error);
  });

  const caseId = JSON.parse(saveCaseResponse).id;

  logger.info('Created case with id %s', caseId);

  return caseId;
}

async function updateCaseInCcd(userName, password, caseId, caseType, eventId, dataLocation) {
  const authToken = await getUserToken(userName, password);

  const userId = await getUserId(authToken);

  const serviceToken = await getServiceToken();

  logger.info('Updating case with id %s and event %s', caseId, eventId);

  const ccdApiUrl = process.env.CCD_DATA_API_URL;
  const divCaseType = caseType;
  const ccdStartEventPath = `/caseworkers/${userId}/jurisdictions/DIVORCE/case-types/${divCaseType}/cases/${caseId}/event-triggers/${eventId}/token`;
  const ccdSaveEventPath = `/caseworkers/${userId}/jurisdictions/DIVORCE/case-types/${divCaseType}/cases/${caseId}/events`;

  const startEventOptions = {
    method: 'GET',
    uri: ccdApiUrl + ccdStartEventPath,
    headers: {
      Authorization: `Bearer ${authToken}`,
      ServiceAuthorization: `Bearer ${serviceToken}`,
      'Content-Type': 'application/json'
    }
  };

  const startEventResponse = await request(startEventOptions);

  const eventToken = JSON.parse(startEventResponse).token;

  const data = fs.readFileSync(dataLocation);
  const saveBody = {
    data: JSON.parse(data),
    event: {
      id: eventId,
      summary: 'Updating Case',
      description: 'For CCD E2E Test'
    },
    event_token: eventToken
  };

  const saveEventOptions = {
    method: 'POST',
    uri: ccdApiUrl + ccdSaveEventPath,
    headers: {
      Authorization: `Bearer ${authToken}`,
      ServiceAuthorization: `Bearer ${serviceToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(saveBody)
  };

  const saveEventResponse = await request(saveEventOptions);

  return saveEventResponse;
}

function createSolicitorReference() {
  return date().valueOf();
}

module.exports = { createCaseInCcd, updateCaseInCcd, createSolicitorReference };
