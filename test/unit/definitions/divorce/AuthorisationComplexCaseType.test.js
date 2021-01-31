const { expect } = require('chai');
const { getUniqValues, loadAllFiles } = require('../../utils/utils');

const getAuthorisationComplexTypeDefinitions = loadAllFiles('AuthorisationComplexType');
const getCaseFieldDefinitions = loadAllFiles('CaseField');

describe('AuthorisationComplexType', () => {
  describe('Non-prod:', () => {
    let nonProdAuthorisationComplexType = [];
    let allFieldsForNonProd = [];

    before(() => {
      nonProdAuthorisationComplexType = getAuthorisationComplexTypeDefinitions([
        'AuthorisationComplexType-resp-journey-roles-and-permissions-nonprod',
        'AuthorisationComplexType-share-a-case-nonprod'
      ]);

      allFieldsForNonProd = getCaseFieldDefinitions([
        'CaseField-resp-journey-roles-and-permissions-nonprod',
        'CaseField-share-a-case-nonprod'
      ]);
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
      prodAuthorisationComplexType = getAuthorisationComplexTypeDefinitions(['AuthorisationComplexType']);

      allFieldsForProd = getCaseFieldDefinitions([
        'CaseField',
        'CaseField-prod'
      ]);
    });

    it('should have a list of ComplexType IDs that exist in CaseFields', () => {
      const uniqProdComplexTypeCaseFieldID = getUniqValues(prodAuthorisationComplexType, 'CaseFieldID');
      const uniqProdCaseFieldID = getUniqValues(allFieldsForProd, 'ID');

      expect(uniqProdCaseFieldID).to.include.members(uniqProdComplexTypeCaseFieldID);
    });
  });
});
