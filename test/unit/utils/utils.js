const load = require;

function isFieldDuplicated(field) {
  return function isDuplicated(field1, field2) {
    return field1.CaseTypeID === field2.CaseTypeID
            && field1[field] === field2[field]
            && field1.UserRole === field2.UserRole;
  };
}

function loadAllFiles(location) {
  return function loadFeatureFiles(featureFiles) {
    let definitions = [];

    featureFiles.forEach(featureFile => {
      definitions = definitions
        .concat(load(`definitions/divorce/json/${location}/${featureFile}.json`));
    });

    return definitions;
  };
}

module.exports = {
  isFieldDuplicated,
  loadAllFiles
};
