#!/usr/bin/env bash

set -eox pipefail

curl -Ls "https://get.maestro.mobile.dev" | bash
export PATH="$PATH":"$HOME/.maestro/bin"

brew install java
echo 'export PATH="/opt/homebrew/opt/openjdk/bin:$PATH"' >> ~/.zshrc
sudo ln -sfn /opt/homebrew/opt/openjdk/libexec/openjdk.jdk /Library/Java/JavaVirtualMachines/openjdk.jdk
export CPPFLAGS="-I/opt/homebrew/opt/openjdk/include"

MAESTRO_API_KEY=$MAESTRO_API_KEY

if [ "$EAS_BUILD_PLATFORM" = "ios" ]
then
   APP_EXECUTABLE_PATH=/Users/expo/workingdir/build/ios/build/Build/Products/Release-iphonesimulator/ReactNativeEASMaestro.app
else
   APK_PATH=$(find /Users/expo/workingdir/build -name '*.apk')
   if [ -n "$APK_PATH" ]; then
    APP_EXECUTABLE_PATH="$APK_PATH"
  else
    echo "Error: APK file not found"
    exit 1
  fi
fi

maestro cloud --apiKey $MAESTRO_API_KEY $APP_EXECUTABLE_PATH maestro/test.yaml