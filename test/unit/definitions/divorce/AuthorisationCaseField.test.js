const expect = require('chai').expect;
const { uniqWith } = require('lodash');
const fs = require('fs');

const load = require;
const authCaseField = Object.assign(require('definitions/divorce/json/AuthorisationCaseField/AuthorisationCaseField'), {});

function isDuplicated(field1, field2) {
  return field1.CaseTypeID === field2.CaseTypeID
    && field1.CaseFieldID === field2.CaseFieldID
    && field1.UserRole === field2.UserRole;
}

function mergeJsonFilesFor(whatFolder, nonProdStartsWith) {
  const files = fs.readdirSync(whatFolder);
  const authCaseFieldNonProd = [];

  files.forEach(filename => {
    const filenameRegEx = new RegExp(`${nonProdStartsWith}.*\.json`, 'i');
    if (filename.match(filenameRegEx)) {
       const nonProdFile = Object
          .assign(load(`${whatFolder}/${filename}`), {});
       authCaseFieldNonProd.push(...nonProdFile);
    }
  });

  return [...authCaseField, ...authCaseFieldNonProd];
}

describe('AuthorisationCaseField', () => {
  if (fs.existsSync('definitions/divorce/json/AuthorisationCaseField/')){
     it('should contain a unique case field ID, case type ID and role (no duplicates) for non prod files', () => {
        const jsonConfigFiles = mergeJsonFilesFor('definitions/divorce/json/AuthorisationCaseField/', 'AuthorisationCaseField-');
        const uniqResult = uniqWith(jsonConfigFiles, isDuplicated);

        expect(uniqResult).to.eql(jsonConfigFiles);
     });
  }

  it('should contain a unique case field ID, case type ID and role (no duplicates) for prod file', () => {
    const uniqResult = uniqWith(
      authCaseField,
      (field1, field2) => {
        return field1.CaseTypeID === field2.CaseTypeID
                   && field1.CaseFieldID === field2.CaseFieldID
                   && field1.UserRole === field2.UserRole;
      }
    );

    expect(uniqResult).to.eql(authCaseField);
  });
});
