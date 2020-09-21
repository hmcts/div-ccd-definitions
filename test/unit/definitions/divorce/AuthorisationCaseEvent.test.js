const { expect } = require('chai');
const { uniqWith } = require('lodash');
const { isFieldDuplicated } = require('../../utils/utils');
const { createAssertExists } = require('../../utils/assertBuilders');

const load = require;

const coreEvents = load('definitions/divorce/json/CaseEvent/CaseEvent.json');

const authCaseEventCommon = Object.assign(require('definitions/divorce/json/AuthorisationCaseEvent/AuthorisationCaseEvent'), {});

const assertEventExists = createAssertExists('Event');

function mergeJsonNonProdFiles() {
  const definitions = []
    .concat(load('definitions/divorce/json/AuthorisationCaseEvent/AuthorisationCaseEvent-deemed-and-dispensed-nonprod.json'))
    .concat(load('definitions/divorce/json/AuthorisationCaseEvent/AuthorisationCaseEvent-nonprod.json'));

  return [...authCaseEventCommon, ...definitions];
}

function mergeJsonProdFiles() {
  const definitions = []
    .concat(load('definitions/divorce/json/AuthorisationCaseEvent/AuthorisationCaseEvent-prod.json'));

  return [...authCaseEventCommon, ...definitions];
}

describe('AuthorisationCaseEvent', () => {
  describe('for nonprod should', () => {
    const nonProd = mergeJsonNonProdFiles();

    it('contain a unique case type, case event ID and role (no duplicates) for non-prod', () => {
      const uniqResult = uniqWith(nonProd, isFieldDuplicated('CaseEventID'));

      expect(uniqResult).to.eql(nonProd);
    });

    it('use existing events', () => {
      const allEventsForNonProd = coreEvents
        .concat(load('definitions/divorce/json/CaseEvent/CaseEvent-deemed-and-dispensed-nonprod.json'))
        .concat(load('definitions/divorce/json/CaseEvent/CaseEvent-general-email-nonprod.json'))
        .concat(load('definitions/divorce/json/CaseEvent/CaseEvent-general-order-nonprod.json'))
        .concat(load('definitions/divorce/json/CaseEvent/CaseEvent-nonprod.json'));

      assertEventExists(nonProd, allEventsForNonProd);
    });
  });

  describe('for prod should', () => {
    const prodOnly = mergeJsonProdFiles();

    it('contain a unique case type, case event ID and role (no duplicates)', () => {
      const uniqResult = uniqWith(prodOnly, isFieldDuplicated('CaseEventID'));

      expect(uniqResult).to.eql(prodOnly);
    });

    it('use existing events', () => {
      const allEventsForProd = coreEvents
        .concat(load('definitions/divorce/json/CaseEvent/CaseEvent-prod.json'));

      assertEventExists(prodOnly, allEventsForProd);
    });
  });
});
