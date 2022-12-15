# `schniz/benchy-action`

A GitHub Action to benchmark your code continuously.
Store numbers as a function of time, and see how your code performs, and how your bundles weigh, over time.

## Usage

```yaml
name: Benchmark
on:
  pull_request:
  push:
    branches:
      - master

jobs:
  benchmark:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: Schniz/benchy-action@v1
        with:
          token: ${{ secrets.GITHUB_TOKEN }}
          main_branch: main
          json: |
            [{"key": "bundle-size", "value": 1234}]
```

## Inputs

| Name                      | Description                                                                                                    | Default                            | Required? |
| ------------------------- | -------------------------------------------------------------------------------------------------------------- | ---------------------------------- | --------- |
| `token`                   | The GitHub token to use for the action                                                                         | `''`                               | ✅        |
| `main_branch`             | The main branch of your repository. This is the ref that will be used as a comparison when running against PRs | -                                  | ✅        |
| `artifact_name`           | The name of the artifact that will be created. This is the name of the file that will be uploaded to the PR.   | `benchy-stats-${platform}-${arch}` | ❌        |
| `input_file`              | A json file to read the `Artifact[]` data from                                                                 | -                                  | 1⃣        |
| `json`                    | A json string to read the `Artifact[]` data from                                                               | -                                  | 1⃣        |
| `max_commits_to_traverse` | The maximum number of commits to traverse when looking for the main branch.                                    | `20`                               | ❌        |
| `should_comment`          | Whether or not to comment on the PR/commit with the results                                                    | `true`                             | ❌        |

- 1⃣ Either `input_file` or `json` should be provided.

### `Metric`

An `Metric` ([definition](./src/input.ts)) is a JSON object that contains the following fields:

```
  key: z.string().min(1),
  value: z.number().or(StringToNumber),
  units: z.string().optional(),
  trend: z.string().pipe(Trend.optional()),
```

| Name    | Description                                                                                                              | Type     | Required? |
| ------- | ------------------------------------------------------------------------------------------------------------------------ | -------- | --------- |
| `key`   | The name of the metric.                                                                                                  | `string` | ✅        |
| `value` | The value of the metric.                                                                                                 | `number` | ✅        |
| `units` | The units of the metric.                                                                                                 | `string` | ❌        |
| `trend` | One of `"higher-is-better"` or `"lower-is-better"`. This controls the color of the trend arrow and chart in the comment. | `string` | ❌        |
