/* eslint global-require: "off", max-nested-callbacks: "off" */

const expect = require('chai').expect;
const { uniq } = require('lodash');
const { prod, nonprod } = require('../../utils/dataProvider');

const Config = {
  nonprod: {
    AuthorisationCaseEvent: nonprod.AuthorisationCaseEvent,
    AuthorisationCaseField: nonprod.AuthorisationCaseField,
    AuthorisationCaseState: nonprod.AuthorisationCaseState,
    AuthorisationCaseType: nonprod.AuthorisationCaseType,
    AuthorisationComplexType: nonprod.AuthorisationComplexType,
    CaseEvent: nonprod.CaseEvent,
    CaseEventToComplexTypes: nonprod.CaseEventToComplexTypes,
    CaseEventToFields: nonprod.CaseEventToFields,
    CaseField: nonprod.CaseField,
    CaseRoles: nonprod.CaseRoles,
    CaseType: nonprod.CaseType,
    CaseTypeTab: nonprod.CaseTypeTab,
    ComplexTypes: nonprod.ComplexTypes,
    FixedLists: nonprod.FixedLists,
    Jurisdiction: nonprod.Jurisdiction,
    SearchAlias: nonprod.SearchAlias,
    SearchInputFields: nonprod.SearchInputFields,
    SearchResultFields: nonprod.SearchResultFields,
    State: nonprod.State,
    UserProfile: nonprod.UserProfile,
    WorkBasketInputFields: nonprod.WorkBasketInputFields,
    WorkBasketResultFields: nonprod.WorkBasketResultFields
  },
  prod: {
    AuthorisationCaseEvent: prod.AuthorisationCaseEvent,
    AuthorisationCaseField: prod.AuthorisationCaseField,
    AuthorisationCaseState: prod.AuthorisationCaseState,
    AuthorisationCaseType: prod.AuthorisationCaseType,
    AuthorisationComplexType: prod.AuthorisationComplexType,
    CaseEvent: prod.CaseEvent,
    CaseEventToComplexTypes: prod.CaseEventToComplexTypes,
    CaseEventToFields: prod.CaseEventToFields,
    CaseField: prod.CaseField,
    CaseRoles: prod.CaseRoles,
    CaseType: prod.CaseType,
    CaseTypeTab: prod.CaseTypeTab,
    ComplexTypes: prod.ComplexTypes,
    FixedLists: prod.FixedLists,
    Jurisdiction: prod.Jurisdiction,
    SearchAlias: prod.SearchAlias,
    SearchInputFields: prod.SearchInputFields,
    SearchResultFields: prod.SearchResultFields,
    State: prod.State,
    UserProfile: prod.UserProfile,
    WorkBasketInputFields: prod.WorkBasketInputFields,
    WorkBasketResultFields: prod.WorkBasketResultFields
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
