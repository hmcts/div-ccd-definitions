const { expect } = require('chai');
const { uniqWith } = require('lodash');
const { isFieldDuplicated, loadAllFiles } = require('../../utils/utils');
const { createAssertExists } = require('../../utils/assertBuilders');

const assertStateExists = createAssertExists('State');
const getAuthorisationCaseStateDefinitions = loadAllFiles('AuthorisationCaseState');
const getStateDefinitions = loadAllFiles('State');

describe('AuthorisationCaseState', () => {
  describe('NonProd files definitions:', () => {
    let nonProd = [];
    let nonProdStates = [];

    before(() => {
      nonProd = getAuthorisationCaseStateDefinitions(
        [
          'AuthorisationCaseState',
          'AuthorisationCaseState-nonprod',
          'AuthorisationCaseState-deemed-and-dispensed-nonprod',
          'AuthorisationCaseState-general-referral-nonprod',
          'AuthorisationCaseState-bailiff-nonprod'
        ]
      );
      nonProdStates = getStateDefinitions([
        'State',
        'State-deemed-and-dispensed-nonprod',
        'State-general-referral-nonprod',
        'State-bailiff-nonprod'
      ]);
    });

    it('should contain a unique case state, case type ID and role (no duplicates) for nonprod files', () => {
      const uniqResult = uniqWith(nonProd, isFieldDuplicated('CaseStateID'));
      expect(uniqResult).to.eql(nonProd);
    });

    it('should use existing states', () => {
      assertStateExists(nonProd, nonProdStates);
    });
  });

  describe('Prod files definitions:', () => {
    let prod = [];
    let prodStates = [];

    before(() => {
      prod = getAuthorisationCaseStateDefinitions(
        [
          'AuthorisationCaseState',
          'AuthorisationCaseState-prod'
        ]
      );
      prodStates = getStateDefinitions(['State']);
    });

    it('should contain a unique case state, case type ID and role (no duplicates)', () => {
      const uniqResult = uniqWith(prod, isFieldDuplicated('CaseStateID'));
      expect(uniqResult).to.eql(prod);
    });

    it('should use existing states ', () => {
      assertStateExists(prod, prodStates);
    });
  });
});
