function GetNpmDetails(packageName) {
  let result = {};

  if (packageName.includes("/")) {
    if (packageName.slice(1).split("@").length > 1) {
      let version = packageName.slice(1).split("@")[1];
      result.version = version;
    } else {
      result.version = "latest";
    }

    result.name = "@" + packageName.slice(1).split("@")[0];
  } else {
    if (packageName.split("@").length > 1) {
      let version = packageName.split("@")[1];
      result.version = version;
    } else {
      result.version = "latest";
    }

    result.name = packageName.split("@")[0];
  }

  return result;
}

module.exports = GetNpmDetails