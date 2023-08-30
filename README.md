# benchy-action

A continuous benchmarking tool for GitHub Actions.

## Installation

You can [install the GitHub app here](https://github.com/apps/benchy-commenter) to get comments on pull requests and commits
automatically.

This is not mandatory, and you can use this action without the app: instead of getting comments,
the action will print an ASCII table in the logs.

## Example usage

```yaml
name: My CI test
jobs:
  build:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      # more on this later
      id-token: write
    steps:
      - uses: actions/checkout@v3
      - uses: Schniz/benchy-action@v2
        with:
          key: "a value to track"
          value: 666
```

## The `id-token` Permissions

Benchy is built to be hassle-free and to be used as fast as possible: without any authentication or registration.
So, in order to authenticate the requests from GitHub Actions we use the [OpenID Connect feature of GitHub Actions](https://docs.github.com/en/actions/deployment/security-hardening-your-deployments/about-security-hardening-with-openid-connect#overview-of-openid-connect) to get an ID token that is signed by GitHub and contains the information about the repository and the workflow run.

Enabling `id-token: write` on the GitHub Actions job will enable the action to get an ID token and use it to authenticate the requests to the Benchy API.

## Action Inputs

| Name         | Description                            | Required | Default |
| ------------ | -------------------------------------- | -------- | ------- |
| `key`        | The key to track                       | No       |         |
| `value`      | The value to track                     | No       |         |
| `json`       | Data to track in a JSON format         | No       |         |
| `input_file` | Path to a JSON file to track data from | No       |         |

Either `key` and `value`, or `json` or `input_file` must be provided.

See the [JSON Schema](./dist/file-schema.json) for the format of the JSON value/file.
