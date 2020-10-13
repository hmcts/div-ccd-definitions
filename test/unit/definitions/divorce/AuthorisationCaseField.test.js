const expect = require('chai').expect;
const { uniqWith } = require('lodash');
const { isFieldDuplicated } = require('../../utils/utils');
const { createAssertExists } = require('../../utils/assertBuilders');

const load = require;
const authCaseField = Object.assign(require('definitions/divorce/json/AuthorisationCaseField/AuthorisationCaseField'), {});

const coreFields = load('definitions/divorce/json/CaseField/CaseField.json');
const assertFieldExists = createAssertExists('Field');

describe('AuthorisationCaseField', () => {
  const path = 'definitions/divorce/json/AuthorisationCaseField/AuthorisationCaseField';

  describe('for non-prod should', () => {
    const nonProd = authCaseField
      .concat(load(`${path}-deemed-and-dispensed-nonprod.json`))
      .concat(load(`${path}-general-email-nonprod.json`))
      .concat(load(`${path}-general-order-nonprod.json`))
      .concat(load(`${path}-nonprod.json`));

    it('contain a unique case field ID, case type ID and role (no duplicates)', () => {
      const uniqResult = uniqWith(nonProd, isFieldDuplicated('CaseFieldID'));

      expect(uniqResult).to.eql(nonProd);
    });

    it('use existing fields', () => {
      const allFieldsForNonProd = coreFields
        .concat(load('definitions/divorce/json/CaseField/CaseField-deemed-and-dispensed-nonprod.json'))
        .concat(load('definitions/divorce/json/CaseField/CaseField-general-email-nonprod.json'))
        .concat(load('definitions/divorce/json/CaseField/CaseField-general-order-nonprod.json'));
      assertFieldExists(nonProd, allFieldsForNonProd);
    });
  });

  describe('for prod should', () => {
    const prod = authCaseField
      .concat(load(`${path}-deemed-and-dispensed-nonprod.json`))
      .concat(load(`${path}-general-email-nonprod.json`))
      .concat(load(`${path}-general-order-nonprod.json`))
      .concat(load(`${path}-nonprod.json`));

    it('contain a unique case field ID, case type ID and role (no duplicates)', () => {
      const uniqResult = uniqWith(prod, isFieldDuplicated('CaseFieldID'));

      expect(uniqResult).to.eql(prod);
    });

    it('use existing fields', () => {
      const allFieldsForNonProd = coreFields
        .concat(load('definitions/divorce/json/CaseField/CaseField-deemed-and-dispensed-nonprod.json'))
        .concat(load('definitions/divorce/json/CaseField/CaseField-general-email-nonprod.json'))
        .concat(load('definitions/divorce/json/CaseField/CaseField-general-order-nonprod.json'));
      assertFieldExists(prod, allFieldsForNonProd);
    });
  });
});
