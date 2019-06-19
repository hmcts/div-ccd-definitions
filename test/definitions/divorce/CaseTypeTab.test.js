const expect = require('chai').expect;
const _ = require('loadsh');
const caseTypeTab = require('../../../definitions/divorce/json/CaseTypeTab');
const caseField = require('../../../definitions/divorce/json/CaseField');
describe('CaseTypeTab', function() {
  describe('duplicates', function() {
    it('should contain a unique case field ID per tab ID (no duplicate field in a tab)', function() {
      const uniqResult = _.uniqWith(
        caseTypeTab,
        (field1, field2) =>
          field1.TabID === field2.TabID &&
          field1.CaseFieldID === field2.CaseFieldID
      );
      expect(uniqResult).to.eql(caseTypeTab);
    });
    it('should contain a unique tab field display order ID field tab ID (no duplicate field order in a tab)', function() {
      const tabIds = _.uniq(_.map(caseTypeTab, 'TabID'));
      tabIds.forEach(tabId => {
        const allFieldsPerTab = _.filter(caseTypeTab, (field) => {
          return field.TabID === tabId;
        });
        const uniqResults = _.uniqWith(
          allFieldsPerTab,
          (field1, field2) =>
            field1.TabFieldDisplayOrder === field2.TabFieldDisplayOrder
        );
        expect(uniqResults).to.eql(allFieldsPerTab);
      });
    });
  });

  describe('validation', function() {
    it('should contain a valid case field IDs', function() {
      const validFields = _.uniq(_.map(caseField, 'ID'));
      let objectsWithInvalidCaseId = _.filter(caseTypeTab, (field) => {
        return validFields.indexOf(field.CaseFieldID) === -1;
      });
      expect(objectsWithInvalidCaseId).to.eql([]);
    });
  });
});
