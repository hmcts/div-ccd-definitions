const load = require;
const { loadAllFiles } = require('./utils');

const getAuthorisationCaseStateDefinitions = loadAllFiles('AuthorisationCaseState');
const getAuthorisationCaseEventDefinitions = loadAllFiles('AuthorisationCaseEvent');
const getAuthorisationCaseFieldDefinitions = loadAllFiles('AuthorisationCaseField');
const getCaseEventDefinitions = loadAllFiles('CaseEvent');
const getCaseEventToFieldsDefinitions = loadAllFiles('CaseEventToFields');
const getStateDefinitions = loadAllFiles('State');
const getAuthorisationComplexTypeDefinitions = loadAllFiles('AuthorisationComplexType');
const getCaseFieldDefinitions = loadAllFiles('CaseField');
const getCaseEventToComplexTypesDefinitions = loadAllFiles('CaseEventToComplexTypes');
const getCaseTypeTabDefinitions = loadAllFiles('CaseTypeTab');
const getAuthorisationCaseTypeDefinitions = loadAllFiles('AuthorisationCaseType');
const getComplexTypesDefinitions = loadAllFiles('ComplexTypes');
const getFixedListsDefinitions = loadAllFiles('FixedLists');

module.exports = {
  prod: {
    AuthorisationCaseEvent: getAuthorisationCaseEventDefinitions([
      'AuthorisationCaseEvent',
      'AuthorisationCaseEvent-resp-journey-prod'
    ]),
    AuthorisationCaseField: getAuthorisationCaseFieldDefinitions(['AuthorisationCaseField']),
    AuthorisationCaseState: getAuthorisationCaseStateDefinitions(
      ['AuthorisationCaseState']
    ),
    AuthorisationCaseType: getAuthorisationCaseTypeDefinitions(
      ['AuthorisationCaseType']
    ),
    AuthorisationComplexType: getAuthorisationComplexTypeDefinitions(
      ['AuthorisationComplexType']
    ),
    CaseEvent: getCaseEventDefinitions([
      'CaseEvent',
      'CaseEvent-resp-journey-prod',
      'CaseEvent-share-a-case-prod',
      'CaseEvent-bailiff-prod'
    ]),
    CaseEventToComplexTypes: getCaseEventToComplexTypesDefinitions(
      ['CaseEventToComplexTypes']
    ),
    CaseEventToFields: getCaseEventToFieldsDefinitions([
      'CaseEventToFields',
      'CaseEventToFields-resp-journey-prod'
    ]),
    CaseField: getCaseFieldDefinitions(['CaseField']),
    CaseRoles: Object.assign(load('definitions/divorce/json/CaseRoles'), []),
    CaseType: Object.assign(load('definitions/divorce/json/CaseType'), []),
    CaseTypeTab: getCaseTypeTabDefinitions([
      'CaseTypeTab',
      'CaseTypeTab-resp-journey-prod'
    ]),
    ComplexTypes: getComplexTypesDefinitions(['ComplexTypes']),
    FixedLists: getFixedListsDefinitions(['FixedLists']),
    Jurisdiction: Object.assign(load('definitions/divorce/json/Jurisdiction'), []),
    SearchAlias: Object.assign(load('definitions/divorce/json/SearchAlias'), []),
    SearchInputFields: Object.assign(load('definitions/divorce/json/SearchInputFields'), []),
    SearchResultFields: Object.assign(load('definitions/divorce/json/SearchResultFields'), []),
    State: getStateDefinitions(['State']),
    UserProfile: Object.assign(load('definitions/divorce/json/UserProfile'), []),
    WorkBasketInputFields: Object.assign(load('definitions/divorce/json/WorkBasketInputFields/WorkBasketInputFields'), []),
    WorkBasketResultFields: Object.assign(load('definitions/divorce/json/WorkBasketResultFields'), [])
  },
  nonprod: {
    AuthorisationCaseEvent: getAuthorisationCaseEventDefinitions([
      'AuthorisationCaseEvent',
      'AuthorisationCaseEvent-alternative-service-nonprod',
      'AuthorisationCaseEvent-alt-service-process-server-nonprod',
      'AuthorisationCaseEvent-amend-court-orders-nonprod',
      'AuthorisationCaseEvent-bailiff-nonprod',
      'AuthorisationCaseEvent-general-email-nonprod',
      'AuthorisationCaseEvent-general-referral-nonprod',
      'AuthorisationCaseEvent-resp-journey-nonprod',
      'AuthorisationCaseEvent-nonprod'
    ]),
    AuthorisationCaseField: getAuthorisationCaseFieldDefinitions([
      'AuthorisationCaseField',
      'AuthorisationCaseField-alt-service-process-server-nonprod',
      'AuthorisationCaseField-alternative-service-nonprod',
      'AuthorisationCaseField-amend-court-orders-nonprod',
      'AuthorisationCaseField-bailiff-nonprod',
      'AuthorisationCaseField-general-email-nonprod',
      'AuthorisationCaseField-general-referral-nonprod',
      'AuthorisationCaseField-resp-journey-nonprod',
      'AuthorisationCaseField-share-a-case-nonprod',
      'AuthorisationCaseField-nonprod'
    ]),
    AuthorisationCaseState: getAuthorisationCaseStateDefinitions([
      'AuthorisationCaseState',
      'AuthorisationCaseState-alt-service-process-server-nonprod',
      'AuthorisationCaseState-alternative-service-nonprod',
      'AuthorisationCaseState-bailiff-nonprod',
      'AuthorisationCaseState-general-referral-nonprod',
      'AuthorisationCaseState-resp-journey-nonprod',
      'AuthorisationCaseState-share-a-case-nonprod'
    ]),
    AuthorisationCaseType: getAuthorisationCaseTypeDefinitions(['AuthorisationCaseType']),
    AuthorisationComplexType: getAuthorisationComplexTypeDefinitions([
      'AuthorisationComplexType',
      'AuthorisationComplexType-resp-journey-nonprod',
      'AuthorisationComplexType-share-a-case-nonprod'
    ]),
    CaseEvent: getCaseEventDefinitions([
      'CaseEvent',
      'CaseEvent-alt-service-process-server-nonprod',
      'CaseEvent-alternative-service-nonprod',
      'CaseEvent-amend-court-orders-nonprod',
      'CaseEvent-bailiff-nonprod',
      'CaseEvent-general-email-nonprod',
      'CaseEvent-general-referral-nonprod',
      'CaseEvent-resp-journey-nonprod',
      'CaseEvent-share-a-case-nonprod',
      'CaseEvent-nonprod'
    ]),
    CaseEventToFields: getCaseEventToFieldsDefinitions([
      'CaseEventToFields',
      'CaseEventToFields-alt-service-process-server-nonprod',
      'CaseEventToFields-alternative-service-nonprod',
      'CaseEventToFields-amend-court-orders-nonprod',
      'CaseEventToFields-bailiff-nonprod',
      'CaseEventToFields-general-email-nonprod',
      'CaseEventToFields-general-referral-nonprod',
      'CaseEventToFields-resp-journey-nonprod'
    ]),
    CaseEventToComplexTypes: getCaseEventToComplexTypesDefinitions([
      'CaseEventToComplexTypes',
      'CaseEventToComplexTypes-resp-journey-nonprod',
      'CaseEventToComplexTypes-share-a-case-nonprod'
    ]),
    CaseField: getCaseFieldDefinitions([
      'CaseField',
      'CaseField-alt-service-process-server-nonprod',
      'CaseField-alternative-service-nonprod',
      'CaseField-amend-court-orders-nonprod',
      'CaseField-bailiff-nonprod',
      'CaseField-general-email-nonprod',
      'CaseField-general-referral-nonprod',
      'CaseField-resp-journey-nonprod',
      'CaseField-share-a-case-nonprod'
    ]),
    CaseRoles: Object.assign(load('definitions/divorce/json/CaseRoles'), []),
    CaseType: Object.assign(load('definitions/divorce/json/CaseType'), []),
    CaseTypeTab: getCaseTypeTabDefinitions([
      'CaseTypeTab',
      'CaseTypeTab-bailiff-nonprod',
      'CaseTypeTab-general-referral-nonprod',
      'CaseTypeTab-resp-journey-nonprod'
    ]),
    ComplexTypes: getComplexTypesDefinitions([
      'ComplexTypes',
      'ComplexTypes-general-referral-nonprod'
    ]),
    FixedLists: getFixedListsDefinitions([
      'FixedLists',
      'FixedLists-bailiff-nonprod',
      'FixedLists-general-email-nonprod',
      'FixedLists-general-referral-nonprod'
    ]),
    Jurisdiction: Object.assign(load('definitions/divorce/json/Jurisdiction'), []),
    SearchAlias: Object.assign(load('definitions/divorce/json/SearchAlias'), []),
    SearchInputFields: Object.assign(load('definitions/divorce/json/SearchInputFields'), []),
    SearchResultFields: Object.assign(load('definitions/divorce/json/SearchResultFields'), []),
    State: getStateDefinitions([
      'State',
      'State-alternative-service-nonprod',
      'State-alt-service-process-server-nonprod',
      'State-bailiff-nonprod',
      'State-general-referral-nonprod'
    ]),
    UserProfile: Object.assign(load('definitions/divorce/json/UserProfile'), []),
    WorkBasketInputFields: Object.assign(load('definitions/divorce/json/WorkBasketInputFields/WorkBasketInputFields'), []),
    WorkBasketResultFields: Object.assign(load('definitions/divorce/json/WorkBasketResultFields'), [])
  }
};
