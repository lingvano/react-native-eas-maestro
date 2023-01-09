import { ExpoConfig } from "@expo/config";

const config: ExpoConfig = {
  name: "Lingvano",
  slug: "lingvano",
  scheme: "lingvano",
  owner: "lingvano",
  version: "2.6.8",
  extra: {
    eas: {
      projectId: "8a28f691-1633-48a3-aa7d-3a5b547ab7c3",
    },
  },
};

export default (): ExpoConfig => config;
