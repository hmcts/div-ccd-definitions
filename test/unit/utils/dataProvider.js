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
    AuthorisationCaseState: getAuthorisationCaseStateDefinitions(['AuthorisationCaseState']),
    AuthorisationCaseEvent: getAuthorisationCaseEventDefinitions([
      'AuthorisationCaseEvent',
      'AuthorisationCaseEvent-resp-journey-roles-and-permissions-prod'
    ]),
    AuthorisationCaseField: getAuthorisationCaseFieldDefinitions([
      'AuthorisationCaseField',
      'AuthorisationCaseField-prod'
    ]),
    AuthorisationCaseType: getAuthorisationCaseTypeDefinitions(['AuthorisationCaseType']),
    CaseEvent: getCaseEventDefinitions([
      'CaseEvent',
      'CaseEvent-prod'
    ]),
    CaseEventToFields: getCaseEventToFieldsDefinitions([
      'CaseEventToFields',
      'CaseEventToFields-pet-sol-selects-own-org-prod',
      'CaseEventToFields-resp-journey-roles-and-permissions-prod'
    ]),
    State: getStateDefinitions(['State']),
    AuthorisationComplexType: getAuthorisationComplexTypeDefinitions(['AuthorisationComplexType']),
    CaseField: getCaseFieldDefinitions([
      'CaseField',
      'CaseField-prod'
    ]),
    CaseEventToComplexTypes: getCaseEventToComplexTypesDefinitions(['CaseEventToComplexTypes']),
    CaseRoles: Object.assign(load('definitions/divorce/json/CaseRoles'), []),
    CaseType: Object.assign(load('definitions/divorce/json/CaseType'), []),
    CaseTypeTab: getCaseTypeTabDefinitions([
      'CaseTypeTab',
      'CaseTypeTab-prod'
    ]),
    ComplexTypes: getComplexTypesDefinitions(['ComplexTypes']),
    FixedLists: getFixedListsDefinitions(['FixedLists']),
    Jurisdiction: Object.assign(load('definitions/divorce/json/Jurisdiction'), []),
    SearchAlias: Object.assign(load('definitions/divorce/json/SearchAlias'), []),
    SearchInputFields: Object.assign(load('definitions/divorce/json/SearchInputFields'), []),
    SearchResultFields: Object.assign(load('definitions/divorce/json/SearchResultFields'), []),
    UserProfile: Object.assign(load('definitions/divorce/json/UserProfile'), []),
    WorkBasketInputFields: Object.assign(load('definitions/divorce/json/WorkBasketInputFields/WorkBasketInputFields'), []),
    WorkBasketResultFields: Object.assign(load('definitions/divorce/json/WorkBasketResultFields'), [])
  },
  nonprod: {
    AuthorisationCaseState: getAuthorisationCaseStateDefinitions(
      [
        'AuthorisationCaseState',
        'AuthorisationCaseState-alt-service-process-server-nonprod',
        'AuthorisationCaseState-alternative-service-nonprod',
        'AuthorisationCaseState-bailiff-nonprod',
        'AuthorisationCaseState-deemed-and-dispensed-nonprod',
        'AuthorisationCaseState-general-referral-nonprod',
        'AuthorisationCaseState-resp-journey-roles-and-permissions-nonprod',
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
        'AuthorisationCaseEvent-resp-journey-roles-and-permissions-nonprod',
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
    AuthorisationCaseType: getAuthorisationCaseTypeDefinitions([
      'AuthorisationCaseType'
    ]),
    CaseEvent: getCaseEventDefinitions(
      [
        'CaseEvent',
        'CaseEvent-alt-service-process-server-nonprod',
        'CaseEvent-alternative-service-nonprod',
        'CaseEvent-amend-court-orders-nonprod',
        'CaseEvent-deemed-and-dispensed-nonprod',
        'CaseEvent-general-email-nonprod',
        'CaseEvent-general-referral-nonprod',
        'CaseEvent-resp-journey-roles-and-permissions-nonprod',
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
      'CaseEventToFields-resp-journey-roles-and-permissions-nonprod'
    ]),
    CaseRoles: Object.assign(load('definitions/divorce/json/CaseRoles'), []),
    State: getStateDefinitions([
      'State',
      'State-alternative-service-nonprod',
      'State-alt-service-process-server-nonprod',
      'State-bailiff-nonprod',
      'State-deemed-and-dispensed-nonprod',
      'State-general-referral-nonprod'
    ]),
    AuthorisationComplexType: getAuthorisationComplexTypeDefinitions([
      'AuthorisationComplexType',
      'AuthorisationComplexType-resp-journey-roles-and-permissions-nonprod',
      'AuthorisationComplexType-share-a-case-nonprod'
    ]),
    CaseField: getCaseFieldDefinitions([
      'CaseField',
      'CaseField-alt-service-process-server-nonprod',
      'CaseField-alternative-service-nonprod',
      'CaseField-amend-court-orders-nonprod',
      'CaseField-deemed-and-dispensed-nonprod',
      'CaseField-general-email-nonprod',
      'CaseField-general-referral-nonprod',
      'CaseField-resp-journey-roles-and-permissions-nonprod',
      'CaseField-share-a-case-nonprod'
    ]),
    CaseEventToComplexTypes: getCaseEventToComplexTypesDefinitions([
      'CaseEventToComplexTypes',
      'CaseEventToComplexTypes-pet-sol-selects-own-org-nonprod',
      'CaseEventToComplexTypes-resp-journey-roles-and-permissions-nonprod',
      'CaseEventToComplexTypes-share-a-case-nonprod'
    ]),
    ComplexTypes: getComplexTypesDefinitions([
      'ComplexTypes',
      'ComplexTypes-deemed-and-dispensed-nonprod',
      'ComplexTypes-general-referral-nonprod',
      'ComplexTypes-nonprod'
    ]),
    CaseType: Object.assign(load('definitions/divorce/json/CaseType'), []),
    CaseTypeTab: getCaseTypeTabDefinitions([
      'CaseTypeTab',
      'CaseTypeTab-deemed-and-dispensed-nonprod',
      'CaseTypeTab-general-referral-nonprod',
      'CaseTypeTab-pet-sol-selects-own-org-nonprod',
      'CaseTypeTab-resp-journey-roles-and-permissions-nonprod'
    ]),
    FixedLists: getFixedListsDefinitions([
      'FixedLists',
      'FixedLists-bailiff-nonprod',
      'FixedLists-deemed-and-dispensed-nonprod',
      'FixedLists-general-email-nonprod',
      'FixedLists-general-referral-nonprod'
    ]),
    Jurisdiction: Object.assign(load('definitions/divorce/json/Jurisdiction'), []),
    SearchAlias: Object.assign(load('definitions/divorce/json/SearchAlias'), []),
    SearchInputFields: Object.assign(load('definitions/divorce/json/SearchInputFields'), []),
    SearchResultFields: Object.assign(load('definitions/divorce/json/SearchResultFields'), []),
    UserProfile: Object.assign(load('definitions/divorce/json/UserProfile'), []),
    WorkBasketInputFields: Object.assign(load('definitions/divorce/json/WorkBasketInputFields/WorkBasketInputFields'), []),
    WorkBasketResultFields: Object.assign(load('definitions/divorce/json/WorkBasketResultFields'), [])
  }
};
