const dircompare = require("dir-compare");
//
const res = dircompare.compareSync(
  "test/smoke/temp/current-build",
  "test/smoke/temp/latest-prod",
  { compareContent: true }
);

// return res.differences;
// console.log("różnic: ", res.differences);
if (res.differences > 0) {
  throw new Error("There are some differences");
}
