const expect = require('chai').expect;
const { differenceWith, intersectionWith, concat } = require('lodash');
const { prod, nonprod } = require('../../utils/dataProvider');

const CaseRoles = Object.assign(require('definitions/divorce/json/CaseRoles'), []);

let AuthCaseEventsActive = [];
let AuthorisationCaseState = [];
let AuthorisationCaseEvent = [];
let AuthorisationCaseField = [];
let CaseEvent = [];
let CaseEventToFields = [];

function matchEventFieldToAuthField(userRole, caseType) {
  return (authFieldEntry, eventCaseField) => {
    return eventCaseField.CaseFieldID === authFieldEntry.CaseFieldID
      && authFieldEntry.UserRole === userRole
      && authFieldEntry.CaseTypeID === caseType
      && eventCaseField.CaseTypeID === caseType;
  };
}

function getFieldsForEvent(eventName, caseType) {
  return entry => {
    return entry.CaseEventID === eventName
      && (entry.DisplayContext === 'MANDATORY' || entry.DisplayContext === 'OPTIONAL')
      && entry.CaseTypeID === caseType;
  };
}

function getShowHideFieldsForEvent(eventName) {
  return entry => {
    return entry.CaseEventID === eventName && entry.DisplayContext === 'READONLY' && (
      (entry.FieldShowCondition && entry.FieldShowCondition.includes(entry.CaseFieldID)) ||
      (entry.PageShowCondition && entry.PageShowCondition.includes(entry.CaseFieldID)));
  };
}

function getDiffForFields(userRole, caseType) {
  return (eventCaseField, authFieldEntry) => {
    return eventCaseField.CaseFieldID === authFieldEntry.CaseFieldID
      && authFieldEntry.UserRole === userRole
      && authFieldEntry.CaseTypeID === caseType
      && eventCaseField.CaseTypeID === caseType;
  };
}

function getEventsForEventName(eventName, caseType) {
  return entry => {
    return entry.CaseEventID === eventName && entry.CaseTypeID === caseType;
  };
}

function getAuthStateForUserRole(state, userRole, caseType) {
  return entry => {
    return entry.CaseStateID === state && entry.UserRole === userRole && entry.CaseTypeID === caseType;
  };
}

function checkAuthStateConfig(conditionState, allAuthForEvent, caseType, eventName, acceptedPermissions) {
  allAuthForEvent.forEach(authEventEntry => {
    const userRole = authEventEntry.UserRole;
    const conditionAuthState = AuthorisationCaseState.filter(
      getAuthStateForUserRole(conditionState, userRole, caseType));

    if (conditionAuthState.length === 0) {
      console.log(`"${eventName}" event for "${userRole}" is missing authorisation for state "${conditionState}"`);
    }

    expect(conditionAuthState.length).to.eql(1);

    if (!conditionAuthState[0].CRUD.match(acceptedPermissions)) {
      console.log(`"${eventName}" event for "${userRole}" is missing permissions for state "${conditionState}"`);
    }
    expect(conditionAuthState[0].CRUD).to.match(acceptedPermissions);
  });
}

function filterActivePermissions(authorisationCaseEvent) {
  const authCaseEventsActive = authorisationCaseEvent.filter(entry => {
    return entry.CRUD === 'CRU' || entry.CRUD === 'RU';
  });

  // we need to exclude the Case Roles events as its not used for Field Authorisation (is User Role only)
  return differenceWith(authCaseEventsActive, CaseRoles, (eventActive, caseRole) => {
    return eventActive.UserRole === caseRole.ID;
  });
}

function loadDefinitionsForProd() {
  AuthorisationCaseState = prod.AuthorisationCaseState;
  AuthorisationCaseEvent = prod.AuthorisationCaseEvent;
  AuthorisationCaseField = prod.AuthorisationCaseField;
  CaseEvent = prod.CaseEvent;
  CaseEventToFields = prod.CaseEventToFields;
}

function loadDefinitionsForNonProd() {
  AuthorisationCaseState = nonprod.AuthorisationCaseState;
  AuthorisationCaseEvent = nonprod.AuthorisationCaseEvent;
  AuthorisationCaseField = nonprod.AuthorisationCaseField;
  CaseEvent = nonprod.CaseEvent;
  CaseEventToFields = nonprod.CaseEventToFields;
}

