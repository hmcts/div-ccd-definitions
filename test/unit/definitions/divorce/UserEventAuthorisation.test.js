/* eslint-disable */

const expect = require('chai').expect;
const assert = require('chai').assert;
const { differenceWith, intersectionWith, concat } = require('lodash');

const caseEventsAuthTab = Object.assign(require('definitions/divorce/json/AuthorisationCaseEvent'), []);
const caseEventFields = Object.assign(require('definitions/divorce/json/CaseEventToFields'), []);
const caseFieldAuthTab = Object.assign(require('definitions/divorce/json/AuthorisationCaseField'), []);
let caseEventsActive = [];

describe('Events authorisation', () => {
  function matchEventFieldToAuthField(authFieldEntry, eventCaseField, userRole) {
    return (authFieldEntry, eventCaseField) => {
      if (eventCaseField.CaseFieldID === authFieldEntry.CaseFieldID && authFieldEntry.UserRole === userRole) {
        return true;
      }
    }
  }

  before(() => {
    caseEventsActive = caseEventsAuthTab.filter(entry => {
      return entry.CRUD === 'CRU' || entry.CRUD === 'RU';
    });
  });

  it('should have at least CRU or RU access level for all MANDATORY, OPTIONAL and READONLY show/hide event fields', () => {
    caseEventsActive.forEach(eventAuth => {
      const userRole = eventAuth.UserRole;
      const eventName = eventAuth.CaseEventID;

      // get all MANDATORY and OPTIONAL fields for this event
      let caseFieldsForEvent = caseEventFields.filter(entry => {
        return entry.CaseEventID === eventName && (entry.DisplayContext === 'MANDATORY' || entry.DisplayContext === 'OPTIONAL');
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
        caseFieldsForEvent, caseFieldAuthTab, matchEventFieldToAuthField(userRole));

      if (relevantCaseFieldsAuth.length !== caseFieldsForEvent.length) {
        const diffFields = differenceWith(caseFieldsForEvent, relevantCaseFieldsAuth, matchEventFieldToAuthField(userRole));
        // eslint-disable-next-line
        console.log(`Event ID: ${eventName} for ${userRole} user role is missing field authorisations`);
        console.dir(diffFields);
      }

      expect(relevantCaseFieldsAuth.length).to.eql(caseFieldsForEvent.length)

      // const authFieldsFromTab = caseFieldAuthTab.filter(entry => {
      //   return
      // });
    });
  });


});