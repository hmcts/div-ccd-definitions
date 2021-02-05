const { expect } = require('chai');
const { MEDIUM_STRING, isNotLongerThan } = require('../../utils/utils');
const { prod, nonprod } = require('../../utils/dataProvider');

const DISPLAY_CONTEXTS = ['MANDATORY', 'READONLY', 'OPTIONAL'];

function assertEventToComplexTypesDefinitionIsValid (row) {
  expect(row.CaseTypeID).to.be.a('string').and.satisfy(v => {
    return v.startsWith('DIVORCE');
  });
  expect(row.ID).to.be.a('string').and.satisfy(isNotLongerThan(MEDIUM_STRING));
  expect(row.CaseFieldID).to.be.a('string').and.satisfy(isNotLongerThan(MEDIUM_STRING));
  expect(row.CaseEventID).to.be.a('string').and.satisfy(isNotLongerThan(MEDIUM_STRING));
  expect(row.ListElementCode).to.be.a('string').and.satisfy(isNotLongerThan(MEDIUM_STRING));
  expect(DISPLAY_CONTEXTS).to.includes(row.DisplayContext);
}

describe('CaseEventToComplexTypes', () => {
  describe('NonProd:', () => {
    let nonProdDefinitions = [];

    before(() => {
      nonProdDefinitions = nonprod.CaseEventToComplexTypes;
    });

    it('should have only valid definitions', () => {
      nonProdDefinitions.forEach(assertEventToComplexTypesDefinitionIsValid);
    });
  });

  describe('Prod:', () => {
    let prodOnlyDefinitions = [];

    before(() => {
      prodOnlyDefinitions = prod.CaseEventToComplexTypes;
    });

    it('should have only valid definitions', () => {
      prodOnlyDefinitions.forEach(assertEventToComplexTypesDefinitionIsValid);
    });
  });
});
