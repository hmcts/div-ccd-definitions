const { createCaseInCcd, updateCaseInCcd, createSolicitorReference } = require('../helpers/utils');
/* eslint-disable */
const solicitorUserName = process.env.USERNAME_SOLICITOR;
const solicitorPassword = process.env.PASSWORD_SOLICITOR;
const caseWorkerUserName = process.env.USERNAME_CASEWORKER;
const caseWorkerPassword = process.env.PASSWORD_CASEWORKER;
const solRef = `AUTO-${createSolicitorReference()}`;

Feature('create Divorce cases ');

Scenario('Case Creation By Caseworker', async I => {
  const caseId = await createCaseInCcd(caseWorkerUserName, caseWorkerPassword, './test/data/case-creation-basic-data.json', 'DIVORCE', 'hwfCreate');
  const paymentMade = await updateCaseInCcd(caseWorkerUserName, caseWorkerPassword, caseId, 'DIVORCE', 'paymentMadeFromAwaitingHWFDecision', './test/data/case-creation-basic-data.json');
  const issue = await updateCaseInCcd(caseWorkerUserName, caseWorkerPassword, caseId, 'DIVORCE', 'issueFromSubmitted', './test/data/case-issue-data.json');
 // <TO-DO: verification part>
});

