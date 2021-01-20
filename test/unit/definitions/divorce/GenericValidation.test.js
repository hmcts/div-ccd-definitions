/* eslint global-require: "off", max-nested-callbacks: "off" */

const expect = require('chai').expect;
const { uniq } = require('lodash');

const Config = {
  AuthorisationCaseEvent: Object.assign(require('definitions/divorce/json/AuthorisationCaseEvent/AuthorisationCaseEvent'), []),
  AuthorisationCaseField: Object.assign(require('definitions/divorce/json/AuthorisationCaseField/AuthorisationCaseField'), []),
  AuthorisationCaseState: Object.assign(require('definitions/divorce/json/AuthorisationCaseState/AuthorisationCaseState'), []),
  AuthorisationCaseType: Object.assign(require('definitions/divorce/json/AuthorisationCaseType/AuthorisationCaseType'), []),
  AuthorisationComplexType: Object.assign(require('definitions/divorce/json/AuthorisationComplexType/AuthorisationComplexType'), []),
  CaseEvent: Object.assign(require('definitions/divorce/json/CaseEvent/CaseEvent'), []),
  CaseEventToComplexTypes: Object.assign(require('definitions/divorce/json/CaseEventToComplexTypes/CaseEventToComplexTypes'), []),
  CaseEventToFields: Object.assign(require('definitions/divorce/json/CaseEventToFields/CaseEventToFields'), []),
  CaseField: Object.assign(require('definitions/divorce/json/CaseField/CaseField'), []),
  CaseRoles: Object.assign(require('definitions/divorce/json/CaseRoles'), []),
  CaseType: Object.assign(require('definitions/divorce/json/CaseType'), []),
  CaseTypeTab: Object.assign(require('definitions/divorce/json/CaseTypeTab/CaseTypeTab'), []),
  ComplexTypes: Object.assign(require('definitions/divorce/json/ComplexTypes/ComplexTypes'), []),
  FixedLists: Object.assign(require('definitions/divorce/json/FixedLists/FixedLists'), []),
  Jurisdiction: Object.assign(require('definitions/divorce/json/Jurisdiction'), []),
  SearchAlias: Object.assign(require('definitions/divorce/json/SearchAlias'), []),
  SearchInputFields: Object.assign(require('definitions/divorce/json/SearchInputFields'), []),
  SearchResultFields: Object.assign(require('definitions/divorce/json/SearchResultFields'), []),
  State: Object.assign(require('definitions/divorce/json/State/State'), []),
  UserProfile: Object.assign(require('definitions/divorce/json/UserProfile'), []),
  WorkBasketInputFields: Object.assign(require('definitions/divorce/json/WorkBasketInputFields/WorkBasketInputFields'), []),
  WorkBasketResultFields: Object.assign(require('definitions/divorce/json/WorkBasketResultFields'), [])
};

describe('For each config sheet', () => {
  it('should have unique rows', () => {
    Object.keys(Config).forEach(sheetName => {
      const originalContent = Config[sheetName];
      const uniqueList = uniq(originalContent);
      expect(uniqueList.length).to.eq(originalContent.length);
    });
  });

  it('should not have any special characters, tabs or line breaks in any of the priority user fields', () => {
    const accepted = /^[\w|*|\-|.|[|\]]+$/;
    const priorityUserFields = ['CaseFieldID', 'CaseStateID', 'ID', 'CaseEventID'];
    Object.keys(Config).forEach(sheetName => {
      const content = Config[sheetName];
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
  });
});
