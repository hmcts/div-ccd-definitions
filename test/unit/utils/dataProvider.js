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
const getSearchInputFieldsDefinitions = loadAllFiles('SearchInputFields');

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
    SearchInputFields: getSearchInputFieldsDefinitions([
      'SearchInputFields'
    ]),
    SearchResultFields: Object.assign(load('definitions/divorce/json/SearchResultFields'), []),
    State: getStateDefinitions(['State']),
    UserProfile: Object.assign(load('definitions/divorce/json/UserProfile'), []),
    WorkBasketInputFields: Object.assign(load('definitions/divorce/json/WorkBasketInputFields/WorkBasketInputFields'), []),
    WorkBasketResultFields: Object.assign(load('definitions/divorce/json/WorkBasketResultFields'), [])
  },
  nonprod: {
    AuthorisationCaseEvent: getAuthorisationCaseEventDefinitions([
      'AuthorisationCaseEvent',
      'AuthorisationCaseEvent-bailiff-nonprod',
      'AuthorisationCaseEvent-object-to-costs-nonprod',
      'AuthorisationCaseEvent-resp-journey-nonprod',
      'AuthorisationCaseEvent-nonprod'
    ]),
    AuthorisationCaseField: getAuthorisationCaseFieldDefinitions([
      'AuthorisationCaseField',
      'AuthorisationCaseField-bailiff-nonprod',
      'AuthorisationCaseField-object-to-costs-nonprod',
      'AuthorisationCaseField-resp-journey-nonprod',
      'AuthorisationCaseField-share-a-case-nonprod',
      'AuthorisationCaseField-nonprod'
    ]),
    AuthorisationCaseState: getAuthorisationCaseStateDefinitions([
      'AuthorisationCaseState',
      'AuthorisationCaseState-bailiff-nonprod',
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
      'CaseEvent-bailiff-nonprod',
      'CaseEvent-bailiff-or-resp-journey-nonprod',
      'CaseEvent-object-to-costs-nonprod',
      'CaseEvent-resp-journey-nonprod',
      'CaseEvent-share-a-case-nonprod',
      'CaseEvent-nonprod'
    ]),
    CaseEventToFields: getCaseEventToFieldsDefinitions([
      'CaseEventToFields',
      'CaseEventToFields-bailiff-nonprod',
      'CaseEventToFields-object-to-costs-nonprod',
      'CaseEventToFields-resp-journey-nonprod',
      'CaseEventToFields-nonprod'
    ]),
    CaseEventToComplexTypes: getCaseEventToComplexTypesDefinitions([
      'CaseEventToComplexTypes',
      'CaseEventToComplexTypes-resp-journey-nonprod',
      'CaseEventToComplexTypes-share-a-case-nonprod'
    ]),
    CaseField: getCaseFieldDefinitions([
      'CaseField',
      'CaseField-bailiff-nonprod',
      'CaseField-object-to-costs-nonprod',
      'CaseField-resp-journey-nonprod',
      'CaseField-share-a-case-nonprod'
    ]),
    CaseRoles: Object.assign(load('definitions/divorce/json/CaseRoles'), []),
    CaseType: Object.assign(load('definitions/divorce/json/CaseType'), []),
    CaseTypeTab: getCaseTypeTabDefinitions([
      'CaseTypeTab',
      'CaseTypeTab-bailiff-nonprod',
      'CaseTypeTab-resp-journey-nonprod',
      'CaseTypeTab-object-to-costs-nonprod'
    ]),
    ComplexTypes: getComplexTypesDefinitions([
      'ComplexTypes',
      'ComplexTypes-bailiff-nonprod'
    ]),
    FixedLists: getFixedListsDefinitions([
      'FixedLists',
      'FixedLists-bailiff-nonprod',
      'FixedLists-object-to-costs-nonprod'
    ]),
    Jurisdiction: Object.assign(load('definitions/divorce/json/Jurisdiction'), []),
    SearchAlias: Object.assign(load('definitions/divorce/json/SearchAlias'), []),
    SearchInputFields: getSearchInputFieldsDefinitions([
      'SearchInputFields',
      'SearchInputFields-bailiff-nonprod'
    ]),
    SearchResultFields: Object.assign(load('definitions/divorce/json/SearchResultFields'), []),
    State: getStateDefinitions([
      'State',
      'State-bailiff-nonprod'
    ]),
    UserProfile: Object.assign(load('definitions/divorce/json/UserProfile'), []),
    WorkBasketInputFields: Object.assign(load('definitions/divorce/json/WorkBasketInputFields/WorkBasketInputFields'), []),
    WorkBasketResultFields: Object.assign(load('definitions/divorce/json/WorkBasketResultFields'), [])
  }
};
