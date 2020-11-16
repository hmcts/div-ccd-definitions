const { expect } = require('chai');
const { uniqWith } = require('lodash');
const {
  isNotEmpty, isNotLongerThan, noDuplicateFound,
  whenPopulated, loadAllFiles
} = require('../../utils/utils');

const SHORT_STRING = 30;
const MEDIUM_STRING = 70;
const LONG_STRING = 100;

const getCaseEventDefinitions = loadAllFiles('CaseEvent');

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
  describe('NonProd:', () => {
    let nonProd = [];
    let uniqResult = [];

    before(() => {
      nonProd = getCaseEventDefinitions([
        'CaseEvent',
        'CaseEvent-alternative-service-nonprod',
        'CaseEvent-deemed-and-dispensed-nonprod',
        'CaseEvent-general-email-nonprod',
        'CaseEvent-general-referral-nonprod',
        'CaseEvent-nonprod'
      ]);

      uniqResult = uniqWith(nonProd, noDuplicateFound);
    });

    it('should not contain duplicated definitions of the same event', () => {
      expect(uniqResult).to.eql(nonProd);
    });

    it('should have only valid definitions', () => {
      uniqResult.forEach(assertEventDefinitionIsValid);
    });
  });

  describe('Prod:', () => {
    let prodOnly = [];
    let uniqResult = [];

    before(() => {
      prodOnly = getCaseEventDefinitions(
        [
          'CaseEvent',
          'CaseEvent-prod'
        ]);

      uniqResult = uniqWith(prodOnly, noDuplicateFound);
    });

    it('should not contain duplicated definitions of the same event', () => {
      expect(uniqResult).to.eql(prodOnly);
    });

    it('should have only valid definitions', () => {
      uniqResult.forEach(assertEventDefinitionIsValid);
    });
  });
});
