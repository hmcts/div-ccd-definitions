const { expect } = require('chai');
const { getUniqValues } = require('../../utils/utils');
const { prod, nonprod } = require('../../utils/dataProvider');

describe('AuthorisationComplexType', () => {
  describe('Non-prod:', () => {
    let nonProdAuthorisationComplexType = [];
    let allFieldsForNonProd = [];

    before(() => {
      nonProdAuthorisationComplexType = nonprod.AuthorisationComplexType;
      allFieldsForNonProd = nonprod.CaseField;
    });

    it('should have a list of ComplexType IDs that exist in CaseFields', () => {
      const uniqNonProdComplexTypeCaseFieldID = getUniqValues(nonProdAuthorisationComplexType, 'CaseFieldID');
      const uniqNonProdCaseFieldID = getUniqValues(allFieldsForNonProd, 'ID');

      expect(uniqNonProdCaseFieldID).to.include.members(uniqNonProdComplexTypeCaseFieldID);
    });
  });

  describe('Prod:', () => {
    let prodAuthorisationComplexType = [];
    let allFieldsForProd = [];

    before(() => {
      prodAuthorisationComplexType = prod.AuthorisationComplexType;
      allFieldsForProd = prod.CaseField;
    });

    it('should have a list of ComplexType IDs that exist in CaseFields', () => {
      const uniqProdComplexTypeCaseFieldID = getUniqValues(prodAuthorisationComplexType, 'CaseFieldID');
      const uniqProdCaseFieldID = getUniqValues(allFieldsForProd, 'ID');

      expect(uniqProdCaseFieldID).to.include.members(uniqProdComplexTypeCaseFieldID);
    });
  });
});
