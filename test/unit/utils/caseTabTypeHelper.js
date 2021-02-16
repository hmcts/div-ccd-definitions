const { uniqWith, filter, isEqual, map } = require('lodash');
const { assert } = require('chai');

const nonProdTabDisplayOrder = {
  History: 1,
  petitionDetails: 2,
  aosDetails: 3,
  dnDetails: 4,
  outcomeOfDnDetails: 5,
  DecreeAbsolute: 6,
  paymentDetailsCourtAdmin: 7,
  paymentDetailsCourtAdminBeta: 8,
  paymentDetailsCourtAdminLa: 9,
  documents: 10,
  confidentialPetitionerCourtAdmin: 11,
  confidentialPetitionerCourtAdminBeta: 12,
  confidentialPetitionerCourtAdminLa: 13,
  confidentialRespondentCourtAdmin: 14,
  confidentialRespondentCourtAdminBeta: 15,
  confidentialRespondentCourtAdminLa: 16,
  confidentialCoRespondentCourtAdmin: 17,
  confidentialCoRespondentCourtAdminBeta: 18,
  confidentialCoRespondentCourtAdminLa: 19,
  notes: 20,
  marriageCertificate: 21,
  coRespondent: 22,
  serviceApplication: 23,
  LinkedCase: 24,
  Language: 25,
  ConfidentialDocuments: 26,
  General: 1
};

const nonProdTabIds = [
  'History',
  'General',
  'petitionDetails',
  'aosDetails',
  'dnDetails',
  'outcomeOfDnDetails',
  'DecreeAbsolute',
  'paymentDetailsCourtAdmin',
  'paymentDetailsCourtAdminBeta',
  'paymentDetailsCourtAdminLa',
  'documents',
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
  // 'SolicitorCoRespondent', - TODO - uncomment this when we go live with AOS pack 2
  'serviceApplication',
  'LinkedCase',
  'generalReferral',
  'Language',
  'ConfidentialDocuments'
];

const prodTabDisplayOrder = {
  History: 1,
  petitionDetails: 2,
  aosDetails: 3,
  dnDetails: 4,
  outcomeOfDnDetails: 5,
  DecreeAbsolute: 6,
  paymentDetailsCourtAdmin: 7,
  paymentDetailsCourtAdminBeta: 8,
  paymentDetailsCourtAdminLa: 9,
  documents: 10,
  confidentialPetitionerCourtAdmin: 11,
  confidentialPetitionerCourtAdminBeta: 12,
  confidentialPetitionerCourtAdminLa: 13,
  confidentialRespondentCourtAdmin: 14,
  confidentialRespondentCourtAdminBeta: 15,
  confidentialRespondentCourtAdminLa: 16,
  confidentialCoRespondentCourtAdmin: 17,
  confidentialCoRespondentCourtAdminBeta: 18,
  confidentialCoRespondentCourtAdminLa: 19,
  notes: 20,
  marriageCertificate: 21,
  coRespondent: 22,
  LinkedCase: 23,
  Language: 24,
  ConfidentialDocuments: 25,
  General: 1
};

const prodTabIds = [
  'History',
  'General',
  'petitionDetails',
  'aosDetails',
  'dnDetails',
  'outcomeOfDnDetails',
  'DecreeAbsolute',
  'paymentDetailsCourtAdmin',
  'paymentDetailsCourtAdminBeta',
  'paymentDetailsCourtAdminLa',
  'documents',
  'confidentialPetitionerCourtAdmin',
  'confidentialPetitionerCourtAdminBeta',
  'confidentialPetitionerCourtAdminLa',
  'confidentialRespondentCourtAdmin',
  'confidentialRespondentCourtAdminBeta',
  'confidentialRespondentCourtAdminLa',
  'confidentialCoRespondentCourtAdmin',
  'confidentialCoRespondentCourtAdminBeta',
  'confidentialCoRespondentCourtAdminLa',
  'notes',
  'marriageCertificate',
  'coRespondent',
  // 'SolicitorCoRespondent', - TODO - uncomment this when we go live with AOS pack 2
  'serviceApplication',
  'LinkedCase',
  'Language',
  'ConfidentialDocuments'
];

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