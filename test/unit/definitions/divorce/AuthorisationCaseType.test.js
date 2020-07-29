const expect = require('chai').expect;
const { uniqWith } = require('lodash');
const fs = require('fs');

const load = require;
const authCaseType = Object.assign(require('definitions/divorce/json/AuthorisationCaseType/AuthorisationCaseType'), {});

function isDuplicated(field1, field2) {
  return field1.CaseTypeID === field2.CaseTypeID
    && field1.UserRole === field2.UserRole;
}

function mergeJsonFilesFor(whatFolder, nonProdStartsWith) {
  const files = fs.readdirSync(whatFolder);
  const authCaseTypeNonProd = [];

  files.forEach(filename => {
    const filenameRegEx = new RegExp(`${nonProdStartsWith}.*.json`, 'i');
    if (filename.match(filenameRegEx)) {
      const nonProdFile = Object
        .assign(load(`${whatFolder}/${filename}`), {});
      authCaseTypeNonProd.push(...nonProdFile);
    }
  });

  return [...authCaseType, ...authCaseTypeNonProd];
}

describe('AuthorisationCaseType', () => {
  if (fs.existsSync('definitions/divorce/json/AuthorisationCaseType/')) {
    it('should contain a unique case type ID and role (no duplicates) for non prod files', () => {
      const jsonConfigFiles = mergeJsonFilesFor('definitions/divorce/json/AuthorisationCaseType/', 'AuthorisationCaseType-');
      const uniqResult = uniqWith(jsonConfigFiles, isDuplicated);

      expect(uniqResult).to.eql(jsonConfigFiles);
    });
  }

  it('should contain a unique case type ID and role (no duplicates) for prod file', () => {
    const uniqResult = uniqWith(authCaseType, isDuplicated);

    expect(uniqResult).to.eql(authCaseType);
  });
});
