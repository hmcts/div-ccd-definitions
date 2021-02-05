const { expect } = require('chai');
const { uniqWith } = require('lodash');
const { isFieldDuplicated } = require('../../utils/utils');
const { createAssertExists } = require('../../utils/assertBuilders');
const { prod, nonprod } = require('../../utils/dataProvider');

const assertEventExists = createAssertExists('Event');

describe('AuthorisationCaseEvent', () => {
  describe('NonProd:', () => {
    let nonProd = [];
    let allEventsForNonProd = [];

    before(() => {
      nonProd = nonprod.AuthorisationCaseEvent;
      allEventsForNonProd = nonprod.CaseEvent;
    });

    it('should contain a unique case type, case event ID and role (no duplicates) for non-prod', () => {
      const uniqResult = uniqWith(nonProd, isFieldDuplicated('CaseEventID'));

      expect(uniqResult).to.eql(nonProd);
    });

    it('should use existing events', () => {
      assertEventExists(nonProd, allEventsForNonProd);
    });
  });

  describe('Prod:', () => {
    let prodOnly = [];
    let allEventsForProd = [];

    before(() => {
      prodOnly = prod.AuthorisationCaseEvent;
      allEventsForProd = prod.CaseEvent;
    });

    it('should contain a unique case type, case event ID and role (no duplicates)', () => {
      const uniqResult = uniqWith(prodOnly, isFieldDuplicated('CaseEventID'));

      expect(uniqResult).to.eql(prodOnly);
    });

    it('should use existing events', () => {
      assertEventExists(prodOnly, allEventsForProd);
    });
  });
});
