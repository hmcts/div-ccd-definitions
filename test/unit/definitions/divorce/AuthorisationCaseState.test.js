const { expect } = require('chai');
const { uniqWith } = require('lodash');
const { isFieldDuplicated } = require('../../utils/utils');
const { createAssertExists } = require('../../utils/assertBuilders');

const load = require;

const states = load('definitions/divorce/json/State/State.json');

function loadAllFiles(files) {
  let definitions = [];

  files.forEach(file => {
    definitions = definitions.concat(load(`definitions/divorce/json/AuthorisationCaseState/${file}.json`));
  });

  return definitions;
}

const assertStateExists = createAssertExists('State');

describe('AuthorisationCaseState', () => {
  describe('for nonprod files all definitions should', () => {
    const nonProd = loadAllFiles(
      [
        'AuthorisationCaseState',
        'AuthorisationCaseState-nonprod',
        'AuthorisationCaseState-deemed-and-dispensed-nonprod',
        'AuthorisationCaseState-bailiff-nonprod'
      ]
    );

    it('contain a unique case state, case type ID and role (no duplicates) for nonprod files', () => {
      const uniqResult = uniqWith(nonProd, isFieldDuplicated('CaseStateID'));
      expect(uniqResult).to.eql(nonProd);
    });

    it('use existing states', () => {
      const nonProdStates = states
        .concat(load('definitions/divorce/json/State/State-deemed-and-dispensed-nonprod.json'))
        .concat(load('definitions/divorce/json/State/State-bailiff-nonprod.json'));

      assertStateExists(nonProd, nonProdStates);
    });
  });

  describe('for prod files all definitions should', () => {
    const prod = loadAllFiles(
      [
        'AuthorisationCaseState',
        'AuthorisationCaseState-prod'
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
