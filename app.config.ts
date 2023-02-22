import { ExpoConfig } from "@expo/config";

const config: ExpoConfig = {
  name: "React Native EAS Maestro",
  slug: "react-native-eas-maestro",
  scheme: "react-native-eas-maestro",
  owner: "react-native-eas-maestro",
  version: "0.1",
  extra: {
    eas: {
      projectId: "633fb1eb-b210-484f-bff9-6028cbb32bf4",
    },
  },
  android: {
    package: "com.reactNativeEasMaestro.app",
  },
  ios: {
    bundleIdentifier: "com.reactNativeEasMaestro.app",
  },
};

export default (): ExpoConfig => config;
