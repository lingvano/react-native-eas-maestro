const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");

exec(
  "eas build:list --buildProfile=development-sim --distribution=internal --status=finished --platform=android --limit=1 --json --non-interactive > ./.github/scripts/buildAndroidOutput.txt",
  () => {
    fs.readFile(
      path.resolve(__dirname, "buildAndroidOutput.txt"),
      "UTF-8",
      (err, data) => {
        if (err) {
          console.error(err);
          process.exit(1);
        }

        const buildUrl = data.match(/buildUrl": "(.*)"/)[1];
        if (buildUrl) {
          console.log(buildUrl);
          process.exit(0);
        }

        process.exit(1);
      }
    );
  }
);
