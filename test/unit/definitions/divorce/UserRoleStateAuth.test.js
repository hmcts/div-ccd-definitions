const expect = require('chai').expect;
const { differenceWith } = require('lodash');
const load = require;

function loadAllFiles (files) {
  let definitions = [];

  files.forEach(file => {
    definitions = definitions.concat(load(`definitions/divorce/json/AuthorisationCaseState/${file}.json`));
  });

  return definitions;
}

const CaseType = Object.assign(require('definitions/divorce/json/CaseType'), []);
const AuthorisationCaseType = Object.assign(require('definitions/divorce/json/AuthorisationCaseType/AuthorisationCaseType'), []);
const State = Object.assign(require('definitions/divorce/json/State/State'), []);

const MINIMUM_READ_PERMISSIONS = /C?RU?D?/;
const EXCLUDED_STATES = ['SOTAgreementPayAndSubmitRequired', 'Rejected', 'Withdrawn', 'DNisRefused', 'solicitorAwaitingPaymentConfirmation', 'AwaitingAmendCase'];

function byCaseType (caseType) {
  return entry => {
    return entry.CaseTypeID === caseType;
  };
}

function byStateName (stateEntry) {
  return stateAuth => {
    return stateAuth.CaseStateID === stateEntry.ID;
  };
}

function mapErrorArray (caseType) {
  return entry => {
    return {
      UserRole: entry.UserRole,
      CaseType: caseType
    };
  };
}

function checkPerms (entry) {
  expect(entry.CRUD).to.match(MINIMUM_READ_PERMISSIONS);
}

function runTest (authorisationCaseState) {
  // iterate each case type
  // get all state auths for case type
  // get all roles for case type
  // get all states for case type
  // for each state
  // ensure each role has auth 'R' minimum
  CaseType.forEach(caseTypeEntry => {
    const caseType = caseTypeEntry.ID;
    const authStatesForCaseType = authorisationCaseState.filter(byCaseType(caseType));
    const authRolesForCaseType = AuthorisationCaseType.filter(byCaseType(caseType));
    const statesForCaseType = State.filter(byCaseType(caseType));

    statesForCaseType.forEach(stateEntry => {
      if (EXCLUDED_STATES.includes(stateEntry.ID)) {
        return;
      }
      const authForState = authStatesForCaseType.filter(byStateName(stateEntry));
      if (authForState.length !== authRolesForCaseType.length) {
        const missingAuthCount = authRolesForCaseType.length - authForState.length;
        const diffAuthStates = differenceWith(authRolesForCaseType, authForState, (userRoleEntry, authStateEntry) => {
          return authStateEntry.UserRole === userRoleEntry.UserRole;
        }).map(mapErrorArray(caseType));
        console.log(`Missing ${missingAuthCount} authorisations for state: ${stateEntry.ID}`);
        console.dir(diffAuthStates);
      }
      expect(authForState.length).to.eql(authRolesForCaseType.length);
      authForState.forEach(checkPerms);
    });
  });
}

describe('UserRole authorisations for CaseState', () => {
  context('should allow minimum R access for all Case States per User Role ', () => {
    it('(non-prod)', () => {
      const nonprod = loadAllFiles(
        [
          'AuthorisationCaseState',
          'AuthorisationCaseState-nonprod',
          'AuthorisationCaseState-deemed-and-dispensed-nonprod',
          'AuthorisationCaseState-pet-amend-nonprod'
        ]
      );

      runTest(nonprod);
    });

    it('(prod)', () => {
      const prod = loadAllFiles(
        [
          'AuthorisationCaseState',
          'AuthorisationCaseState-nonprod',
          'AuthorisationCaseState-deemed-and-dispensed-nonprod',
          'AuthorisationCaseState-pet-amend-nonprod'
        ]
      );

      runTest(prod);
    });
  });
});
