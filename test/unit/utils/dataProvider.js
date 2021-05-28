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
    AuthorisationCaseEvent: getAuthorisationCaseEventDefinitions(['AuthorisationCaseEvent']),
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
    CaseEvent: getCaseEventDefinitions(['CaseEvent']),
    CaseEventToComplexTypes: getCaseEventToComplexTypesDefinitions(
      ['CaseEventToComplexTypes']
    ),
    CaseEventToFields: getCaseEventToFieldsDefinitions(['CaseEventToFields']),
    CaseField: getCaseFieldDefinitions(['CaseField']),
    CaseRoles: Object.assign(load('definitions/divorce/json/CaseRoles'), []),
    CaseType: Object.assign(load('definitions/divorce/json/CaseType'), []),
    CaseTypeTab: getCaseTypeTabDefinitions(['CaseTypeTab']),
    ComplexTypes: getComplexTypesDefinitions(['ComplexTypes']),
    FixedLists: getFixedListsDefinitions(['FixedLists']),
    Jurisdiction: Object.assign(load('definitions/divorce/json/Jurisdiction'), []),
    SearchAlias: Object.assign(load('definitions/divorce/json/SearchAlias'), []),
    SearchInputFields: getSearchInputFieldsDefinitions(['SearchInputFields']),
    SearchResultFields: Object.assign(load('definitions/divorce/json/SearchResultFields'), []),
    State: getStateDefinitions(['State']),
    UserProfile: Object.assign(load('definitions/divorce/json/UserProfile'), []),
    WorkBasketInputFields: Object.assign(load('definitions/divorce/json/WorkBasketInputFields/WorkBasketInputFields'), []),
    WorkBasketResultFields: Object.assign(load('definitions/divorce/json/WorkBasketResultFields'), [])
  },
  nonprod: {
    AuthorisationCaseEvent: getAuthorisationCaseEventDefinitions([
      'AuthorisationCaseEvent',
      'AuthorisationCaseEvent-nonprod'
    ]),
    AuthorisationCaseField: getAuthorisationCaseFieldDefinitions([
      'AuthorisationCaseField',
      'AuthorisationCaseField-nonprod'
    ]),
    AuthorisationCaseState: getAuthorisationCaseStateDefinitions(['AuthorisationCaseState']),
    AuthorisationCaseType: getAuthorisationCaseTypeDefinitions(['AuthorisationCaseType']),
    AuthorisationComplexType: getAuthorisationComplexTypeDefinitions(['AuthorisationComplexType']),
    CaseEvent: getCaseEventDefinitions([
      'CaseEvent',
      'CaseEvent-nonprod'
    ]),
    CaseEventToFields: getCaseEventToFieldsDefinitions([
      'CaseEventToFields',
      'CaseEventToFields-nonprod'
    ]),
    CaseEventToComplexTypes: getCaseEventToComplexTypesDefinitions(['CaseEventToComplexTypes']),
    CaseField: getCaseFieldDefinitions([
      'CaseField'
    ]),
    CaseRoles: Object.assign(load('definitions/divorce/json/CaseRoles'), []),
    CaseType: Object.assign(load('definitions/divorce/json/CaseType'), []),
    CaseTypeTab: getCaseTypeTabDefinitions([
      'CaseTypeTab',
      'CaseTypeTab-object-to-costs-nonprod'
    ]),
    ComplexTypes: getComplexTypesDefinitions(['ComplexTypes']),
    FixedLists: getFixedListsDefinitions([
      'FixedLists'
    ]),
    CaseField: getCaseFieldDefinitions(['CaseField']),
    CaseRoles: Object.assign(load('definitions/divorce/json/CaseRoles'), []),
    CaseType: Object.assign(load('definitions/divorce/json/CaseType'), []),
    CaseTypeTab: getCaseTypeTabDefinitions(['CaseTypeTab']),
    ComplexTypes: getComplexTypesDefinitions(['ComplexTypes']),
    FixedLists: getFixedListsDefinitions(['FixedLists']),
    Jurisdiction: Object.assign(load('definitions/divorce/json/Jurisdiction'), []),
    SearchAlias: Object.assign(load('definitions/divorce/json/SearchAlias'), []),
    SearchInputFields: getSearchInputFieldsDefinitions(['SearchInputFields']),
    SearchResultFields: Object.assign(load('definitions/divorce/json/SearchResultFields'), []),
    State: getStateDefinitions(['State']),
    UserProfile: Object.assign(load('definitions/divorce/json/UserProfile'), []),
    WorkBasketInputFields: Object.assign(load('definitions/divorce/json/WorkBasketInputFields/WorkBasketInputFields'), []),
    WorkBasketResultFields: Object.assign(load('definitions/divorce/json/WorkBasketResultFields'), [])
  }
};
