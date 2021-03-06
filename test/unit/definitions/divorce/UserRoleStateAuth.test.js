const expect = require('chai').expect;
const { differenceWith } = require('lodash');
const { byCaseType, byStateName, mapErrorArray, missingAuthorisationsExist } = require('../../utils/utils');
const { nonprod, prod } = require('../../utils/dataProvider');

const MINIMUM_READ_PERMISSIONS = /C?RU?D?/;
const EXCLUDED_STATES = ['SOTAgreementPayAndSubmitRequired', 'Rejected', 'Withdrawn', 'solicitorAwaitingPaymentConfirmation', 'Submitted'];

function checkPerms(entry) {
  expect(entry.CRUD).to.match(MINIMUM_READ_PERMISSIONS);
}

function runTest(authorisationCaseState, authorisationCaseType, state, caseType) {
  // iterate each case type
  // get all state auths for case type
  // get all roles for case type
  // get all states for case type
  // for each state
  // ensure each role has auth 'R' minimum
  caseType.forEach(caseTypeEntry => {
    const caseTypeId = caseTypeEntry.ID;
    const authStatesForCaseType = authorisationCaseState.filter(byCaseType(caseTypeId));
    const authRolesForCaseType = authorisationCaseType.filter(byCaseType(caseTypeId));
    const statesForCaseType = state.filter(byCaseType(caseTypeId));

    statesForCaseType.forEach(stateEntry => {
      if (EXCLUDED_STATES.includes(stateEntry.ID)) {
        return;
      }
      let missingAuthCount = 0;
      const authForState = authStatesForCaseType.filter(byStateName(stateEntry));
      if (authForState.length !== authRolesForCaseType.length) {
        missingAuthCount = authRolesForCaseType.length - authForState.length;
        const diffAuthStates = differenceWith(authRolesForCaseType, authForState, (userRoleEntry, authStateEntry) => {
          return authStateEntry.UserRole === userRoleEntry.UserRole;
        }).map(mapErrorArray(caseTypeId));
        if (missingAuthorisationsExist(missingAuthCount)) {
          console.log(`Missing ${missingAuthCount} authorisations for state: ${stateEntry.ID}`);
          console.dir(diffAuthStates);
        } else {
          console.log(`Expected authorisations for state: ${stateEntry.ID}`);
        }
      }

      authForState.forEach(checkPerms);
    });
  });
}

describe('UserRole authorisations for CaseState', () => {
  context('nonprod', () => {
    it('should allow minimum R access for all Case States per User Role ', () => {
      runTest(nonprod.AuthorisationCaseState, nonprod.AuthorisationCaseType, nonprod.State, nonprod.CaseType);
    });
  });

  context('prod', () => {
    it('should allow minimum R access for all Case States per User Role ', () => {
      runTest(prod.AuthorisationCaseState, prod.AuthorisationCaseType, prod.State, prod.CaseType);
    });
  });
});
