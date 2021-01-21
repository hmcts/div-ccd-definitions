const load = require;
const { sortBy, uniqBy, map } = require('lodash');
const { expect } = require('chai');

const SHORT_STRING = 30;
const MEDIUM_STRING = 70;
const LONG_STRING = 100;

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

function getUniqValues(objectArray, property) {
  return map(uniqBy(objectArray, property), obj => {
    return obj[property];
  });
}

module.exports = {
  SHORT_STRING,
  MEDIUM_STRING,
  LONG_STRING,
  isFieldDuplicated,
  loadAllFiles,
  sortCaseTypeTabs,
  noDuplicateFound,
  isNotEmpty,
  isNotLongerThan,
  whenPopulated,
  getUniqValues
};
