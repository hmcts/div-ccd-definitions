const expect = require('chai').expect;
const { uniqWith } = require('lodash');
const isFieldDuplicated = require('../utils').isFieldDuplicated

const load = require;
const authCaseEventCommon = Object.assign(require('definitions/divorce/json/AuthorisationCaseEvent/AuthorisationCaseEvent'), {});

function mergeJsonFilesFor(whatEnvs) {
  const authCaseForSpecificEnvs = Object
    .assign(load(`definitions/divorce/json/AuthorisationCaseEvent/AuthorisationCaseEvent-${whatEnvs}`), {});

  return [...authCaseEventCommon, ...authCaseForSpecificEnvs];
}

describe('AuthorisationCaseEvent', () => {
  it('should contain a unique case type, case event ID and role (no duplicates) for non-prod', () => {
    const nonProd = mergeJsonFilesFor('nonprod');
    const uniqResult = uniqWith(nonProd, isFieldDuplicated('CaseEventID'));

    expect(uniqResult).to.eql(nonProd);
  });
});

describe('AuthorisationCaseEvent', () => {
  it('should contain a unique case type, case event ID and role (no duplicates) for non-prod', () => {
    const prodOnly = mergeJsonFilesFor('prod');
    const uniqResult = uniqWith(prodOnly, isFieldDuplicated('CaseEventID'));

    expect(uniqResult).to.eql(prodOnly);
  });
});
