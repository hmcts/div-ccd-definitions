const { uniqWith, filter, isEqual, map } = require('lodash');
const { assert } = require('chai');

const nonProdTabDisplayOrder = {
  History: 1,
  petitionDetails: 2,
  aosDetails: 3,
  ConfidentialDocuments: 4,
  dnDetails: 5,
  outcomeOfDnDetails: 6,
  DecreeAbsolute: 7,
  paymentDetailsCourtAdmin: 8,
  paymentDetailsCourtAdminBeta: 9,
  paymentDetailsCourtAdminLa: 10,
  documents: 11,
  confidentialPetitionerCourtAdmin: 12,
  confidentialPetitionerCourtAdminBeta: 13,
  confidentialPetitionerCourtAdminLa: 14,
  confidentialRespondentCourtAdmin: 15,
  confidentialRespondentCourtAdminBeta: 16,
  confidentialRespondentCourtAdminLa: 17,
  confidentialCoRespondentCourtAdmin: 18,
  confidentialCoRespondentCourtAdminBeta: 19,
  confidentialCoRespondentCourtAdminLa: 20,
  notes: 21,
  marriageCertificate: 22,
  coRespondent: 23,
  serviceApplication: 24,
  LinkedCase: 25,
  Language: 26,
  General: 1
};

const nonProdTabIds = [
  'History',
  'General',
  'petitionDetails',
  'aosDetails',
  'confidentialPetitionerCourtAdmin',
  'confidentialPetitionerCourtAdminBeta',
  'confidentialPetitionerCourtAdminLa',
  'confidentialPetitionerForPetSol',
  'confidentialRespondentCourtAdmin',
  'confidentialRespondentCourtAdminBeta',
  'confidentialRespondentCourtAdminLa',
  'confidentialRespondentForRespSol',
  'confidentialCoRespondentCourtAdmin',
  'confidentialCoRespondentCourtAdminBeta',
  'confidentialCoRespondentCourtAdminLa',
  'dnDetails',
  'outcomeOfDnDetails',
  'DecreeAbsolute',
  'paymentDetailsCourtAdmin',
  'paymentDetailsCourtAdminBeta',
  'paymentDetailsCourtAdminLa',
  'documents',
  'notesCitizen',
  'notesCourtAdmin',
  'notesCourtAdminBeta',
  'notesSysUpdate',
  'notesBulkScan',
  'notesCourtAdminLa',
  'notesSuperUser',
  'notesPcqExtractor',
  'marriageCertificate',
  'coRespondent',
  'serviceApplicationCourtAdmin',
  'serviceApplicationCourtAdminBeta',
  'serviceApplicationCourtAdminLA',
  'serviceApplicationSuperUser',
  'LinkedCase',
  'generalReferralCourtAdmin',
  'generalReferralCourtAdminBeta',
  'generalReferralCourtAdminLA',
  'generalReferralSuperUser',
  'Language',
  'ConfidentialDocuments'
];

const prodTabDisplayOrder = nonProdTabDisplayOrder;
const prodTabIds = nonProdTabIds;

/**
 * Validates the tab display ids to ensure there are no duplicate in the feature files
 * @param tabIds List of case type TabID's
 * @param caseTypeTab List of casetype tabs. A concatenation from all feature files
 * @returns {[]} List with duplicates if found
 */
function validateUniqueTabDisplayOrder(tabIds, caseTypeTab) {
  const errors = [];
  let allFieldsPerTab = null;
  let uniqResults = null;

  tabIds.forEach(tabId => {
    allFieldsPerTab = filter(caseTypeTab, field => {
      return field.TabID === tabId;
    });

    uniqResults = uniqWith(
      allFieldsPerTab,
      (field1, field2) => {
        return field1.TabFieldDisplayOrder === field2.TabFieldDisplayOrder;
      });

    if (!isEqual(allFieldsPerTab, uniqResults)) {
      errors.push(uniqResults);
    }
  });

  return errors;
}

/**
 * Validates the tab field display order to ensure there are no gaps in feature files.
 * Would throw an error if a duplicate tab display id is found
 * @param tabIds List of case type TabID's
 * @param caseTypeTab caseTypeTab List of casetype tabs. A concatenation from all feature files
 */
function validateTabFieldDisplayOrder(tabIds, caseTypeTab) {
  let allFieldsPerTab = [];
  let allTabFieldDisplayOrderNumbers = [];

  tabIds.forEach(tabId => {
    allFieldsPerTab = filter(caseTypeTab, field => {
      return field.TabID === tabId;
    });
    allTabFieldDisplayOrderNumbers = map(allFieldsPerTab, field => {
      return field.TabFieldDisplayOrder;
    })
      .sort((a, b) => {
        return a - b;
      });
    for (let i = 1; i < allTabFieldDisplayOrderNumbers.length; i++) {
      if (allTabFieldDisplayOrderNumbers[i] - allTabFieldDisplayOrderNumbers[i - 1] !== 1) {
        assert.fail(`Missing/unordered TabFieldDisplayOrder sequence number in TabID ${tabId} - expected ${allTabFieldDisplayOrderNumbers[i - 1] + 1} but got ${allTabFieldDisplayOrderNumbers[i]}`);
      }
    }
  });
}

module.exports = {
  nonProdTabDisplayOrder,
  nonProdTabIds,
  prodTabDisplayOrder,
  prodTabIds,
  validateUniqueTabDisplayOrder,
  validateTabFieldDisplayOrder
};