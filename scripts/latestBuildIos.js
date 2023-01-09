// const { exec } = require("child_process");
// const fs = require("fs");
// const path = require("path");

// exec(
//   "eas build:list --distribution=simulator --status=finished --platform=ios --limit=1 --json > cli/buildOutput.txt",
//   () => {
//     fs.readFile(
//       path.resolve(__dirname, "buildOutput.txt"),
//       "UTF-8",
//       (err, data) => {
//         if (err) {
//           console.error(err);
//           process.exit(1);
//         }

//         const buildUrl = data.match(/buildUrl": "(.*)"/)[1];
//         if (buildUrl) {
//           console.log(buildUrl);
//           process.exit(0);
//         }

//         process.exit(1);
//       }
//     );
//   }
// );

async function getData() {
  const url = "https://expo.dev/artifacts/eas/cbzfHaWZCmBATr4nJRKMwW.tar.gz";
  return url;
}

getData().then((url) => {
  console.log(url);
  return url;
});
