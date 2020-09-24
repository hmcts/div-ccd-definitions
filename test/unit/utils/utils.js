const load = require;
const { sortBy, uniqWith, filter, isEqual, map } = require('lodash');
const { expect, assert } = require('chai');

function isFieldDuplicated(field) {
  return function isDuplicated(field1, field2) {
    return field1.CaseTypeID === field2.CaseTypeID
            && field1[field] === field2[field]
            && field1.UserRole === field2.UserRole;
  };
}

function isNotEmpty() {
  return v => {
    return v !== null && v.length > 0;
  };
}

function isNotLongerThan(maxLength) {
  return v => {
    return v !== null && v.length > 0 && v.length <= maxLength;
  };
}

function whenPopulated(key) {
  return {
    expect: satisfyCallback => {
      if (key) {
        expect(key).to.be.a('string').and.satisfy(satisfyCallback);
      }
    }
  };
}

function noDuplicateFound(a, b) {
  return a.CaseTypeID === b.CaseTypeID && a.ID === b.ID;
}

function loadAllFiles(location) {
  return function loadFeatureFiles(featureFiles) {
    let definitions = [];

    featureFiles.forEach(featureFile => {
      definitions = definitions
        .concat(load(`definitions/divorce/json/${location}/${featureFile}.json`));
    });

    return definitions;
  };
}

function sortCaseTypeTabs(caseTypeTab) {
  return sortBy(caseTypeTab, tab => {
    return tab.TabDisplayOrder;
  });
}

/**
 * Validates the tab display ids to ensure there are no duplicate in the feature files
 * @param tabIds List of case type TabID's
 * @param caseTypeTab List of casetype tabs. A concatenation from all feature files
 * @returns {[]} List with duplicates if found
 */
function validateUniqueTabDisplayOrder(tabIds, caseTypeTab) {
  const errors = [];
  let allFieldsPerTab = null;
  let uniqResults = null;

  tabIds.forEach(tabId => {
    allFieldsPerTab = filter(caseTypeTab, field => {
      return field.TabID === tabId;
    });

    uniqResults = uniqWith(
      allFieldsPerTab,
      (field1, field2) => {
        return field1.TabFieldDisplayOrder === field2.TabFieldDisplayOrder;
      });

    if (!isEqual(allFieldsPerTab, uniqResults)) {
      errors.push(uniqResults);
    }
  });

  return errors;
}

/**
 * Validates the tab field display order to ensure there are no gaps in feature files.
 * Would throw an error if a duplicate tab display id is found
 * @param tabIds List of case type TabID's
 * @param caseTypeTab caseTypeTab List of casetype tabs. A concatenation from all feature files
 */
function validateTabFieldDisplayOrder(tabIds, caseTypeTab) {
  let allFieldsPerTab = [];
  let allTabFieldDisplayOrderNumbers = [];

  tabIds.forEach(tabId => {
    allFieldsPerTab = filter(caseTypeTab, field => {
      return field.TabID === tabId;
    });
    allTabFieldDisplayOrderNumbers = map(allFieldsPerTab, field => {
      return field.TabFieldDisplayOrder;
    })
      .sort((a, b) => {
        return a - b;
      });
    for (let i = 1; i < allTabFieldDisplayOrderNumbers.length; i++) {
      if (allTabFieldDisplayOrderNumbers[i] - allTabFieldDisplayOrderNumbers[i - 1] !== 1) {
        assert.fail(`Missing/unordered TabFieldDisplayOrder sequence number in TabID ${tabId} - expected ${allTabFieldDisplayOrderNumbers[i - 1] + 1} but got ${allTabFieldDisplayOrderNumbers[i]}`);
      }
    }
  });
}

module.exports = {
  isFieldDuplicated,
  loadAllFiles,
  sortCaseTypeTabs,
  noDuplicateFound,
  isNotEmpty,
  isNotLongerThan,
  whenPopulated,
  validateUniqueTabDisplayOrder,
  validateTabFieldDisplayOrder
};
