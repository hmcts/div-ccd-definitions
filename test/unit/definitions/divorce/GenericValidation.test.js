const expect = require('chai').expect;
const { uniq } = require('lodash');
const { prod, nonprod } = require('../../utils/dataProvider');

function uniqueRows (config) {
  Object.keys(config).forEach(sheetName => {
    const originalContent = config[sheetName];
    const uniqueList = uniq(originalContent);
    expect(uniqueList.length).to.eq(originalContent.length);
  });
}

function validateNames (config) {
  const accepted = /^[\w|*|\-|.|[|\]]+$/;
  const priorityUserFields = ['CaseFieldID', 'CaseStateID', 'ID', 'CaseEventID'];
  Object.keys(config).forEach(sheetName => {
    const content = config[sheetName];
    content.forEach(row => {
      priorityUserFields.forEach(field => {
        const cellValue = row[field];
        if (cellValue && !cellValue.match(accepted)) {
          console.log(`Cell ${field} value in sheet ${sheetName} has unexpected characters for value ${cellValue}.`);
          expect(cellValue.toString()).to.match(accepted);
        }
      });
    });
  });
}

describe('For each config sheet', () => {
  context('nonprod', () => {
    it('should have unique rows', () => {
      uniqueRows(nonprod);
    });

    it('should not have any special characters, tabs or line breaks in any of the priority user fields', () => {
      validateNames(nonprod);
    });
  });

  context('prod', () => {
    it('should have unique rows', () => {
      uniqueRows(prod);
    });

    it('should not have any special characters, tabs or line breaks in any of the priority user fields', () => {
      validateNames(prod);
    });
  });
});
