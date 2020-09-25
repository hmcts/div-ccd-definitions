const { expect, assert } = require('chai');
const { uniq, uniqWith, map, filter } = require('lodash');
const {
  loadAllFiles, sortCaseTypeTabs
} = require('../../utils/utils');
const {
  nonProdTabDisplayOrder,
  nonProdTabIds,
  prodTabDisplayOrder,
  prodTabIds,
  validateUniqueTabDisplayOrder,
  validateTabFieldDisplayOrder
} = require('../../utils/caseTabTypeHelper');

const getAllCaseTypeTabDefinitions = loadAllFiles('CaseTypeTab');
let caseTypeTab = [];

const getAllCaseFieldDefinitions = loadAllFiles('CaseField');
let caseField = [];

let sortedCaseTabs = [];
let tabIds = [];

describe('CaseTypeTab (nonprod)', () => {
  before(() => {
    caseTypeTab = getAllCaseTypeTabDefinitions(
      [
        'CaseTypeTab',
        'CaseTypeTab-general-order-nonprod',
        'CaseTypeTab-deemed-and-dispensed-nonprod'
      ]);

    caseField = getAllCaseFieldDefinitions(
      [
        'CaseField',
        'CaseField-general-order-nonprod',
        'CaseField-deemed-and-dispensed-nonprod'
      ]);
    sortedCaseTabs = sortCaseTypeTabs(caseTypeTab);
    tabIds = uniq(map(sortedCaseTabs, 'TabID'));
  });

  it('should contain unique case field ID per tab ID (no duplicate field in a tab)', () => {
    const uniqResult = uniqWith(
      caseTypeTab,
      (field1, field2) => {
        return field1.TabID === field2.TabID && field1.CaseFieldID === field2.CaseFieldID;
      }
    );
    expect(uniqResult).to.eql(caseTypeTab);
  });

  tabIds.forEach(tabId => {
    it(`all ${tabId} fields should have the expected tab order ${nonProdTabDisplayOrder[tabId]}`, () => {
      const allTabFields = uniq(filter(caseTypeTab, field => {
        return field.TabID === tabId;
      }));
      const allTabOrders = uniq(map(allTabFields, 'TabDisplayOrder'));
      expect(allTabOrders).to.eql([nonProdTabDisplayOrder[tabId]]);
    });
  });

  it('should contain valid Tab IDs', () => {
    expect(tabIds).to.eql(nonProdTabIds);
  });

  it('should contain valid case field IDs', () => {
    const validFields = uniq(map(caseField, 'ID'));
    const objectsWithInvalidCaseId = filter(caseTypeTab, field => {
      return validFields.indexOf(field.CaseFieldID) === -1;
    });
    expect(objectsWithInvalidCaseId).to.eql([]);
  });
});

/**
 * This suite (and sub suites) checks to make sure that there are no duplicate TabDisplayOrder or
 * TabFieldDisplayOrder in the concatenated release definition.
 * Note: As a post release activity the related release describe block can be removed
 * as the feature file would no longer exist
 */
describe('CaseTypeTab duplicate checks (nonprod)', () => {
  before(() => {
    sortedCaseTabs = sortCaseTypeTabs(caseTypeTab);
    tabIds = uniq(map(sortedCaseTabs, 'TabID'));
  });

  describe('General Order - CaseTypeTab check', () => {
    before(() => {
      caseTypeTab = getAllCaseTypeTabDefinitions(
        [
          'CaseTypeTab',
          'CaseTypeTab-prod',
          'CaseTypeTab-general-order-nonprod'
        ]);
    });

    it('should contain unique tab field display order ID field tab ID (no duplicate field order in a tab)', () => {
      const validationErrors = validateUniqueTabDisplayOrder(tabIds, caseTypeTab);
      expect(validationErrors).to.have.lengthOf(0);
    });

    it('should contain proper sequence for TabFieldDisplayOrder with no gaps', () => {
      assert.doesNotThrow(() => {
        validateTabFieldDisplayOrder(tabIds, caseTypeTab);
      },
      /Missing\/unordered TabFieldDisplayOrder sequence number in TabID/);
    });
  });

  describe('Deemed and Dispensed - CaseTypeTab check', () => {
    before(() => {
      caseTypeTab = getAllCaseTypeTabDefinitions(
        [
          'CaseTypeTab',
          'CaseTypeTab-deemed-and-dispensed-nonprod'
        ]);
    });

    it('should contain unique tab field display order ID field tab ID (no duplicate field order in a tab)', () => {
      const validationErrors = validateUniqueTabDisplayOrder(tabIds, caseTypeTab);
      expect(validationErrors).to.have.lengthOf(0);
    });

    it('should contain proper sequence for TabFieldDisplayOrder with no gaps', () => {
      assert.doesNotThrow(() => {
        validateTabFieldDisplayOrder(tabIds, caseTypeTab);
      },
      /Missing\/unordered TabFieldDisplayOrder sequence number in TabID/);
    });
  });
});

describe('CaseTypeTab (prod)', () => {
  before(() => {
    caseTypeTab = getAllCaseTypeTabDefinitions(
      [
        'CaseTypeTab',
        'CaseTypeTab-prod'
      ]);

    caseField = getAllCaseFieldDefinitions(
      [
        'CaseField',
        'CaseField-prod'
      ]);
    sortedCaseTabs = sortCaseTypeTabs(caseTypeTab);
    tabIds = uniq(map(sortedCaseTabs, 'TabID'));
  });

  it('should contain unique case field ID per tab ID (no duplicate field in a tab)', () => {
    const uniqResult = uniqWith(
      caseTypeTab,
      (field1, field2) => {
        return field1.TabID === field2.TabID && field1.CaseFieldID === field2.CaseFieldID;
      }
    );
    expect(uniqResult).to.eql(caseTypeTab);
  });

  tabIds.forEach(tabId => {
    it(`all ${tabId} fields should have the expected tab order ${prodTabDisplayOrder[tabId]}`, () => {
      const allTabFields = uniq(filter(caseTypeTab, field => {
        return field.TabID === tabId;
      }));
      const allTabOrders = uniq(map(allTabFields, 'TabDisplayOrder'));
      expect(allTabOrders).to.eql([prodTabDisplayOrder[tabId]]);
    });
  });

  it('should contain valid Tab IDs', () => {
    expect(tabIds).to.eql(prodTabIds);
  });

  it('should contain valid case field IDs', () => {
    const validFields = uniq(map(caseField, 'ID'));
    const objectsWithInvalidCaseId = filter(caseTypeTab, field => {
      return validFields.indexOf(field.CaseFieldID) === -1;
    });
    expect(objectsWithInvalidCaseId).to.eql([]);
  });

  it('should contain unique tab field display order ID field tab ID (no duplicate field order in a tab)', () => {
    const validationErrors = validateUniqueTabDisplayOrder(tabIds, caseTypeTab);
    expect(validationErrors).to.have.lengthOf(0);
  });

  it('should contain proper sequence for TabFieldDisplayOrder with no gaps', () => {
    assert.doesNotThrow(() => {
      validateTabFieldDisplayOrder(tabIds, caseTypeTab);
    },
    /Missing\/unordered TabFieldDisplayOrder sequence number in TabID/);
  });
});
