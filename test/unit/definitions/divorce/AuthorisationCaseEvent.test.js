const expect = require('chai').expect;
const { uniqWith } = require('lodash');

const load = require;
const authCaseEventCommon = Object.assign(require('definitions/divorce/json/AuthorisationCaseEvent/AuthorisationCaseEvent'), {});

function isDuplicated(field1, field2) {
  return field1.CaseTypeID === field2.CaseTypeID
    && field1.CaseEventID === field2.CaseEventID
    && field1.UserRole === field2.UserRole;
}

function mergeJsonFilesFor(whatEnvs) {
  const authCaseForSpecificEnvs = Object
    .assign(load(`definitions/divorce/json/AuthorisationCaseEvent/AuthorisationCaseEvent-${whatEnvs}`), {});

  return [...authCaseEventCommon, ...authCaseForSpecificEnvs];
}

describe('AuthorisationCaseEvent', () => {
  it('should contain a unique case type, case event ID and role (no duplicates) for non-prod', () => {
    const nonProd = mergeJsonFilesFor('nonprod');
    const uniqResult = uniqWith(nonProd, isDuplicated);

    expect(uniqResult).to.eql(nonProd);
  });

  it('should contain a unique case type, case event ID and role (no duplicates) for prod only', () => {
    const prodOnly = mergeJsonFilesFor('prod');
    const uniqResult = uniqWith(prodOnly, isDuplicated);

    expect(uniqResult).to.eql(prodOnly);
  });
});
