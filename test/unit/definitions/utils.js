function isFieldDuplicated (field) {
  return function isDuplicated (field1, field2) {
    return field1.CaseTypeID === field2.CaseTypeID
      && field1[field] === field2[field]
      && field1.UserRole === field2.UserRole
  }
}

module.exports = {
  isFieldDuplicated: isFieldDuplicated
}
