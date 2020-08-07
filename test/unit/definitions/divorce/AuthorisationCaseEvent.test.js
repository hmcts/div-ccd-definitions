const expect = require('chai').expect;
const { uniqWith } = require('lodash');
const isFieldDuplicated = require('../../utils/utils').isFieldDuplicated;

const load = require;
const authCaseEventCommon = Object.assign(require('definitions/divorce/json/AuthorisationCaseEvent/AuthorisationCaseEvent'), {});

function mergeJsonNonProdFiles() {
  const definitions = []
    .concat(load('definitions/divorce/json/AuthorisationCaseEvent/AuthorisationCaseEvent-deemed-and-dispensed-nonprod.json'))
    .concat(load('definitions/divorce/json/AuthorisationCaseEvent/AuthorisationCaseEvent-nonprod.json'))
    .concat(load('definitions/divorce/json/AuthorisationCaseEvent/AuthorisationCaseEvent-pet-amend-nonprod.json'));

  return [...authCaseEventCommon, ...definitions];
}

function mergeJsonProdFiles() {
  const definitions = []
    .concat(load('definitions/divorce/json/AuthorisationCaseEvent/AuthorisationCaseEvent-prod.json'));

  return [...authCaseEventCommon, ...definitions];
}

describe('AuthorisationCaseEvent', () => {
  it('should contain a unique case type, case event ID and role (no duplicates) for non-prod', () => {
    const nonProd = mergeJsonNonProdFiles();
    const uniqResult = uniqWith(nonProd, isFieldDuplicated('CaseEventID'));

    expect(uniqResult).to.eql(nonProd);
  });
});

describe('AuthorisationCaseEvent', () => {
  it('should contain a unique case type, case event ID and role (no duplicates) for non-prod', () => {
    const prodOnly = mergeJsonProdFiles();
    const uniqResult = uniqWith(prodOnly, isFieldDuplicated('CaseEventID'));

    expect(uniqResult).to.eql(prodOnly);
  });
});
