const expect = require('chai').expect;
const { uniqWith } = require('lodash');
const { isFieldDuplicated } = require('../../utils/utils');

const load = require;

const states = load(`definitions/divorce/json/State/State.json`);

function loadAllFiles(files) {
  let definitions = [];

  files.forEach(file => {
    definitions = definitions.concat(load(`definitions/divorce/json/AuthorisationCaseState/${file}.json`));
  });

  return definitions;
}

describe('AuthorisationCaseState', () => {
  describe('for nonprod files all definitions should', () => {
    const nonProd = loadAllFiles(
      [
        'AuthorisationCaseState',
        'AuthorisationCaseState-nonprod',
        'AuthorisationCaseState-deemed-and-dispensed-nonprod',
        'AuthorisationCaseState-pet-amend-nonprod'
      ]
    );

    it('contain a unique case state, case type ID and role (no duplicates) for nonprod files', () => {
      const uniqResult = uniqWith(nonProd, isFieldDuplicated('CaseStateID'));
      expect(uniqResult).to.eql(nonProd);
    });

    it('use existing states', () => {
      nonProd.forEach(authDefinition => {
        expect(find(states, ['ID', authDefinition.CaseStateID])).to.be.an('object');
      })
    });
  });

  describe('for prod files all definitions should', () => {
    const nonProd = loadAllFiles(
      [
        'AuthorisationCaseState',
        'AuthorisationCaseState-prod',
        'AuthorisationCaseState-pet-amend-prod'
      ]
    );

    it('contain a unique case state, case type ID and role (no duplicates)', () => {
      const uniqResult = uniqWith(nonProd, isFieldDuplicated('CaseStateID'));
      expect(uniqResult).to.eql(nonProd);
    });

    it('use existing states ', () => {
      nonProd.forEach(authDefinition => {
        expect(find(states, ['ID', authDefinition.CaseStateID])).to.be.an('object');
      })
    });
  });
});
