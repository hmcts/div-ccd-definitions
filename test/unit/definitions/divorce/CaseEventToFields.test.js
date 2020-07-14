const { expect, assert } = require('chai');
const { find } = require('lodash');

const caseEvent = Object.assign(require('definitions/divorce/json/CaseEvent'), []);
const caseField = [].concat(require('definitions/divorce/json/CaseField/CaseField.json'))
  .concat(require('definitions/divorce/json/CaseField/CaseField-prod.json'));
const caseEventToFields = Object.assign(require('definitions/divorce/json/CaseEventToFields/CaseEventToFields'), []);

describe('CaseEventToFields', () => {
  it('should contain valid event IDs', () => {
    const errors = [];
    caseEventToFields.forEach(caseEventToFieldsEntry => {
      try {
        expect(find(caseEvent, ['ID', caseEventToFieldsEntry.CaseEventID])).to.be.an('object');
      } catch (error) {
        errors.push(`Event ID ${caseEventToFieldsEntry.CaseEventID} is not valid`);
      }
    });
    if (errors.length) {
      assert.fail(`Found invalid case IDs - ${errors}`);
    }
  });
  it('should contain valid field IDs', () => {
    const errors = [];
    caseEventToFields.forEach(caseEventToFieldsEntry => {
      try {
        expect(find(caseField, ['ID', caseEventToFieldsEntry.CaseFieldID])).to.be.an('object');
      } catch (error) {
        errors.push(`Field ID ${caseEventToFieldsEntry.CaseFieldID} is not valid`);
      }
    });
    if (errors.length) {
      assert.fail(`Found invalid field IDs - ${errors}`);
    }
  });
});
