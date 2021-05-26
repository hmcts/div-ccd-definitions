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
const userRoles = require('../../utils/userRoles');

function getUsersRolesToTest(givenUserRoles) {
  const userRolesToTest = [];
  if (Array.isArray(givenUserRoles)) {
    givenUserRoles.forEach(it => {
      userRolesToTest.push(it);
    });
  } else {
    userRolesToTest.push(givenUserRoles);
  }
  return userRolesToTest;
}

function assertTabVisibilityForGivenUserRoles(caseTypeTabs, tabLabel, givenUserRoles, shouldBeVisibleToUserRole) {
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

    const userRolesToTest = getUsersRolesToTest(givenUserRoles);
    for (const userRoleToTest of userRolesToTest) {
      if (!hasTabWithoutUserRole) {
        const userRoleExplicitlyAllowed = firstElementOfEachTab.find(tabElement => {
          return tabElement.UserRole === userRoleToTest;
        });
        if (!userRoleExplicitlyAllowed) {
          visibleToUserRole = false;
        }
      }

      if (visibleToUserRole !== shouldBeVisibleToUserRole) {
        assert.fail(`User role '${userRoleToTest}' does not have the expected access to tab with label '${tabLabel}'. Visible: '${visibleToUserRole}'; Expected to be visible: '${shouldBeVisibleToUserRole}'`);
      }
    }
  }
}

function assertTabIsVisibleForGivenUserRoles(caseTypeTabs, tabLabel, userRole) {
  assertTabVisibilityForGivenUserRoles(caseTypeTabs, tabLabel, userRole, true);
}

function assertTabIsNotVisibleForGivenUserRoles(caseTypeTabs, tabLabel, userRole) {
  assertTabVisibilityForGivenUserRoles(caseTypeTabs, tabLabel, userRole, false);
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
      if (field.CaseFieldID !== '[STATE]') {
        return validFields.indexOf(field.CaseFieldID) === -1;
      }
      return false;
    });
    expect(objectsWithInvalidCaseFieldId).to.eql([]);
  });

  it('should be visible to specific user roles', () => {
    assertTabIsVisibleForGivenUserRoles(caseTypeTab, 'Petition', userRoles.petSolicitorUserRole);
    assertTabIsVisibleForGivenUserRoles(caseTypeTab, 'AOS', userRoles.petSolicitorUserRole);
    assertTabIsVisibleForGivenUserRoles(caseTypeTab, 'Decree Nisi', userRoles.petSolicitorUserRole);
    assertTabIsVisibleForGivenUserRoles(caseTypeTab, 'Outcome of Decree Nisi', userRoles.petSolicitorUserRole);
    assertTabIsVisibleForGivenUserRoles(caseTypeTab, 'Decree Absolute', userRoles.petSolicitorUserRole);
    assertTabIsVisibleForGivenUserRoles(caseTypeTab, 'Documents', userRoles.petSolicitorUserRole);
    assertTabIsVisibleForGivenUserRoles(caseTypeTab, 'Confidential Petitioner', userRoles.petSolicitorUserRole);
    assertTabIsVisibleForGivenUserRoles(caseTypeTab, 'Marriage Certificate', userRoles.petSolicitorUserRole);
    assertTabIsVisibleForGivenUserRoles(caseTypeTab, 'Co-Respondent', userRoles.petSolicitorUserRole);
    assertTabIsVisibleForGivenUserRoles(caseTypeTab, 'Language', userRoles.petSolicitorUserRole);
    assertTabIsVisibleForGivenUserRoles(caseTypeTab, 'Linked Cases', userRoles.petSolicitorUserRole);

    assertTabIsVisibleForGivenUserRoles(caseTypeTab, 'Petition', userRoles.respSolicitorUserRole);
    assertTabIsVisibleForGivenUserRoles(caseTypeTab, 'AOS', userRoles.respSolicitorUserRole);
    assertTabIsVisibleForGivenUserRoles(caseTypeTab, 'Decree Nisi', userRoles.respSolicitorUserRole);
    assertTabIsVisibleForGivenUserRoles(caseTypeTab, 'Outcome of Decree Nisi', userRoles.respSolicitorUserRole);
    assertTabIsVisibleForGivenUserRoles(caseTypeTab, 'Decree Absolute', userRoles.respSolicitorUserRole);
    assertTabIsVisibleForGivenUserRoles(caseTypeTab, 'Documents', userRoles.respSolicitorUserRole);
    assertTabIsVisibleForGivenUserRoles(caseTypeTab, 'Confidential Respondent', userRoles.respSolicitorUserRole);
    assertTabIsVisibleForGivenUserRoles(caseTypeTab, 'Marriage Certificate', userRoles.respSolicitorUserRole);
    assertTabIsVisibleForGivenUserRoles(caseTypeTab, 'Co-Respondent', userRoles.respSolicitorUserRole);
    assertTabIsVisibleForGivenUserRoles(caseTypeTab, 'Language', userRoles.respSolicitorUserRole);
    assertTabIsVisibleForGivenUserRoles(caseTypeTab, 'Linked Cases', userRoles.respSolicitorUserRole);

    assertTabIsVisibleForGivenUserRoles(caseTypeTab, 'History', userRoles.allHumanCcdUiUserRoles);
  });

  it('should not be visible to user roles', () => {
    assertTabIsNotVisibleForGivenUserRoles(caseTypeTab, 'Payment', userRoles.petSolicitorUserRole);
    assertTabIsNotVisibleForGivenUserRoles(caseTypeTab, 'Confidential Respondent', userRoles.petSolicitorUserRole);
    assertTabIsNotVisibleForGivenUserRoles(caseTypeTab, 'Confidential Co-Respondent', userRoles.petSolicitorUserRole);
    assertTabIsNotVisibleForGivenUserRoles(caseTypeTab, 'Notes', userRoles.petSolicitorUserRole);

    assertTabIsNotVisibleForGivenUserRoles(caseTypeTab, 'Payment', userRoles.respSolicitorUserRole);
    assertTabIsNotVisibleForGivenUserRoles(caseTypeTab, 'Confidential Petitioner', userRoles.respSolicitorUserRole);
    assertTabIsNotVisibleForGivenUserRoles(caseTypeTab, 'Confidential Co-Respondent', userRoles.respSolicitorUserRole);
    assertTabIsNotVisibleForGivenUserRoles(caseTypeTab, 'Notes', userRoles.respSolicitorUserRole);
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

  it('should be visible to user roles', () => {
    assertTabIsVisibleForGivenUserRoles(caseTypeTab, 'Service Application', userRoles.allHumanNonSolicitorCcdUiUserRoles);
    assertTabIsVisibleForGivenUserRoles(caseTypeTab, 'General Referral', userRoles.allHumanNonSolicitorCcdUiUserRoles);

    assertTabIsVisibleForGivenUserRoles(caseTypeTab, 'Payment', userRoles.caseworkerBetaUserRole);

    assertTabIsVisibleForGivenUserRoles(caseTypeTab, 'History', userRoles.allHumanCcdUiUserRoles);
  });

  it('should not be visible to user roles', () => {
    assertTabIsNotVisibleForGivenUserRoles(caseTypeTab, 'Service Application', userRoles.solicitorUserRoles);
    assertTabIsNotVisibleForGivenUserRoles(caseTypeTab, 'General Referral', userRoles.solicitorUserRoles);

    assertTabIsNotVisibleForGivenUserRoles(caseTypeTab, 'Payment', userRoles.solicitorUserRole);
  });
});
