#!/usr/bin/env bash

curl --request POST \
  --url 'https://app.asana.com/api/1.0/tasks' \
  --header 'Authorization: Bearer '"${ASANA_API_TOKEN}" \
  --header 'Content-Type: application/json' \
  --data '{"data":{"name":"E2E Fail - '"${EAS_BUILD_PLATFORM}"' - '"${EAS_BUILD_GIT_COMMIT_HASH}"'","projects":["'"${ASANA_PROJECT_ID}"'"],"notes":"https://expo.dev/accounts/react-native-eas-maestro/projects/react-native-eas-maestro/builds/'"${EAS_BUILD_ID}"'","assignee":"me"}}'