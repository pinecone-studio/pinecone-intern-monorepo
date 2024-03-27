# secrets

This library was generated with [Nx](https://nx.dev).

## Building

Run `nx build secrets` to build the library.

## Running unit tests

Run `nx test secrets` to execute the unit tests via [Jest](https://jestjs.io).

## Add these to project json

```json
    "get-secrets": {
      "executor": "@pinecone-intern-monorepo/secrets:get",
      "defaultConfiguration": "development",
      "configurations": {
        "development": {
          "groups": ["profile-service"],
          "env": "dev"
        },
        "production": {
          "groups": ["profile-service"],
          "env": "prod"
        },
        "testing": {
          "groups": ["profile-service"],
          "env": "test"
        }
      }
    },
    "add-secrets": {
      "executor": "@pinecone-intern-monorepo/secrets:add"
    },
```

## Use add executor

```bash
  yarn nx run {projectName}:add-secrets ---group {groupName} --env {env} --username {username} --password {password} --key {key} --value {value}
```