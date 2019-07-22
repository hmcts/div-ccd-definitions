Feature('Admin Web - Roles');

Scenario('add all the roles', I => {
  I.amOnPage(`https://admin-web-div-ccd-definitions-pr-${process.env.CHANGE_ID}.service.core-compute-preview.internal`);
  I.see('Sign in');
  I.fillField('username', 'ccd-importer@server.net');
  I.fillField('password', 'Password12');
  I.click('Sign in');
  I.see('Welcome to CCD Admin Web');
  I.createRole('citizen');
  I.createRole('caseworker');
  I.createRole('caseworker-divorce-courtadmin');
  I.createRole('caseworker-divorce-solicitor');
  I.createRole('caseworker-divorce-courtadmin_beta');
  I.createRole('caseworker-divorce-systemupdate');
  I.createRole('caseworker-divorce-bulkscan');
  I.createRole('caseworker-divorce-courtadmin-la');
  I.createRole('caseworker-divorce-superuser');
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
}).retry(3); // eslint-disable-line no-magic-numbers
