const { expect, assert } = require('chai');
const { find } = require('lodash');

const load = require;
const caseEvent = Object.assign(require('definitions/divorce/json/CaseEvent/CaseEvent'), []);
const caseField = Object.assign(require('definitions/divorce/json/CaseField/CaseField.json'), []);
const caseEventToFields = Object.assign(require('definitions/divorce/json/CaseEventToFields/CaseEventToFields'), []);

function mergeCaseEventJsonNonProdFiles () {
  const definitions = []
    .concat(load('definitions/divorce/json/CaseEvent/CaseEvent-deemed-and-dispensed-nonprod.json'))
    .concat(load('definitions/divorce/json/CaseEvent/CaseEvent-general-order-nonprod.json'))
    .concat(load('definitions/divorce/json/CaseEvent/CaseEvent-general-email-nonprod.json'))
    .concat(load('definitions/divorce/json/CaseEvent/CaseEvent-pet-amend-nonprod.json'))
    .concat(load('definitions/divorce/json/CaseEvent/CaseEvent-nonprod.json'));

  return [...caseEvent, ...definitions];
}

function mergeCaseEventJsonProdFiles () {
  const definitions = []
    .concat(load('definitions/divorce/json/CaseEvent/CaseEvent-prod.json'));

  return [...caseEvent, ...definitions];
}

function mergeCaseFieldJsonNonProdFiles () {
  const definitions = []
    .concat(load('definitions/divorce/json/CaseField/CaseField-deemed-and-dispensed-nonprod.json'))
    .concat(load('definitions/divorce/json/CaseField/CaseField-general-order-nonprod.json'))
    .concat(load('definitions/divorce/json/CaseField/CaseField-general-email-nonprod.json'))
    .concat(load('definitions/divorce/json/CaseField/CaseField-pcq-nonprod.json'));

  return [...caseField, ...definitions];
}

function mergeCaseFieldJsonProdFiles () {
  const definitions = []
    .concat(load('definitions/divorce/json/CaseField/CaseField-prod.json'));

  return [...caseField, ...definitions];
}

function mergeCaseEventToFieldsJsonNonProdFiles () {
  const definitions = []
    .concat(load('definitions/divorce/json/CaseEventToFields/CaseEventToFields-deemed-and-dispensed-nonprod.json'))
    .concat(load('definitions/divorce/json/CaseEventToFields/CaseEventToFields-general-order-nonprod.json'))
    .concat(load('definitions/divorce/json/CaseEventToFields/CaseEventToFields-general-email-nonprod.json'))
    .concat(load('definitions/divorce/json/CaseEventToFields/CaseEventToFields-nonprod.json'));

  return [...caseEventToFields, ...definitions];
}

function mergeCaseEventToFieldsJsonProdFiles () {
  const definitions = []
    .concat(load('definitions/divorce/json/CaseEventToFields/CaseEventToFields-prod.json'));

  return [...caseEventToFields, ...definitions];
}

function assertHasOnlyValidEventIds (caseEventToFieldsFile, caseEventFile) {
  const errors = [];
  caseEventToFieldsFile.forEach(caseEventToFieldsEntry => {
    try {
      expect(find(caseEventFile, ['ID', caseEventToFieldsEntry.CaseEventID])).to.be.an('object');
    } catch (error) {
      errors.push(`Event ID ${caseEventToFieldsEntry.CaseEventID} is not valid`);
    }
  });
  if (errors.length) {
    assert.fail(`Found invalid case IDs - ${errors}`);
  }
}

function assertHasOnlyValidFieldIds (caseEventToFieldsFile, caseFieldFile) {
  const errors = [];
  caseEventToFieldsFile.forEach(caseEventToFieldsEntry => {
    try {
      expect(find(caseFieldFile, ['ID', caseEventToFieldsEntry.CaseFieldID])).to.be.an('object');
    } catch (error) {
      errors.push(`Field ID ${caseEventToFieldsEntry.CaseFieldID} is not valid`);
    }
  });
  if (errors.length) {
    assert.fail(`Found invalid field IDs - ${errors}`);
  }
}

function assertEventCallBacksDefinedInTheFirstField (caseEventToFieldsFile) {
  const errors = [];
  caseEventToFieldsFile.forEach(caseEventToFieldsEntry => {
    try {
      if (caseEventToFieldsEntry.CallBackURLMidEvent) {
        expect(caseEventToFieldsEntry.PageFieldDisplayOrder).to.eq(1);
      }
    } catch (error) {
      errors.push(`Field ID ${caseEventToFieldsEntry.CaseFieldID} defines callback, but is not the first field`);
    }
  });

  if (errors.length) {
    assert.fail(`Found invalid field IDs - ${errors}`);
  }
}

describe('CaseEventToFields (non-prod)', () => {
  const caseEventToFieldsNonProd = mergeCaseEventToFieldsJsonNonProdFiles();
  it('should contain valid event IDs', () => {
    const caseEventNonProd = mergeCaseEventJsonNonProdFiles();
    assertHasOnlyValidEventIds(caseEventToFieldsNonProd, caseEventNonProd);
  });
  it('should contain valid field IDs', () => {
    const caseFieldNonProd = mergeCaseFieldJsonNonProdFiles();
    assertHasOnlyValidFieldIds(caseEventToFieldsNonProd, caseFieldNonProd);
  });
  it('CallBackURLMidEvent if defined is added to the first field on page', () => {
    assertEventCallBacksDefinedInTheFirstField(caseEventToFieldsNonProd);
  });
});

describe('CaseEventToFields (prod)', () => {
  const caseEventToFieldsProd = mergeCaseEventToFieldsJsonProdFiles();
  it('should contain valid event IDs', () => {
    const caseEventProd = mergeCaseEventJsonProdFiles();
    assertHasOnlyValidEventIds(caseEventToFieldsProd, caseEventProd);
  });
  it('should contain valid field IDs', () => {
    const caseFieldProd = mergeCaseFieldJsonProdFiles();
    assertHasOnlyValidFieldIds(caseEventToFieldsProd, caseFieldProd);
  });
  it('CallBackURLMidEvent if defined is added to the first field on page', () => {
    assertEventCallBacksDefinedInTheFirstField(caseEventToFieldsProd);
  });
});
