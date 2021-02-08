const { expect, assert } = require('chai');
const { uniq, uniqWith, map, filter } = require('lodash');
const { sortCaseTypeTabs } = require('../../utils/utils');
const {
  nonProdTabDisplayOrder,
  nonProdTabIds,
  prodTabDisplayOrder,
  prodTabIds,
  validateUniqueTabDisplayOrder
} = require('../../utils/caseTabTypeHelper');
const { prod, nonprod } = require('../../utils/dataProvider');

const caseworkerBetaUserRole = 'caseworker-divorce-courtadmin_beta';
const solicitorUserRole = 'caseworker-divorce-solicitor';
const petSolicitorUserRole = '[PETSOLICITOR]';
const respSolicitorUserRole = '[RESPSOLICITOR]';

function assertTabVisibilityForGivenUserRole(caseTypeTabs, tabLabel, userRole, shouldBeVisibleToUserRole) {
  const tabElementsWithLabel = caseTypeTabs.filter(t => {
    return t.TabLabel === tabLabel;
  });

  if (tabElementsWithLabel.length === 0) {
    assert.fail(`Could not find specified tab elements with label '${tabLabel}'`);
  } else {
    let visibleToUserRole = true;

    const uniqueTabIds = [
      ...new Set(tabElementsWithLabel.map(tab => {
        return tab.TabID;
      }))
    ];
    const separatedTabElements = uniqueTabIds.map(id => {
      return tabElementsWithLabel.filter(tabElement => {
        return tabElement.TabID === id;
      });
    });
    const firstElementOfEachTab = separatedTabElements.map(tabElement => {
      return tabElement[0];
    });

    const hasTabWithoutUserRole = firstElementOfEachTab.find(tabElement => {
      return !('UserRole' in tabElement);
    });
    if (!hasTabWithoutUserRole) {
      const userRoleExplicitlyAllowed = firstElementOfEachTab.find(tabElement => {
        return tabElement.UserRole === userRole;
      });
      if (!userRoleExplicitlyAllowed) {
        visibleToUserRole = false;
      }
    }

    if (visibleToUserRole !== shouldBeVisibleToUserRole) {
      assert.fail(`User role '${userRole}' does not have the expected access to tab with label '${tabLabel}'. Visible: '${visibleToUserRole}'; Expected to be visible: '${shouldBeVisibleToUserRole}'`);
    }
  }
}

function assertTabIsVisibleForGivenUserRole(caseTypeTabs, tabLabel, userRole) {
  assertTabVisibilityForGivenUserRole(caseTypeTabs, tabLabel, userRole, true);
}

function assertTabIsNotVisibleForGivenUserRole(caseTypeTabs, tabLabel, userRole) {
  assertTabVisibilityForGivenUserRole(caseTypeTabs, tabLabel, userRole, false);
}

