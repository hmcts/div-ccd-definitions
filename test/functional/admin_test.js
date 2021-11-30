Feature('Admin Web');

Scenario('add all the roles', I => {
  I.loginToAdminConsole();
  I.createRole('citizen');
  I.createRole('caseworker');
  I.createRole('caseworker-divorce-courtadmin');
  I.createRole('caseworker-divorce-solicitor');
  I.createRole('caseworker-divorce-courtadmin_beta');
  I.createRole('caseworker-divorce-systemupdate');
  I.createRole('caseworker-divorce-bulkscan');
  I.createRole('caseworker-divorce-courtadmin-la');
  I.createRole('caseworker-divorce-superuser');
  I.createRole('caseworker-divorce-pcqextractor');
  I.createRole('caseworker-caa');
  I.click('Manage User Roles');
  I.see('citizen');
  I.see('caseworker');
  I.see('caseworker-divorce-courtadmin');
  I.see('caseworker-divorce-solicitor');
  I.see('caseworker-divorce-courtadmin_beta');
  I.see('caseworker-divorce-systemupdate');
  I.see('caseworker-divorce-bulkscan');
  I.see('caseworker-divorce-courtadmin-la');
  I.see('caseworker-divorce-superuser');
  I.see('caseworker-divorce-pcqextractor');
  I.see('caseworker-caa');
}).retry({ retries: 3, minTimeout: 30000 }); // eslint-disable-line no-magic-numbers

// this should be only executed for PRs and not master
if (process.env.IMPORT_PROD_LIKE) {
  Scenario('upload prod-like divorce config file', I => {
    I.loginToAdminConsole();
    I.uploadConfig('../../definitions/divorce/xlsx/ccd-config-aat-prod-like.xlsx');
    I.see('Case Definition data successfully imported');
  }).retry({ retries: 3, minTimeout: 30000 }); // eslint-disable-line no-magic-numbers

  Scenario('upload divorce preview config file', I => {
    I.loginToAdminConsole();
    I.uploadConfig('../../definitions/divorce/xlsx/ccd-config-preview.xlsx');
    I.see('Case Definition data successfully imported');
  }).retry({ retries: 3, minTimeout: 30000 }); // eslint-disable-line no-magic-numbers

  Scenario('upload bulk action preview  config file', I => {
    I.loginToAdminConsole();
    I.uploadConfig('../../definitions/bulk-action/xlsx/ccd-div-bulk-action-config-preview.xlsx');
    I.see('Case Definition data successfully imported');
  }).retry({ retries: 3, minTimeout: 30000 }); // eslint-disable-line no-magic-numbers
} else {
  Scenario('upload divorce config file', I => {
    I.loginToAdminConsole();
    I.uploadConfig('../../definitions/divorce/xlsx/ccd-config-aat.xlsx');
    I.see('Case Definition data successfully imported');
  }).retry({ retries: 3, minTimeout: 30000 }); // eslint-disable-line no-magic-numbers

  Scenario('upload bulk action config file', I => {
    I.loginToAdminConsole();
    I.uploadConfig('../../definitions/bulk-action/xlsx/ccd-div-bulk-action-config-aat.xlsx');
    I.see('Case Definition data successfully imported');
  }).retry({ retries: 3, minTimeout: 30000 }); // eslint-disable-line no-magic-numbers
}
