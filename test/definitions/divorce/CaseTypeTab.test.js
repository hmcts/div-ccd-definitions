const expect = require('chai').expect;
const assert = require('chai').assert;
const { uniq, uniqWith, map, filter } = require('lodash');
const caseTypeTab = require('../../../definitions/divorce/json/CaseTypeTab');
const caseField = require('../../../definitions/divorce/json/CaseField');

const tabIds = uniq(map(caseTypeTab, 'TabID'));

describe('CaseTypeTab', function() {
  describe('duplicates', function() {
    it('should contain a unique case field ID per tab ID (no duplicate field in a tab)', function() {
      const uniqResult = uniqWith(
        caseTypeTab,
        (field1, field2) =>
          field1.TabID === field2.TabID &&
          field1.CaseFieldID === field2.CaseFieldID
      );
      expect(uniqResult).to.eql(caseTypeTab);
    });
    it('should contain a unique tab field display order ID field tab ID (no duplicate field order in a tab)', function() {
      tabIds.forEach(tabId => {
        const allFieldsPerTab = filter(caseTypeTab, field => field.TabID === tabId);
        const uniqResults = uniqWith(
          allFieldsPerTab,
          (field1, field2) =>
            field1.TabFieldDisplayOrder === field2.TabFieldDisplayOrder
        );
        expect(uniqResults).to.eql(allFieldsPerTab);
      });
    });
  });

  describe('sequence', function() {
    it('should contain a proper sequence for TabFieldDisplayOrder with no gaps', function() {
      tabIds.forEach(tabId => {
        const allFieldsPerTab = filter(caseTypeTab, (field) => {
          return field.TabID === tabId;
        });
        const allTabFieldDisplayOrderNumbers = map(allFieldsPerTab, (field) => {
          return field.TabFieldDisplayOrder;
        }).sort((a, b) => a - b);
        for(let i = 1; i < allTabFieldDisplayOrderNumbers.length; i++) {
          if(allTabFieldDisplayOrderNumbers[i] - allTabFieldDisplayOrderNumbers[i-1] !== 1) {
            assert.fail(`Missing/unordered TabFieldDisplayOrder sequence number in TabID ${tabId} - expected ${allTabFieldDisplayOrderNumbers[i-1] + 1} but got ${allTabFieldDisplayOrderNumbers[i]}`);
          }
        }
      });
    });

    const expected = {
      History: 1,
      petitionDetails: 2,
      aosDetails: 3,
      dnDetails: 4,
      outcomeOfDnDetails: 5,
      paymentDetails: 6,
      documents: 7,
      confidentialPetitioner: 8,
      confidentialRespondent: 9,
      confidentialCoRespondent: 10,
      notes: 11,
      marriageCertificate: 12,
      coRespondent: 13,
      SolicitorCoRespondent: 14,
      LinkedCase: 15,
      General: 1
    };
    tabIds.forEach(tabId => {
      it(`all ${tabId} fields should have the expected tab order ${expected[tabId]}`, function() {

        const allTabFields = uniq(filter(caseTypeTab, (field) => {
          return field.TabID === tabId;
        }));
        const allTabOrders = uniq(map(allTabFields, 'TabDisplayOrder'));
        expect(allTabOrders).to.eql([expected[tabId]]);
      });
    });
  });

  describe('validation', function() {
    it('should contain a valid Tab IDs', function() {
      expect(tabIds).to.eql([
        'History',
        'petitionDetails',
        'dnDetails',
        'outcomeOfDnDetails',
        'aosDetails',
        'paymentDetails',
        'documents',
        'confidentialPetitioner',
        'confidentialRespondent',
        'confidentialCoRespondent',
        'notes',
        'marriageCertificate',
        'coRespondent',
        'SolicitorCoRespondent',
        'LinkedCase',
        'General'
      ]);
    });
    it('should contain a valid case field IDs', function() {
      const validFields = uniq(map(caseField, 'ID'));
      let objectsWithInvalidCaseId = filter(caseTypeTab, (field) => {
        return validFields.indexOf(field.CaseFieldID) === -1;
      });
      expect(objectsWithInvalidCaseId).to.eql([]);
    });
  });
});
