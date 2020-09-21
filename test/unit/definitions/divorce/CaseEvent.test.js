const { expect } = require('chai');
const { uniqWith } = require('lodash');
const { isNotEmpty, isNotLongerThan, noDuplicateFound, whenPopulated } = require('../../utils/utils');

const SHORT_STRING = 30;
const MEDIUM_STRING = 70;
const LONG_STRING = 100;

const load = require;

const coreEvents = load('definitions/divorce/json/CaseEvent/CaseEvent.json');

function assertEventDefinitionIsValid(row) {
  expect(row.CaseTypeID).to.be.a('string').and.satisfy(v => {
    return v.startsWith('DIVORCE');
  });
  expect(row.ID).to.be.a('string').and.satisfy(isNotLongerThan(MEDIUM_STRING));
  expect(row.Name).to.be.a('string').and.satisfy(isNotLongerThan(SHORT_STRING));
  expect(row.SecurityClassification).to.eq('Public');
  expect(row.PostConditionState).to.be.a('string').and.satisfy(isNotLongerThan(MEDIUM_STRING));
  whenPopulated(row['PreConditionState(s)']).expect(isNotEmpty());
  whenPopulated(row.Description).expect(isNotLongerThan(LONG_STRING));
  whenPopulated(row.ShowSummary).expect(v => {
    return ['Y', 'N'].includes(v);
  });
  whenPopulated(row.EndButtonLabel).expect(isNotLongerThan(MEDIUM_STRING));
}

describe('CaseEvent', () => {
  describe('for nonprod should', () => {
    const nonProd = coreEvents
      .concat(load('definitions/divorce/json/CaseEvent/CaseEvent-deemed-and-dispensed-nonprod.json'))
      .concat(load('definitions/divorce/json/CaseEvent/CaseEvent-general-email-nonprod.json'))
      .concat(load('definitions/divorce/json/CaseEvent/CaseEvent-general-order-nonprod.json'))
      .concat(load('definitions/divorce/json/CaseEvent/CaseEvent-nonprod.json'));

    const uniqResult = uniqWith(nonProd, noDuplicateFound);

    it('not contain duplicated definitions of the same event', () => {
      expect(uniqResult).to.eql(nonProd);
    });

    it('have only valid definitions', () => {
      uniqResult.forEach(assertEventDefinitionIsValid);
    });
  });

  describe('for prod should', () => {
    const prodOnly = coreEvents
      .concat(load('definitions/divorce/json/CaseEvent/CaseEvent-prod.json'));

    const uniqResult = uniqWith(prodOnly, noDuplicateFound);

    it('not contain duplicated definitions of the same event', () => {
      expect(uniqResult).to.eql(prodOnly);
    });

    it('have only valid definitions', () => {
      uniqResult.forEach(assertEventDefinitionIsValid);
    });
  });
});
