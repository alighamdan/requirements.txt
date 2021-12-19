const child = require("child_process");
const yargs = require("yargs");
const fs = require("fs/promises");
const path = require("path");
const chalk = require("chalk");
const GetNpmDetails = require("./functions/getnpmdetails");
const IsRealNpm = require("./functions/isreadnpm");
const installNpm = require("./functions/installnpm");
(async () => {
  let filename = yargs.argv.file;
  if (!filename) filename = path.join(process.cwd(), "requirements.txt");

  let filedir = path.resolve(filename);
  let needtoLog = yargs.argv.log;

  if (!needtoLog) needtoLog = null;
  else needtoLog = Boolean(yargs.argv.log);

  try {
    await fs.readFile(filedir, "utf-8");
  } catch (error) {
    return console.error(
      chalk.red.bold(`Please Provide the Requirements.txt File`)
    );
  }

  try {
    await fs.readFile(path.join(process.cwd(), "package.json"));
  } catch (error) {
    console.log(chalk.bold.yellow(`Creating Package.json File!`));
    child.exec("npm init -y", (err, stdout, stderr) => {
      if (err) {
        return console.error(
          chalk.bold.red(
            `Cannot Creating Package.json File. Please Send "npm init -y" In Terminal To Create Package.json File`
          )
        );
      }
    });
  }

  if (needtoLog){
    console.log(
      chalk.bold.yellow(
        `Please Wait For Some Time All Packages Now In Installing`
      )
    );}

  let allpackages = (await fs.readFile(filedir, "utf-8"))
    .replace(/\r/g, "")
    .split("\n");

  let validpackages = [];
  let installedpackages = [];
  let invalidpackages = [];
  allpackages.forEach(async (package, i) => {
    let packageDetails = GetNpmDetails(package);
    let packagejson = JSON.parse(
      await fs.readFile(path.join(process.cwd(), "package.json"))
    );
    try {
      await fs.readdir("./node_modules/" + packageDetails.name);
      if (
        packagejson.dependencies[packageDetails.name] != null ||
        packagejson.devdependencies[packageDetails.name] != null
      ) {
        return console.log(
          chalk.bold.italic.redBright(
            `${chalk.underline(package)} Npm Is Already Installed!`
          )
        );
      }
    } catch (error) {
    }
    IsRealNpm(packageDetails.name).then((real) => {
      if (real) {
        if (needtoLog){
          console.log(
            chalk.bold.yellow(
              `Checked! (${packageDetails.name}@${packageDetails.version}) Package Now Installing!`
            )
          );}
        validpackages.push(package);

        installNpm(package)
          .then(() => {
            installedpackages.push(package);
            if (needtoLog){ console.log(
                chalk.bold.green(`Installed Successfully! (${package})`)
              );}
          })
          .catch((err) => {
            if (needtoLog) {console.warn(
                chalk.bold.red(
                  `Some Thing Went Wrong, Cannot Install (${package}) npm!`
                )
              );}
            invalidpackages.push(package);
          });
      } else {
        invalidpackages.push(package);
        if (needtoLog){
          console.log(chalk.bold.redBright(`${package} Is Not Real Package`));}
      }
    });
  });
})();
