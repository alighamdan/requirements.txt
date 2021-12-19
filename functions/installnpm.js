const child = require('child_process')
/**
 *
 * @param {String} packageName
 * @returns {Promise<{stdout:String,stderr:String}>}
 */
function installNpm(packageName) {
  return new Promise(function (resolve, reject) {
    child.exec(
      packageName.includes("npm i") ? packageName : `npm i ${packageName}`,
      (err, stdout, stderr) => {
        if (err) return reject(err);
        else
          resolve({
            stdout: stdout,
            stderr: stderr,
          });
      }
    );
  });
}

module.exports = installNpm