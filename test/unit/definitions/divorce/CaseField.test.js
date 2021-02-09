const { expect } = require('chai');
const { uniqWith } = require('lodash');
const {
  SHORT_STRING,
  MEDIUM_STRING,
  isNotEmpty,
  isNotLongerThan,
  noDuplicateFound
} = require('../../utils/utils');
const { prod, nonprod } = require('../../utils/dataProvider');

function assertFieldDefinitionIsValid (row) {
  expect(row.CaseTypeID).to.be.a('string').and.satisfy(v => {
    return v.startsWith('DIVORCE');
  });
  expect(row.ID).to.be.a('string').and.satisfy(isNotLongerThan(MEDIUM_STRING));
  expect(row.Label).to.be.a('string').and.satisfy(isNotEmpty());
  expect(row.SecurityClassification).to.eq('Public');
  expect(row.FieldType).to.be.a('string').and.satisfy(isNotLongerThan(MEDIUM_STRING));
  if(row.FieldType === 'Collection' || row.FieldType === 'FixedList' ||
    row.FieldType === 'FixedRadioList' || row.FieldType === 'MultiSelectList') {
    expect(row.FieldTypeParameter).to.be.a('string').and.satisfy(isNotEmpty());
  }
}

describe('CaseField', () => {
  context('NonProd:', () => {
    let nonProd = [];
    let uniqResult = [];

    before(() => {
      nonProd = nonprod.CaseField;
      uniqResult = uniqWith(nonProd, noDuplicateFound);
    });

    it('should not contain duplicated definitions of the same field', () => {
      expect(uniqResult).to.eql(nonProd);
    });

    it('should have only valid definitions', () => {
      uniqResult.forEach(assertFieldDefinitionIsValid);
    });
  });

  context('Prod:', () => {
    let prodOnly = [];
    let uniqResult = [];

    before(() => {
      prodOnly = prod.CaseField;

      uniqResult = uniqWith(prodOnly, noDuplicateFound);
    });

    it('should not contain duplicated definitions of the same case field', () => {
      expect(uniqResult).to.eql(prodOnly);
    });

    it('should have only valid definitions', () => {
      uniqResult.forEach(assertFieldDefinitionIsValid);
    });
  });
});
