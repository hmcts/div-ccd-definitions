Feature('Admin Web - Roles');

Scenario('add all the roles', (I) => {
  I.amOnPage(`https://admin-web-div-ccd-definitions-pr-${process.env.CHANGE_ID}.service.core-compute-preview.internal`);
  I.see('Sign in');
  I.fillField('username', 'ccd-importer@server.net');
  I.fillField('password', 'Password12');
  I.click('Sign in');
  I.wait(3);
  I.see('Welcome to CCD Admin Web');
  I.click('Manage User Roles');
  I.createRole('citizen');
  I.createRole('caseworker');
  I.createRole('caseworker-divorce-courtadmin');
  I.createRole('caseworker-divorce-solicitor');
  I.createRole('caseworker-divorce-courtadmin_beta');
  I.createRole('caseworker-divorce-systemupdate');
  I.createRole('caseworker-divorce-bulkscan');
  I.createRole('caseworker-divorce-courtadmin-la');
  I.createRole('caseworker-divorce-solicitor');
});
