const expect = require('chai').expect;
const { differenceWith, intersectionWith, concat } = require('lodash');

const caseEventsAuthTab = Object.assign(require('definitions/divorce/json/AuthorisationCaseEvent'), []);
const caseEventFields = Object.assign(require('definitions/divorce/json/CaseEventToFields'), []);
const caseFieldAuthTab = Object.assign(require('definitions/divorce/json/AuthorisationCaseField'), []);
const caseRolesTab = Object.assign(require('definitions/divorce/json/CaseRoles'), []);
let caseEventsActive = [];

describe('Events authorisation validation', () => {
  function matchEventFieldToAuthField(userRole, caseType) {
    return (authFieldEntry, eventCaseField) => {
      return eventCaseField.CaseFieldID === authFieldEntry.CaseFieldID
        && authFieldEntry.UserRole === userRole
        && authFieldEntry.CaseTypeID === caseType
        && eventCaseField.CaseTypeID === caseType;
    };
  }

  before(() => {
    caseEventsActive = caseEventsAuthTab.filter(entry => {
      return entry.CRUD === 'CRU' || entry.CRUD === 'RU';
    });

    // we need to exclude the Case Roles events as its not used for Field Authorisation (is User Role only)
    caseEventsActive = differenceWith(caseEventsActive, caseRolesTab, (eventActive, caseRole) => {
      return eventActive.UserRole === caseRole.ID;
    });
  });

  it('should have at least CRU or RU access level for all MANDATORY, OPTIONAL and READONLY show/hide event fields', () => {
    caseEventsActive.forEach(eventAuth => {
      const userRole = eventAuth.UserRole;
      const eventName = eventAuth.CaseEventID;
      const caseType = eventAuth.CaseTypeID;

      // get all MANDATORY and OPTIONAL fields for this event
      let caseFieldsForEvent = caseEventFields.filter(entry => {
        return entry.CaseEventID === eventName
          && (entry.DisplayContext === 'MANDATORY' || entry.DisplayContext === 'OPTIONAL')
          && entry.CaseTypeID === caseType;
      });

      // get all the READONLY fields that are used as show/hide conditions (not labels) - these are sent with the event too
      const caseFieldsForConditionals = caseEventFields.filter(entry => {
        return entry.CaseEventID === eventName && entry.DisplayContext === 'READONLY' && (
          (entry.FieldShowCondition && entry.FieldShowCondition.includes(entry.CaseFieldID)) ||
          (entry.PageShowCondition && entry.PageShowCondition.includes(entry.CaseFieldID)));
      });

      // combine the above set into one list
      caseFieldsForEvent = concat(caseFieldsForEvent, caseFieldsForConditionals);

      // find the intersection between the event fields and the field's authorisations for this user role and event
      const relevantCaseFieldsAuth = intersectionWith(
        caseFieldAuthTab, caseFieldsForEvent, matchEventFieldToAuthField(userRole, caseType));

      if (relevantCaseFieldsAuth.length !== caseFieldsForEvent.length) {
        const diffFields = differenceWith(
          caseFieldsForEvent, relevantCaseFieldsAuth, (eventCaseField, authFieldEntry) => {
            return eventCaseField.CaseFieldID === authFieldEntry.CaseFieldID
              && authFieldEntry.UserRole === userRole
              && authFieldEntry.CaseTypeID === caseType
              && eventCaseField.CaseTypeID === caseType;
          });
        console.log(`Event ID: ${eventName} for ${userRole} user role is missing field authorisations`);
        console.dir(diffFields);
      }

      expect(relevantCaseFieldsAuth.length).to.eql(caseFieldsForEvent.length);
    });
  });
});
