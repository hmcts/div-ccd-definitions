const { expect, assert } = require('chai');
const { find } = require('lodash');
const { prod, nonprod } = require('../../utils/dataProvider');

function assertHasOnlyValidEventIds(caseEventToFieldsFile, caseEventFile) {
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

function assertHasOnlyValidFieldIds(caseEventToFieldsFile, caseFieldFile) {
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

function assertEventCallBacksDefinedInTheFirstField(caseEventToFieldsFile) {
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

function assertRetriesTimeoutURLMidEventIsAddedForAllCallbacks(caseEventToFieldsFile) {
  const errors = [];
  caseEventToFieldsFile.forEach(caseEventToFieldsEntry => {
    try {
      // this field is ignored by CCD
      expect(caseEventToFieldsEntry.RetriesTimeoutURLMidEvent).not.to.be.an('string');
    } catch (error) {
      errors.push(`Field ID ${caseEventToFieldsEntry.CaseFieldID} defines callback without RetriesTimeoutURLMidEvent\n`);
    }
  });

  if (errors.length) {
    assert.fail(`Found invalid field IDs - ${errors}`);
  }
}

describe('CaseEventToFields (non-prod)', () => {
  let caseEventToFieldsNonProd = [];
  let caseEventNonProd = [];
  let caseFieldNonProd = [];

  before(() => {
    caseEventToFieldsNonProd = nonprod.CaseEventToFields;
    caseEventNonProd = nonprod.CaseEvent;
    caseFieldNonProd = nonprod.CaseField;
  });

  it('should contain valid event IDs', () => {
    assertHasOnlyValidEventIds(caseEventToFieldsNonProd, caseEventNonProd);
  });

  it('should contain valid field IDs', () => {
    assertHasOnlyValidFieldIds(caseEventToFieldsNonProd, caseFieldNonProd);
  });

  describe('CallBackURLMidEvent', () => {
    it('(if defined) is added to the first field on page', () => {
      assertEventCallBacksDefinedInTheFirstField(caseEventToFieldsNonProd);
    });

    it('RetriesTimeoutURLMidEvent is never defined', () => {
      assertRetriesTimeoutURLMidEventIsAddedForAllCallbacks(caseEventToFieldsNonProd);
    });
  });
});

describe('CaseEventToFields (prod)', () => {
  let caseEventToFieldsProd = [];
  let caseEventProd = [];
  let caseFieldProd = [];

  before(() => {
    caseEventToFieldsProd = prod.CaseEventToFields;
    caseEventProd = prod.CaseEvent;
    caseFieldProd = prod.CaseField;
  });

  it('should contain valid event IDs', () => {
    assertHasOnlyValidEventIds(caseEventToFieldsProd, caseEventProd);
  });

  it('should contain valid field IDs', () => {
    assertHasOnlyValidFieldIds(caseEventToFieldsProd, caseFieldProd);
  });

  describe('CallBackURLMidEvent', () => {
    it('(if defined) is added to the first field on page', () => {
      assertEventCallBacksDefinedInTheFirstField(caseEventToFieldsProd);
    });

    it('RetriesTimeoutURLMidEvent is never defined', () => {
      assertRetriesTimeoutURLMidEventIsAddedForAllCallbacks(caseEventToFieldsProd);
    });
  });
});
