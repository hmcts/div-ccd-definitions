const { uniqWith, filter, isEqual, map } = require('lodash');
const { assert } = require('chai');

const nonProdTabDisplayOrder = {
  State: 1,
  History: 1,
  petitionDetails: 2,
  aosDetails: 3,
  confidentialPetitionerCourtAdmin: 11,
  confidentialPetitionerCourtAdminBeta: 12,
  confidentialPetitionerCourtAdminLa: 13,
  confidentialPetitionerForPetSol: 14,
  confidentialRespondentCourtAdmin: 15,
  confidentialRespondentCourtAdminBeta: 16,
  confidentialRespondentCourtAdminLa: 17,
  confidentialRespondentForRespSol: 18,
  confidentialCoRespondentCourtAdmin: 19,
  confidentialCoRespondentCourtAdminBeta: 20,
  confidentialCoRespondentCourtAdminLa: 21,
  dnDetails: 30,
  outcomeOfDnDetails: 31,
  DecreeAbsolute: 32,
  paymentDetailsCourtAdmin: 33,
  paymentDetailsCourtAdminBeta: 34,
  paymentDetailsCourtAdminLa: 35,
  documents: 36,
  notesCitizen: 40,
  notesCourtAdmin: 40,
  notesCourtAdminBeta: 40,
  notesSysUpdate: 40,
  notesBulkScan: 40,
  notesCourtAdminLa: 40,
  notesSuperUser: 40,
  notesPcqExtractor: 40,
  marriageCertificate: 41,
  coRespondent: 42,
  serviceApplicationCourtAdmin: 43,
  serviceApplicationCourtAdminBeta: 43,
  serviceApplicationCourtAdminLA: 43,
  serviceApplicationSuperUser: 43,
  LinkedCase: 44,
  generalReferralCourtAdmin: 44,
  generalReferralCourtAdminBeta: 44,
  generalReferralCourtAdminLA: 44,
  generalReferralSuperUser: 44,
  Language: 45,
  ConfidentialDocuments: 46,
  General: 1
};

const nonProdTabIds = [
  'State',
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