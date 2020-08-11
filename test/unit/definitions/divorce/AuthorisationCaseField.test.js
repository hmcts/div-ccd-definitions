const expect = require('chai').expect;
const { uniqWith } = require('lodash');
const fs = require('fs');
const { isFieldDuplicated } = require('../../utils/utils');

const load = require;
const authCaseField = Object.assign(require('definitions/divorce/json/AuthorisationCaseField/AuthorisationCaseField'), {});

function mergeJsonFilesFor(whatFolder, nonProdStartsWith) {
  const files = fs.readdirSync(whatFolder);
  const authCaseFieldNonProd = [];

  files.forEach(filename => {
    const filenameRegEx = new RegExp(`${nonProdStartsWith}.*nonprod.json`, 'i');
    if (filename.match(filenameRegEx)) {
      const nonProdFile = Object.assign(load(`${whatFolder}/${filename}`), {});
      authCaseFieldNonProd.push(...nonProdFile);
    }
  });

  return [...authCaseField, ...authCaseFieldNonProd];
}

describe('AuthorisationCaseField', () => {
  if (fs.existsSync('definitions/divorce/json/AuthorisationCaseField/')) {
    it('should contain a unique case field ID, case type ID and role (no duplicates) for non prod files', () => {
      const jsonConfigFiles = mergeJsonFilesFor('definitions/divorce/json/AuthorisationCaseField/', 'AuthorisationCaseField-');
      const uniqResult = uniqWith(jsonConfigFiles, isFieldDuplicated('CaseFieldID'));

      expect(uniqResult).to.eql(jsonConfigFiles);
    });
  }

  it('should contain a unique case field ID, case type ID and role (no duplicates) for prod file', () => {
    const uniqResult = uniqWith(authCaseField, isFieldDuplicated('CaseFieldID'));

    expect(uniqResult).to.eql(authCaseField);
  });
});
