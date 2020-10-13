const load = require;
const { sortBy } = require('lodash');
const { expect } = require('chai');

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

module.exports = {
  isFieldDuplicated,
  loadAllFiles,
  sortCaseTypeTabs,
  noDuplicateFound,
  isNotEmpty,
  isNotLongerThan,
  whenPopulated
};
