const fs = require("fs");
const rimraf = require("rimraf")
const checkoutDir = (pathName) => {
  const result = fs.existsSync(pathName);
  return result;
};
const removeDir = (pathName) => {
  rimraf.sync(pathName)
};
module.exports = {
  checkoutDir,
  removeDir,
};
