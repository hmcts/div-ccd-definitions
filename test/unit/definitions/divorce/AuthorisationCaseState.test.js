const expect = require('chai').expect;
const { uniqWith } = require('lodash');
const fs = require('fs');

const load = require;
const authCaseState = Object.assign(require('definitions/divorce/json/AuthorisationCaseState/AuthorisationCaseState'), {});

function isDuplicated(field1, field2) {
  return field1.CaseTypeID === field2.CaseTypeID
    && field1.CaseStateID === field2.CaseStateID
    && field1.UserRole === field2.UserRole;
}

function mergeJsonFilesFor(whatFolder, nonProdStartsWith) {
  const files = fs.readdirSync(whatFolder);
  const authCaseStateNonProd = [];

  files.forEach(filename => {
    const filenameRegEx = new RegExp(`${nonProdStartsWith}.*\.json`, 'i');
    if (filename.match(filenameRegEx)) {
       const nonProdFile = Object
          .assign(load(`${whatFolder}/${filename}`), {});
       authCaseStateNonProd.push(...nonProdFile);
    }
  });

  return [...authCaseState, ...authCaseStateNonProd];
}

describe('AuthorisationCaseState', () => {
  if (fs.existsSync('definitions/divorce/json/AuthorisationCaseState/')){
     it('should contain a unique case state ID, case type ID and role (no duplicates) for non prod files', () => {
        const jsonConfigFiles = mergeJsonFilesFor('definitions/divorce/json/AuthorisationCaseState/', 'AuthorisationCaseState-');
        const uniqResult = uniqWith(jsonConfigFiles, isDuplicated);

        expect(uniqResult).to.eql(jsonConfigFiles);
     });
  }

  it('should contain a unique case state ID, case type ID and role (no duplicates) for prod file', () => {
    const uniqResult = uniqWith(
      authCaseState,
      (field1, field2) => {
        return field1.CaseTypeID === field2.CaseTypeID
                   && field1.CaseStateID === field2.CaseStateID
                   && field1.UserRole === field2.UserRole;
      }
    );

    expect(uniqResult).to.eql(authCaseState);
  });
});
