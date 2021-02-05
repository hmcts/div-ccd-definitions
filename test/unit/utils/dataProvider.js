const { loadAllFiles } = require('./utils');

const getAuthorisationCaseStateDefinitions = loadAllFiles('AuthorisationCaseState');
const getAuthorisationCaseEventDefinitions = loadAllFiles('AuthorisationCaseEvent');
const getAuthorisationCaseFieldDefinitions = loadAllFiles('AuthorisationCaseField');
const getCaseEventDefinitions = loadAllFiles('CaseEvent');
const getCaseEventToFieldsDefinitions = loadAllFiles('CaseEventToFields');
const getStateDefinitions = loadAllFiles('State');

module.exports = {
  prod: {
    AuthorisationCaseState: getAuthorisationCaseStateDefinitions(['AuthorisationCaseState']),
    AuthorisationCaseEvent: getAuthorisationCaseEventDefinitions([
      'AuthorisationCaseEvent',
      'AuthorisationCaseEvent-resp-journey-roles-and-permissions-prod'
    ]),
    AuthorisationCaseField: getAuthorisationCaseFieldDefinitions([
      'AuthorisationCaseField',
      'AuthorisationCaseField-prod'
    ]),
    CaseEvent: getCaseEventDefinitions([
      'CaseEvent',
      'CaseEvent-prod'
    ]),
    CaseEventToFields: getCaseEventToFieldsDefinitions([
      'CaseEventToFields',
      'CaseEventToFields-prod'
    ]),
    State: getStateDefinitions(['State'])
  },
  nonprod: {
    AuthorisationCaseState: getAuthorisationCaseStateDefinitions(
      [
        'AuthorisationCaseState',
        'AuthorisationCaseState-alternative-service-nonprod',
        'AuthorisationCaseState-alt-service-process-server-nonprod',
        'AuthorisationCaseState-bailiff-nonprod',
        'AuthorisationCaseState-deemed-and-dispensed-nonprod',
        'AuthorisationCaseState-general-referral-nonprod',
        'AuthorisationCaseState-share-a-case-nonprod',
        'AuthorisationCaseState-nonprod'
      ]
    ),
    AuthorisationCaseEvent: getAuthorisationCaseEventDefinitions(
      [
        'AuthorisationCaseEvent',
        'AuthorisationCaseEvent-alternative-service-nonprod',
        'AuthorisationCaseEvent-alt-service-process-server-nonprod',
        'AuthorisationCaseEvent-amend-court-orders-nonprod',
        'AuthorisationCaseEvent-deemed-and-dispensed-nonprod',
        'AuthorisationCaseEvent-general-email-nonprod',
        'AuthorisationCaseEvent-general-referral-nonprod',
        'AuthorisationCaseEvent-nonprod'
      ]
    ),
    AuthorisationCaseField: getAuthorisationCaseFieldDefinitions(
      [
        'AuthorisationCaseField',
        'AuthorisationCaseField-alt-service-process-server-nonprod',
        'AuthorisationCaseField-alternative-service-nonprod',
        'AuthorisationCaseField-amend-court-orders-nonprod',
        'AuthorisationCaseField-deemed-and-dispensed-nonprod',
        'AuthorisationCaseField-general-email-nonprod',
        'AuthorisationCaseField-general-referral-nonprod',
        'AuthorisationCaseField-resp-journey-roles-and-permissions-nonprod',
        'AuthorisationCaseField-share-a-case-nonprod',
        'AuthorisationCaseField-nonprod'
      ]
    ),
    CaseEvent: getCaseEventDefinitions(
      [
        'CaseEvent',
        'CaseEvent-alt-service-process-server-nonprod',
        'CaseEvent-alternative-service-nonprod',
        'CaseEvent-amend-court-orders-nonprod',
        'CaseEvent-deemed-and-dispensed-nonprod',
        'CaseEvent-general-email-nonprod',
        'CaseEvent-general-referral-nonprod',
        'CaseEvent-share-a-case-nonprod',
        'CaseEvent-nonprod'
      ]),
    CaseEventToFields: getCaseEventToFieldsDefinitions([
      'CaseEventToFields',
      'CaseEventToFields-alt-service-process-server-nonprod',
      'CaseEventToFields-alternative-service-nonprod',
      'CaseEventToFields-amend-court-orders-nonprod',
      'CaseEventToFields-deemed-and-dispensed-nonprod',
      'CaseEventToFields-general-email-nonprod',
      'CaseEventToFields-general-referral-nonprod',
      'CaseEventToFields-nonprod'
    ]),
    State: getStateDefinitions([
      'State',
      'State-alternative-service-nonprod',
      'State-alt-service-process-server-nonprod',
      'State-bailiff-nonprod',
      'State-deemed-and-dispensed-nonprod',
      'State-general-referral-nonprod'
    ])
  }
};
