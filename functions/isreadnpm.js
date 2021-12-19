const { default: axios } = require("axios");
/**
 *
 * @param {String} PackageName
 * @returns {Promise<Boolean>}
 */
function IsRealNpm(PackageName) {
  let url = `https://registry.npmjs.com/${PackageName}`;
  return new Promise(function (resolve, reject) {
    axios
      .get(url)
      .then(({ status }) => {
        if (status !== 200) return resolve(false);
        return resolve(true);
      })
      .catch((err) => resolve(false));
  });
}

module.exports = IsRealNpm