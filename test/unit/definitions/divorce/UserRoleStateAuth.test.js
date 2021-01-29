const expect = require('chai').expect;
const { differenceWith } = require('lodash');
const { loadAllFiles } = require('../../utils/utils');

const CaseType = Object.assign(require('definitions/divorce/json/CaseType'), []);
const getAuthorisationCaseStateDefinitions = loadAllFiles('AuthorisationCaseState');
const getAuthorisationCaseTypeDefinitions = loadAllFiles('AuthorisationCaseType');
const getStatesDefinitions = loadAllFiles('State');

const AuthorisationCaseType = getAuthorisationCaseTypeDefinitions(['AuthorisationCaseType']);
const State = getStatesDefinitions(['State']);

const MINIMUM_READ_PERMISSIONS = /C?RU?D?/;
const EXCLUDED_STATES = ['SOTAgreementPayAndSubmitRequired', 'Rejected', 'Withdrawn', 'solicitorAwaitingPaymentConfirmation'];

function byCaseType(caseType) {
  return entry => {
    return entry.CaseTypeID === caseType;
  };
}

function byStateName(stateEntry) {
  return stateAuth => {
    return stateAuth.CaseStateID === stateEntry.ID;
  };
}

function mapErrorArray(caseType) {
  return entry => {
    return {
      UserRole: entry.UserRole,
      CaseType: caseType
    };
  };
}

function checkPerms(entry) {
  expect(entry.CRUD).to.match(MINIMUM_READ_PERMISSIONS);
}

function runTest(authorisationCaseState) {
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
  let nonprod = [];
  let prod = [];

  before(() => {
    nonprod = getAuthorisationCaseStateDefinitions(
      [
        'AuthorisationCaseState',
        'AuthorisationCaseState-alternative-service-nonprod',
        'AuthorisationCaseState-alt-service-process-server-nonprod',
        'AuthorisationCaseState-bailiff-nonprod',
        'AuthorisationCaseState-deemed-and-dispensed-nonprod',
        'AuthorisationCaseState-general-referral-nonprod',
        'AuthorisationCaseState-share-a-case-nonprod',
        'AuthorisationCaseState-nonprod'
      ]);

    prod = getAuthorisationCaseStateDefinitions(
      [
        'AuthorisationCaseState',
        'AuthorisationCaseState-prod'
      ]);
  });

  context('should allow minimum R access for all Case States per User Role ', () => {
    it('(non-prod)', () => {
      runTest(nonprod);
    });

    it('(prod)', () => {
      runTest(prod);
    });
  });
});