describe('CaseTypeTab (nonprod)', () => {
  let caseField = [];
  let caseTypeTab = [];
  let sortedCaseTabs = [];
  let tabIds = [];

  before(() => {
    caseTypeTab = nonprod.CaseTypeTab;
    caseField = nonprod.CaseField;

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
    const objectsWithInvalidCaseFieldId = filter(caseTypeTab, field => {
      return validFields.indexOf(field.CaseFieldID) === -1;
    });
    expect(objectsWithInvalidCaseFieldId).to.eql([]);
  });

  it('should be visible to specific users', () => {
    assertTabIsVisibleForGivenUserRole(caseTypeTab, 'History', petSolicitorUserRole);
    assertTabIsVisibleForGivenUserRole(caseTypeTab, 'Petition', petSolicitorUserRole);
    assertTabIsVisibleForGivenUserRole(caseTypeTab, 'AOS', petSolicitorUserRole);
    assertTabIsVisibleForGivenUserRole(caseTypeTab, 'Decree Nisi', petSolicitorUserRole);
    assertTabIsVisibleForGivenUserRole(caseTypeTab, 'Outcome of Decree Nisi', petSolicitorUserRole);
    assertTabIsVisibleForGivenUserRole(caseTypeTab, 'Decree Absolute', petSolicitorUserRole);
    assertTabIsVisibleForGivenUserRole(caseTypeTab, 'Documents', petSolicitorUserRole);
    assertTabIsVisibleForGivenUserRole(caseTypeTab, 'Confidential Petitioner', petSolicitorUserRole);
    assertTabIsVisibleForGivenUserRole(caseTypeTab, 'Marriage Certificate', petSolicitorUserRole);
    assertTabIsVisibleForGivenUserRole(caseTypeTab, 'Co-Respondent', petSolicitorUserRole);
    assertTabIsVisibleForGivenUserRole(caseTypeTab, 'Language', petSolicitorUserRole);
    assertTabIsVisibleForGivenUserRole(caseTypeTab, 'Linked Cases', petSolicitorUserRole);
    assertTabIsVisibleForGivenUserRole(caseTypeTab, 'General Referral', petSolicitorUserRole);

    assertTabIsVisibleForGivenUserRole(caseTypeTab, 'History', respSolicitorUserRole);
    assertTabIsVisibleForGivenUserRole(caseTypeTab, 'Petition', respSolicitorUserRole);
    assertTabIsVisibleForGivenUserRole(caseTypeTab, 'AOS', respSolicitorUserRole);
    assertTabIsVisibleForGivenUserRole(caseTypeTab, 'Decree Nisi', respSolicitorUserRole);
    assertTabIsVisibleForGivenUserRole(caseTypeTab, 'Outcome of Decree Nisi', respSolicitorUserRole);
    assertTabIsVisibleForGivenUserRole(caseTypeTab, 'Decree Absolute', respSolicitorUserRole);
    assertTabIsVisibleForGivenUserRole(caseTypeTab, 'Documents', respSolicitorUserRole);
    assertTabIsVisibleForGivenUserRole(caseTypeTab, 'Confidential Respondent', respSolicitorUserRole);
    assertTabIsVisibleForGivenUserRole(caseTypeTab, 'Marriage Certificate', respSolicitorUserRole);
    assertTabIsVisibleForGivenUserRole(caseTypeTab, 'Co-Respondent', respSolicitorUserRole);
    assertTabIsVisibleForGivenUserRole(caseTypeTab, 'Language', respSolicitorUserRole);
    assertTabIsVisibleForGivenUserRole(caseTypeTab, 'Linked Cases', respSolicitorUserRole);
    assertTabIsVisibleForGivenUserRole(caseTypeTab, 'General Referral', respSolicitorUserRole);
  });

  it('should not be visible to specific users', () => {
    assertTabIsNotVisibleForGivenUserRole(caseTypeTab, 'Payment', petSolicitorUserRole);
    assertTabIsNotVisibleForGivenUserRole(caseTypeTab, 'Confidential Respondent', petSolicitorUserRole);
    assertTabIsNotVisibleForGivenUserRole(caseTypeTab, 'Confidential Co-Respondent', petSolicitorUserRole);
    assertTabIsNotVisibleForGivenUserRole(caseTypeTab, 'Notes', petSolicitorUserRole);

    assertTabIsNotVisibleForGivenUserRole(caseTypeTab, 'Payment', respSolicitorUserRole);
    assertTabIsNotVisibleForGivenUserRole(caseTypeTab, 'Confidential Petitioner', respSolicitorUserRole);
    assertTabIsNotVisibleForGivenUserRole(caseTypeTab, 'Confidential Co-Respondent', respSolicitorUserRole);
    assertTabIsNotVisibleForGivenUserRole(caseTypeTab, 'Notes', respSolicitorUserRole);
  });
});

describe('CaseTypeTab (prod)', () => {
  let caseField = [];
  let caseTypeTab = [];
  let sortedCaseTabs = [];
  let tabIds = [];

  before(() => {
    caseTypeTab = prod.CaseTypeTab;
    caseField = prod.CaseField;

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

  it('should be visible to specific users', () => {
    assertTabIsVisibleForGivenUserRole(caseTypeTab, 'History', caseworkerBetaUserRole);
    assertTabIsVisibleForGivenUserRole(caseTypeTab, 'Payment', caseworkerBetaUserRole);
  });

  it('should not be visible to specific users', () => {
    assertTabIsNotVisibleForGivenUserRole(caseTypeTab, 'Payment', solicitorUserRole);
  });
});
