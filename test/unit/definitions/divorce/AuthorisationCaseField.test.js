const { expect } = require('chai');
const { uniqWith } = require('lodash');
const { isFieldDuplicated } = require('../../utils/utils');
const { createAssertExists } = require('../../utils/assertBuilders');
const { prod, nonprod } = require('../../utils/dataProvider');

const assertFieldExists = createAssertExists('Field');

describe('AuthorisationCaseField', () => {
  describe('Non-prod:', () => {
    let nonProdAuthorisationCaseField = [];
    let allFieldsForNonProd = [];

    before(() => {
      nonProdAuthorisationCaseField = nonprod.AuthorisationCaseField;
      allFieldsForNonProd = nonprod.CaseField;
    });

    it('should contain a unique case field ID, case type ID and role (no duplicates)', () => {
      const uniqResult = uniqWith(nonProdAuthorisationCaseField, isFieldDuplicated('CaseFieldID'));

      expect(uniqResult).to.eql(nonProdAuthorisationCaseField);
    });

    it('should use existing fields', () => {
      assertFieldExists(nonProdAuthorisationCaseField, allFieldsForNonProd);
    });
  });

  describe('Prod:', () => {
    let prodAuthorisationCaseField = [];
    let allFieldsForProd = [];

    before(() => {
      prodAuthorisationCaseField = prod.AuthorisationCaseField;
      allFieldsForProd = prod.CaseField;
    });

    it('should contain a unique case field ID, case type ID and role (no duplicates)', () => {
      const uniqResult = uniqWith(prodAuthorisationCaseField, isFieldDuplicated('CaseFieldID'));

      expect(uniqResult).to.eql(prodAuthorisationCaseField);
    });

    it('should use existing fields', () => {
      assertFieldExists(prodAuthorisationCaseField, allFieldsForProd);
    });
  });
});
