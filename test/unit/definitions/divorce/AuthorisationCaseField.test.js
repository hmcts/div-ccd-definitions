const { expect } = require('chai');
const { uniqWith } = require('lodash');
const { isFieldDuplicated, loadAllFiles } = require('../../utils/utils');
const { createAssertExists } = require('../../utils/assertBuilders');

const assertFieldExists = createAssertExists('Field');

const getAuthorisationCaseFieldDefinitions = loadAllFiles('AuthorisationCaseField');
const getCaseFieldDefinitions = loadAllFiles('CaseField');

describe('AuthorisationCaseField', () => {
  describe('Non-prod:', () => {
    let nonProdAuthorisationCaseField = [];
    let allFieldsForNonProd = [];

    before(() => {
      nonProdAuthorisationCaseField = getAuthorisationCaseFieldDefinitions([
        'AuthorisationCaseField',
        'AuthorisationCaseField-nonprod',
        'AuthorisationCaseField-alt-service-process-server-nonprod',
        'AuthorisationCaseField-alternative-service-nonprod',
        'AuthorisationCaseField-amend-court-orders-nonprod',
        'AuthorisationCaseField-deemed-and-dispensed-nonprod',
        'AuthorisationCaseField-general-email-nonprod',
        'AuthorisationCaseField-general-referral-nonprod',
        'AuthorisationCaseField-resp-journey-roles-and-permissions-nonprod',
        'AuthorisationCaseField-share-a-case-nonprod'
      ]);

      allFieldsForNonProd = getCaseFieldDefinitions([
        'CaseField',
        'CaseField-share-a-case-nonprod',
        'CaseField-alt-service-process-server-nonprod',
        'CaseField-alternative-service-nonprod',
        'CaseField-amend-court-orders-nonprod',
        'CaseField-deemed-and-dispensed-nonprod',
        'CaseField-general-email-nonprod',
        'CaseField-general-referral-nonprod',
        'CaseField-resp-journey-roles-and-permissions-nonprod'
      ]);
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
      prodAuthorisationCaseField = getAuthorisationCaseFieldDefinitions([
        'AuthorisationCaseField',
        'AuthorisationCaseField-prod'
      ]);

      allFieldsForProd = getCaseFieldDefinitions([
        'CaseField',
        'CaseField-prod'
      ]);
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
