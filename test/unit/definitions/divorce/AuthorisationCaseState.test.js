const expect = require('chai').expect;
const { uniqWith } = require('lodash');
const isFieldDuplicated = require('../utils').isFieldDuplicated

const load = require;
const authCaseStateCommon = Object.assign(require('definitions/divorce/json/AuthorisationCaseState/AuthorisationCaseState'), {});

function mergeJsonFilesFor(whatEnvs) {
  const authCaseForSpecificEnvs = Object
    .assign(load(`definitions/divorce/json/AuthorisationCaseState/AuthorisationCaseState-${whatEnvs}`), {});

  return [...authCaseStateCommon, ...authCaseForSpecificEnvs];
}

describe('AuthorisationCaseState', () => {
  it('should contain a unique case state, case type ID and role (no duplicates) for nonprod files', () => {
    const nonProd = mergeJsonFilesFor('nonprod');
    const uniqResult = uniqWith(nonProd, isFieldDuplicated('CaseStateID'));

    expect(uniqResult).to.eql(nonProd);
  });

  it('should contain a unique case state ID, case type ID and role (no duplicates) for prod file', () => {
    const prodOnly = mergeJsonFilesFor('prod');
    const uniqResult = uniqWith(prodOnly, isFieldDuplicated('CaseStateID'));

    expect(uniqResult).to.eql(prodOnly);
  });
});
