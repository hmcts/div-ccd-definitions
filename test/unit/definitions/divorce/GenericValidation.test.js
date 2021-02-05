/* eslint global-require: "off", max-nested-callbacks: "off" */

const expect = require('chai').expect;
const { uniq } = require('lodash');
const { prod, nonprod } = require('../../utils/dataProvider');

const Config = {
  nonprod: {
    AuthorisationCaseEvent: nonprod.AuthorisationCaseEvent,
    AuthorisationCaseField: nonprod.AuthorisationCaseField,
    AuthorisationCaseState: nonprod.AuthorisationCaseState,
    AuthorisationCaseType: Object.assign(require('definitions/divorce/json/AuthorisationCaseType/AuthorisationCaseType'), []),
    AuthorisationComplexType: nonprod.AuthorisationComplexType,
    CaseEvent: nonprod.CaseEvent,
    CaseEventToComplexTypes: nonprod.CaseEventToComplexTypes,
    CaseEventToFields: nonprod.CaseEventToFields,
    CaseField: nonprod.CaseField,
    CaseRoles: Object.assign(require('definitions/divorce/json/CaseRoles'), []),
    CaseType: Object.assign(require('definitions/divorce/json/CaseType'), []),
    CaseTypeTab:  nonprod.CaseTypeTab,
    ComplexTypes: Object.assign(require('definitions/divorce/json/ComplexTypes/ComplexTypes'), []),
    FixedLists: Object.assign(require('definitions/divorce/json/FixedLists/FixedLists'), []),
    Jurisdiction: Object.assign(require('definitions/divorce/json/Jurisdiction'), []),
    SearchAlias: Object.assign(require('definitions/divorce/json/SearchAlias'), []),
    SearchInputFields: Object.assign(require('definitions/divorce/json/SearchInputFields'), []),
    SearchResultFields: Object.assign(require('definitions/divorce/json/SearchResultFields'), []),
    State: nonprod.State,
    UserProfile: Object.assign(require('definitions/divorce/json/UserProfile'), []),
    WorkBasketInputFields: Object.assign(require('definitions/divorce/json/WorkBasketInputFields/WorkBasketInputFields'), []),
    WorkBasketResultFields: Object.assign(require('definitions/divorce/json/WorkBasketResultFields'), [])
  },
  prod: {
    AuthorisationCaseEvent: prod.AuthorisationCaseEvent,
    AuthorisationCaseField: prod.AuthorisationCaseField,
    AuthorisationCaseState: prod.AuthorisationCaseState,
    AuthorisationCaseType: Object.assign(require('definitions/divorce/json/AuthorisationCaseType/AuthorisationCaseType'), []),
    AuthorisationComplexType: prod.AuthorisationComplexType,
    CaseEvent: prod.CaseEvent,
    CaseEventToComplexTypes: prod.CaseEventToComplexTypes,
    CaseEventToFields: prod.CaseEventToFields,
    CaseField: prod.CaseField,
    CaseRoles: Object.assign(require('definitions/divorce/json/CaseRoles'), []),
    CaseType: Object.assign(require('definitions/divorce/json/CaseType'), []),
    CaseTypeTab:  prod.CaseTypeTab,
    ComplexTypes: Object.assign(require('definitions/divorce/json/ComplexTypes/ComplexTypes'), []),
    FixedLists: Object.assign(require('definitions/divorce/json/FixedLists/FixedLists'), []),
    Jurisdiction: Object.assign(require('definitions/divorce/json/Jurisdiction'), []),
    SearchAlias: Object.assign(require('definitions/divorce/json/SearchAlias'), []),
    SearchInputFields: Object.assign(require('definitions/divorce/json/SearchInputFields'), []),
    SearchResultFields: Object.assign(require('definitions/divorce/json/SearchResultFields'), []),
    State: prod.State,
    UserProfile: Object.assign(require('definitions/divorce/json/UserProfile'), []),
    WorkBasketInputFields: Object.assign(require('definitions/divorce/json/WorkBasketInputFields/WorkBasketInputFields'), []),
    WorkBasketResultFields: Object.assign(require('definitions/divorce/json/WorkBasketResultFields'), [])
  }

};

function uniqueRows (config) {
  Object.keys(config).forEach(sheetName => {
    const originalContent = config[sheetName];
    const uniqueList = uniq(originalContent);
    expect(uniqueList.length).to.eq(originalContent.length);
  });
}

function validateNames (config) {
  const accepted = /^[\w|*|\-|.|[|\]]+$/;
  const priorityUserFields = ['CaseFieldID', 'CaseStateID', 'ID', 'CaseEventID'];
  Object.keys(config).forEach(sheetName => {
    const content = config[sheetName];
    content.forEach(row => {
      priorityUserFields.forEach(field => {
        const cellValue = row[field];
        if (cellValue && !cellValue.match(accepted)) {
          console.log(`Cell ${field} value in sheet ${sheetName} has unexpected characters for value ${cellValue}.`);
          expect(cellValue.toString()).to.match(accepted);
        }
      });
    });
  });
}

describe('For each config sheet', () => {
  context("nonprod", () => {
    it('should have unique rows', () => {
      uniqueRows(Config.nonprod);
    });

    it('should not have any special characters, tabs or line breaks in any of the priority user fields', () => {
      validateNames(Config.nonprod);
    });
  })

  context("nonprod", () => {
    it('should have unique rows', () => {
      uniqueRows(Config.prod);
    });

    it('should not have any special characters, tabs or line breaks in any of the priority user fields', () => {
      validateNames(Config.prod);
    });
  })
});
