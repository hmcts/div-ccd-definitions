const caseworkerCourtAdminUserRole = 'caseworker-divorce-courtadmin';
const caseworkerBetaUserRole = 'caseworker-divorce-courtadmin_beta';
const caseworkerCourtAdminLaUserRole = 'caseworker-divorce-courtadmin-la';
const systemUpdateUserRole = 'caseworker-divorce-systemupdate';
const bulkScanUserRole = 'caseworker-divorce-bulkscan';
const pcqExtractorUserRole = 'caseworker-divorce-pcqextractor';
const citizenUserRole = 'citizen';
const superUserRole = 'caseworker-divorce-superuser';
const solicitorUserRole = 'caseworker-divorce-solicitor';
const petSolicitorUserRole = '[PETSOLICITOR]';
const respSolicitorUserRole = '[RESPSOLICITOR]';

const allHumanNonSolicitorCcdUiUserRoles = [
  caseworkerCourtAdminUserRole,
  caseworkerBetaUserRole,
  caseworkerCourtAdminLaUserRole,
  superUserRole
];
const solicitorUserRoles = [
  solicitorUserRole,
  petSolicitorUserRole,
  respSolicitorUserRole
];
const allHumanCcdUiUserRoles = [].concat(allHumanNonSolicitorCcdUiUserRoles, solicitorUserRoles);

module.exports = {
  caseworkerCourtAdminUserRole,
  caseworkerBetaUserRole,
  caseworkerCourtAdminLaUserRole,
  systemUpdateUserRole,
  bulkScanUserRole,
  pcqExtractorUserRole,
  citizenUserRole,
  superUserRole,
  solicitorUserRole,
  petSolicitorUserRole,
  respSolicitorUserRole,
  allHumanNonSolicitorCcdUiUserRoles,
  solicitorUserRoles,
  allHumanCcdUiUserRoles
};