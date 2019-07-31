const expect = require('chai').expect;
const { differenceWith, intersectionWith, concat } = require('lodash');

const AuthorisationCaseEvent = Object.assign(require('definitions/divorce/json/AuthorisationCaseEvent'), []);
const AuthorisationCaseField = Object.assign(require('definitions/divorce/json/AuthorisationCaseField'), []);
const AuthorisationCaseState = Object.assign(require('definitions/divorce/json/AuthorisationCaseState'), []);
const CaseEvent = Object.assign(require('definitions/divorce/json/CaseEvent'), []);
const CaseEventToFields = Object.assign(require('definitions/divorce/json/CaseEventToFields'), []);
const CaseRoles = Object.assign(require('definitions/divorce/json/CaseRoles'), []);

let AuthCaseEventsActive = [];

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

describe('Events authorisation validation', () => {
  before(() => {
    AuthCaseEventsActive = AuthorisationCaseEvent.filter(entry => {
      return entry.CRUD === 'CRU' || entry.CRUD === 'RU';
    });

    // we need to exclude the Case Roles events as its not used for Field Authorisation (is User Role only)
    AuthCaseEventsActive = differenceWith(AuthCaseEventsActive, CaseRoles, (eventActive, caseRole) => {
      return eventActive.UserRole === caseRole.ID;
    });
  });

  it('should have at least CRU or RU access level for all MANDATORY, OPTIONAL and READONLY show/hide event fields', () => {
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
  });

  it('should give user minimum R access for all post-condition states', () => {
    CaseEvent.forEach(event => {
      const acceptedPermissions = /C?RU?D?/;
      const eventName = event.ID;
      const postConditionState = event.PostConditionState;
      const caseType = event.CaseTypeID;
      const allAuthForEvent = AuthCaseEventsActive.filter(getEventsForEventName(eventName, caseType));

      if (postConditionState && postConditionState !== '*') {
        allAuthForEvent.forEach(authEventEntry => {
          const userRole = authEventEntry.UserRole;
          const postConditionAuthState = AuthorisationCaseState.filter(
            getAuthStateForUserRole(postConditionState, userRole, caseType));

          if (postConditionAuthState.length === 0) {
            console.log(`"${eventName}" event for "${userRole}" is missing authorisation for PostCondition state "${postConditionState}"`);
          }

          expect(postConditionAuthState.length).to.eql(1);

          if (!postConditionAuthState[0].CRUD.match(acceptedPermissions)) {
            console.log(`"${eventName}" event for "${userRole}" is missing permissions for PostCondition state "${postConditionState}"`);
          }
          expect(postConditionAuthState[0].CRUD).to.match(acceptedPermissions);
        });
      }
    });
  });

  it('should give user minimum RU access for all pre-condition states', () => {
    CaseEvent.forEach(event => {
      const acceptedPermissions = /C?RU?D?/;
      const eventName = event.ID;
      const preConditionState = event['PreConditionState(s)'];
      const caseType = event.CaseTypeID;
      const allAuthForEvent = AuthCaseEventsActive.filter(getEventsForEventName(eventName, caseType));

      if (preConditionState && preConditionState !== '*') {
        allAuthForEvent.forEach(authEventEntry => {
          const userRole = authEventEntry.UserRole;
          const preConditionAuthState = AuthorisationCaseState.filter(
            getAuthStateForUserRole(preConditionState, userRole, caseType));

          if (preConditionAuthState.length === 0) {
            console.log(`"${eventName}" event for "${userRole}" is missing authorisation for PreCondition state "${preConditionState}"`);
          }

          expect(preConditionAuthState.length).to.eql(1);

          if (!preConditionAuthState[0].CRUD.match(acceptedPermissions)) {
            console.log(`"${eventName}" event for "${userRole}" is missing permissions for PreCondition state "${preConditionState}"`);
          }
          expect(preConditionAuthState[0].CRUD).to.match(acceptedPermissions);
        });
      }
    });
  });

  it('should give user minimum CR access for all post-condition states which have empty pre-condition states', () => {
    CaseEvent.forEach(event => {
      const acceptedPermissions = /CRU?D?/;
      const eventName = event.ID;
      const preConditionState = event['PreConditionState(s)'];
      const postConditionState = event.PostConditionState;
      const caseType = event.CaseTypeID;
      const allAuthForEvent = AuthCaseEventsActive.filter(getEventsForEventName(eventName, caseType));

      if (!preConditionState && postConditionState && postConditionState !== '*') {
        allAuthForEvent.forEach(authEventEntry => {
          const userRole = authEventEntry.UserRole;
          const postConditionAuthState = AuthorisationCaseState.filter(
            getAuthStateForUserRole(postConditionState, userRole, caseType));

          if (postConditionAuthState.length === 0) {
            console.log(`"${eventName}" event for "${userRole}" is missing authorisation for PostCondition state "${preConditionState}"`);
          }

          expect(postConditionAuthState.length).to.eql(1);

          if (!postConditionAuthState[0].CRUD.match(acceptedPermissions)) {
            console.log(`"${eventName}" event for "${userRole}" is missing permissions for PostCondition state "${preConditionState}"`);
          }
          expect(postConditionAuthState[0].CRUD).to.match(acceptedPermissions);
        });
      }
    });
  });
});
