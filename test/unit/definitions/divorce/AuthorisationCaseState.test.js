const expect = require('chai').expect;
const { uniqWith } = require('lodash');
const { isFieldDuplicated } = require('../../utils/utils');

const load = require;

function loadAllFiles(files) {
  let definitions = [];

  files.forEach(file => {
    definitions = definitions.concat(load(`definitions/divorce/json/AuthorisationCaseState/${file}.json`));
  });

  return definitions;
}

describe('AuthorisationCaseState', () => {
  it('should contain a unique case state, case type ID and role (no duplicates) for nonprod files', () => {
    const nonProd = loadAllFiles(
      [
        'AuthorisationCaseState',
        'AuthorisationCaseState-nonprod',
        'AuthorisationCaseState-deemed-and-dispensed-nonprod',
        'AuthorisationCaseState-pet-amend-nonprod'
      ]
    );
    const uniqResult = uniqWith(nonProd, isFieldDuplicated('CaseStateID'));

    expect(uniqResult).to.eql(nonProd);
  });

  it('should contain a unique case state ID, case type ID and role (no duplicates) for prod file', () => {
    const prodOnly = loadAllFiles(
      ['AuthorisationCaseState', 'AuthorisationCaseState-prod']
    );

    const uniqResult = uniqWith(prodOnly, isFieldDuplicated('CaseStateID'));

    expect(uniqResult).to.eql(prodOnly);
  });
});
