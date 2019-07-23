
// in this file you can append custom step methods to 'I' object

module.exports = () => {
  return actor({

    // Define custom steps here, use 'this' to access default methods of I.
    // It is recommended to place a general 'login' function here.
    loginToAdminConsole() {
      this.amOnPage(`https://admin-web-div-ccd-definitions-pr-${process.env.CHANGE_ID}.service.core-compute-preview.internal`);
      this.see('Sign in');
      this.fillField('username', 'ccd-importer@server.net');
      this.fillField('password', 'Password12');
      this.click('Sign in');
      this.see('Welcome to CCD Admin Web');
    },
    createRole(role) {
      this.click('Manage User Roles');
      this.click('Create User Role');
      this.fillField('role', role);
      this.click('Create');
    },
    uploadConfig(path) {
      this.click('Import Case Definition');
      this.attachFile('file', path);
      this.click('Submit');
    }
  });
};