function atLeastCruOrRuForAllMandatoryOptionalAndReadonlyShowHideEventFields() {
  AuthCaseEventsActive.forEach(eventAuth => {
    const userRole = eventAuth.UserRole;
    const eventName = eventAuth.CaseEventID;
    const caseType = eventAuth.CaseTypeID;
    let caseFieldsForEvent = CaseEventToFields.filter(getFieldsForEvent(eventName, caseType));

    // get all the READONLY fields that are used as show/hide conditions (not labels) - these are sent with the event too
    const caseFieldsForConditionals = CaseEventToFields.filter(getShowHideFieldsForEvent(eventName));
    caseFieldsForEvent = concat(caseFieldsForEvent, caseFieldsForConditionals);

    // find the intersection between the event fields and the field's authorisations for this user role and event
    const relevantCaseFieldsAuth = intersectionWith(
      AuthorisationCaseField, caseFieldsForEvent, matchEventFieldToAuthField(userRole, caseType));

    if (relevantCaseFieldsAuth.length !== caseFieldsForEvent.length) {
      const diffFields = differenceWith(
        caseFieldsForEvent, relevantCaseFieldsAuth, getDiffForFields(userRole, caseType));
      console.log(`Event ID: ${eventName} for ${userRole} user role is missing field authorisations`);
      console.dir(diffFields);
    }

    expect(relevantCaseFieldsAuth.length).to.eql(caseFieldsForEvent.length);
  });
}

function minimumRuForAllPreConditionStates() {
  CaseEvent.forEach(event => {
    const acceptedPermissions = /C?RU?D?/;
    const eventName = event.ID;
    const basePreConditionStates = event['PreConditionState(s)'];
    const preConditionStates = basePreConditionStates ? basePreConditionStates.split(';') : [];
    const caseType = event.CaseTypeID;
    const allAuthForEvent = AuthCaseEventsActive.filter(getEventsForEventName(eventName, caseType));
    preConditionStates.forEach(preConditionState => {
      if (preConditionState && preConditionState !== '*') {
        checkAuthStateConfig(preConditionState, allAuthForEvent, caseType, eventName, acceptedPermissions);
      }
    });
  });
}

function minimumRforAllPostConditionStates() {
  CaseEvent.forEach(event => {
    const acceptedPermissions = /C?RU?D?/;
    const eventName = event.ID;
    const postConditionState = event.PostConditionState;
    const caseType = event.CaseTypeID;
    const allAuthForEvent = AuthCaseEventsActive.filter(getEventsForEventName(eventName, caseType));
    if (postConditionState && postConditionState !== '*') {
      checkAuthStateConfig(postConditionState, allAuthForEvent, caseType, eventName, acceptedPermissions);
    }
  });
}

function minimumCrForAllPostConditionStatesWhichHaveEmptyPreConditionStates() {
  CaseEvent.forEach(event => {
    const acceptedPermissions = /CRU?D?/;
    const eventName = event.ID;
    const preConditionState = event['PreConditionState(s)'];
    const postConditionState = event.PostConditionState;
    const caseType = event.CaseTypeID;
    const allAuthForEvent = AuthCaseEventsActive.filter(getEventsForEventName(eventName, caseType));

    if (!preConditionState && postConditionState && postConditionState !== '*') {
      checkAuthStateConfig(postConditionState, allAuthForEvent, caseType, eventName, acceptedPermissions);
    }
  });
}

function runAllTests() {
  it(
    'should have at least CRU or RU access level for all MANDATORY, OPTIONAL and READONLY show/hide event fields',
    atLeastCruOrRuForAllMandatoryOptionalAndReadonlyShowHideEventFields
  );

  it(
    'should give user minimum RU access for all pre-condition states',
    minimumRuForAllPreConditionStates
  );

  it(
    'should give user minimum R access for all post-condition states',
    minimumRforAllPostConditionStates
  );

  it('should give user minimum CR access for all post-condition states which have empty pre-condition states',
    minimumCrForAllPostConditionStatesWhichHaveEmptyPreConditionStates
  );
}

describe('Events authorisation validation', () => {
  describe('prod', () => {
    before(() => {
      loadDefinitionsForProd();
      AuthCaseEventsActive = filterActivePermissions(AuthorisationCaseEvent);
    });

    runAllTests();
  });

  describe('non-prod', () => {
    before(() => {
      loadDefinitionsForNonProd();
      AuthCaseEventsActive = filterActivePermissions(AuthorisationCaseEvent);
    });

    runAllTests();
  });
});
