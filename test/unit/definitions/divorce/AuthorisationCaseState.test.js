const { expect } = require('chai');
const { uniqWith } = require('lodash');
const { isFieldDuplicated } = require('../../utils/utils');
const { createAssertExists } = require('../../utils/assertBuilders');
const { prod, nonprod } = require('../../utils/dataProvider');

const assertStateExists = createAssertExists('State');

describe('AuthorisationCaseState', () => {
  describe('NonProd files definitions:', () => {
    let nonProd = [];
    let nonProdStates = [];

    before(() => {
      nonProd = nonprod.AuthorisationCaseState;
      nonProdStates = nonprod.State;
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
    let prodOnly = [];
    let prodStates = [];

    before(() => {
      prodOnly = prod.AuthorisationCaseState;
      prodStates = prod.State;
    });

    it('should contain a unique case state, case type ID and role (no duplicates)', () => {
      const uniqResult = uniqWith(prodOnly, isFieldDuplicated('CaseStateID'));
      expect(uniqResult).to.eql(prodOnly);
    });

    it('should use existing states ', () => {
      assertStateExists(prodOnly, prodStates);
    });
  });
});
