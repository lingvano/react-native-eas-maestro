#!/usr/bin/env bash

set -eox pipefail

curl -Ls "https://get.maestro.mobile.dev" | bash
export PATH="$PATH":"$HOME/.maestro/bin"

MAESTRO_API_KEY=process.env.MAESTRO_API_KEY
APP_EXECUTABLE_PATH=/Users/expo/workingdir/build/ios/build/Build/Products/Release-iphonesimulator/ReactNativeEASMaestro.app

maestro cloud --apiKey $MAESTRO_API_KEY $APP_EXECUTABLE_PATH .maestro/**/*.yml