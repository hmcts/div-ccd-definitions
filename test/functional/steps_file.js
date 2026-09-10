
// in this file you can append custom step methods to 'I' object

module.exports = () => {
  return actor({

    // Define custom steps here, use 'this' to access default methods of I.
    // It is recommended to place a general 'login' function here.
    loginToAdminConsole() {
      this.amOnPage(`${process.env.CCD_ADMIN_URL}`);
      this.see('Sign in');
      this.fillField('username', 'divorce_importer@mailinator.com');
      this.fillField('password', 'Testing1234');
      this.click('Sign in');
      this.wait('5');
      this.see('Welcome to CCD Admin Web');
      this.wait('5');
    },
    createRole(role) {
      this.click('Manage User Roles');
      this.wait('5');
      this.click('Create User Role');
      this.wait('5');
      this.fillField('role', role);
      this.wait('5');
      this.click('Create');
      this.wait('5');
    },
    uploadConfig(path) {
      this.click('Import Case Definition');
      this.wait('5');
      this.attachFile('file', path);
      this.wait('5');
      this.click('Submit');
      this.wait('5');
      this.waitForText('Case Definition data successfully imported', 30);
    }
  });
};
