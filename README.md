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

| Name              | Description                                                                                                                                                                    |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `key`             | The key to track                                                                                                                                                               |
| `value`           | The value to track                                                                                                                                                             |
| `json`            | Data to track in a JSON format                                                                                                                                                 |
| `input_file`      | Path to a JSON file to track data from                                                                                                                                         |
| `track_file_size` | A glob pattern to track the size of files in the repository. For example, `dist/**/*.min.js` will track the size of all the minified JavaScript files in the `dist` directory. |

See the [JSON Schema](./dist/file-schema.json) for the format of the JSON value/file.
