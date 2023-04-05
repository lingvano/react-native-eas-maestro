# Automated E2E testing for native apps with Maestro

Learn how to implement End-2-End testing for iOS and Android apps.

‼️
This repository is the example code for a 5 step tutorial blog article on how to integrate native E2E testing into an react-native expo app with Maestro. Check out the full article (here)[https://medium.com/lingvano/native-e2e-testing-with-maestro-and-expo-14e9e9b0f0fe].
‼️

---

In the next 5 steps, you will learn how to set up E2E testing for Expo apps with Maestro and create a GitHub CI automation.

### 1. Setup Maestro

Install Maestro locally. You can also find the guide in Maestro Docs.

```sh
curl -Ls "https://get.maestro.mobile.dev" | bash
```

For iOS emulators, you will need some additional config (replace idOfIOSDevice with the correct ID by running xcrun simctl list).

```sh
brew tap facebook/fb
brew install facebook/fb/idb-companion
idb_companion - udid idOfIOSDevice
```

### 2. Write your first test

Let’s start with a simple test. You can check out how assertions and actions work directly within the Maestro Docs. Create your first test in ./maestro/ as test.yaml.

```yaml
appId: com.maestroEasExample.app

- launchApp:
  clearState: true

- assertVisible: "Open up App.js to start working on your app!"
```

### 3. Make your first test green

Start your app locally and run the Maestro test. Feel free to use expo run:ios or expo run:android. If this tutorial works on one platform, it will also work on the other.

```sh
expo run:[ios|android]
maestro test maestro/test.yaml
```

### 4. Prepare GitHub automation

Create a public GitHub repository and add your code to your new repository. Add the Expo token as a secret to your repository. Create the GitHub workflow ./github/workflows/eas-build.yaml (folder structure is important):

```yaml
name: EAS Builds
on:
push:
branches: [main]

jobs:
eas-build:
name: Trigger EAS build for development-sim
timeout-minutes: 15
runs-on: ubuntu-latest
steps: - name: 🏗 Setup repository
uses: actions/checkout@v3

      - name: 🏗 Setup Node
        uses: actions/setup-node@v3
        with:
          node-version: 18.x
          cache: yarn

      - name: 🏗 Setup EAS
        uses: expo/expo-github-action@v8
        with:
          eas-version: latest
          token: ${{ secrets.EXPO_TOKEN }}

      - name: 📦 Install dependencies
        run: yarn install

      - name: 🚀 Send build request
        run: eas build --platform all --non-interactive --no-wait --profile development-sim
        shell: bash
```

Maestro requires a simulator build. Therefore, you need to create a new profile in eas.json by adding the following block to the builds object.

```json
"development-sim": {
  "distribution": "internal",
  "ios": {
    "simulator": true
  }
},
```

Add your EAS projectId and owner to the app.json.

```json
"owner": "yourEasUser",
"extra": {
  "eas": {
    "projectId": "yourEasProjectId"
  }
},
```

For Android builds, you once need to run eas build locally to generate a new Android Keystore.

```sh
eas build --platform android --no-wait --profile development-sim
```

Commit your changes and push them to your repository. In the GitHub Actions tab, you will see your automation running. Once finished, you can open the step ”🚀 Send build request”. At the end of this command, you will find the links to Expo’s build details. Congrats! You now have your first automated app build 🎉

### 5. Add automated E2E testing to your new build

Copy the Maestro API key and add it as a secret to Expo. Make sure to name the secret MAESTRO_API_KEY. Create the eas-build-on-success.sh file.

```sh
#!/usr/bin/env bash

set -eox pipefail

curl -Ls "https://get.maestro.mobile.dev" | bash
export PATH="$PATH":"$HOME/.maestro/bin"

if [ "$EAS_BUILD_PLATFORM" = "ios" ]
then
  brew install java
  echo 'export PATH="/opt/homebrew/opt/openjdk/bin:$PATH"' >> ~/.zshrc
  sudo ln -sfn /opt/homebrew/opt/openjdk/libexec/openjdk.jdk /Library/Java/JavaVirtualMachines/openjdk.jdk
  export CPPFLAGS="-I/opt/homebrew/opt/openjdk/include"

  APP_EXECUTABLE_PATH=/Users/expo/workingdir/build/ios/build/Build/Products/Release-iphonesimulator/MaestroEasExample.app
else
  APP_EXECUTABLE_PATH=/home/expo/workingdir/build/android/app/build/outputs/apk/release/app-release.apk
fi

MAESTRO_API_KEY=$MAESTRO_API_KEY
maestro cloud --apiKey $MAESTRO_API_KEY $APP_EXECUTABLE_PATH maestro/test.yaml
```

In the package.json, you need to add the eas-build-on-success hook.

```json
"eas-build-on-success": "bash ./path/to/eas-build-on-success.sh"
```

Commit and push your changes again. Your pipeline will run, and after the build is ready, it will automatically start the Maestro test flow. In the Expo build details, you can open “Build success hook”. At the end of this command, you will find the link to Maestro Cloud, where you can see the videos of your test assertions.

Congrats! 🥳 Your app is now automatically E2E tested every time you push to your repository! Make sure to cover all your features in test flows (and use the amazing Maestro Studio for that), and you can be confident about your app working fine with every release!

## Final

Don't forget to check out the (blog article)[https://medium.com/lingvano/native-e2e-testing-with-maestro-and-expo-14e9e9b0f0fe] for more detailed instruction on how to set up Maestro.
