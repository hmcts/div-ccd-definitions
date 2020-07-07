const expect = require('chai').expect;
const { uniqWith } = require('lodash');

const load = require;
const authCaseStateCommon = Object.assign(require('definitions/divorce/json/AuthorisationCaseState/AuthorisationCaseState'), {});

function isDuplicated(field1, field2) {
    return field1.CaseTypeID === field2.CaseTypeID
        && field1.CaseStateID === field2.CaseStateID
        && field1.UserRole === field2.UserRole;
}

function mergeJsonFilesFor(whatEnvs) {
    const authCaseForSpecificEnvs = Object
        .assign(load(`definitions/divorce/json/AuthorisationCaseState/AuthorisationCaseState-${whatEnvs}`), {});

    return [...authCaseStateCommon, ...authCaseForSpecificEnvs];
}

describe('AuthorisationCaseState', () => {
    it('should contain a unique case state, case type ID and role (no duplicates) for nonprod files', () => {
        const nonProd = mergeJsonFilesFor('nonprod');
        const uniqResult = uniqWith(nonProd, isDuplicated);

        expect(uniqResult).to.eql(nonProd);
    });

    it('should contain a unique case state ID, case type ID and role (no duplicates) for prod file', () => {
        const prodOnly = mergeJsonFilesFor('prod');
        const uniqResult = uniqWith(prodOnly, isDuplicated);

        expect(uniqResult).to.eql(prodOnly);
    });
});
