const { expect, assert } = require('chai');
const { uniqWith, find } = require('lodash');
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

function assertStateExists (authorisations, states) {
  const errors = [];

  authorisations.forEach(authDefinition => {
    try {
      expect(find(states, ['ID', authDefinition.CaseStateID])).to.exist;
    } catch (error) {
      errors.push(`\nState ${authDefinition.CaseStateID}  is not defined`);
    }
  });

  if (errors.length) {
    assert.fail(`Broken tests: ${errors}`);
  }
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
      const nonProdStates = states
        .concat(load(`definitions/divorce/json/State/State-deemed-and-dispensed-nonprod.json`))
        .concat(load(`definitions/divorce/json/State/State-pet-amend-nonprod.json`));

      assertStateExists(nonProd, nonProdStates);
    });
  });

  describe('for prod files all definitions should', () => {
    const prod = loadAllFiles(
      [
        'AuthorisationCaseState',
        'AuthorisationCaseState-prod',
        'AuthorisationCaseState-pet-amend-prod'
      ]
    );

    it('contain a unique case state, case type ID and role (no duplicates)', () => {
      const uniqResult = uniqWith(prod, isFieldDuplicated('CaseStateID'));
      expect(uniqResult).to.eql(prod);
    });

    it('use existing states ', () => {
      assertStateExists(prod, states);
    });
  });
});
