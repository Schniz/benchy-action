import * as Config from "./config";
import { Effect, Option } from "effect";
import * as GenericError from "./error";
import { exhaustiveEffect } from "./util";
import * as Chalk from "./chalk";
import * as IdToken from "./id-token";
import * as HttpClient from "./http-client";
import { warning } from "@actions/core";
import { MetricPoint } from "./body-schema";
import { table } from "table";
import { ChalkInstance } from "chalk";

const main = Effect.gen(function* (_) {
  const input = yield* _(Config.read);
  const metrics = yield* _(Config.normalize(input));

  const httpClient = yield* _(HttpClient.create);
  const response = yield* _(HttpClient.postMetrics(httpClient, metrics));

  for (const warn of response.body.data.warnings) {
    yield* _(Effect.sync(() => warning(warn)));
  }

  type TableRow = [
    key: string,
    change: string,
    current: string,
    diff: string,
    sparkline: string,
  ];
  const chalk = yield* _(Chalk.tag);
  const tableData: TableRow[] = [
    ["", chalk.bold("change"), chalk.bold("current"), chalk.bold("diff"), ""],
  ];
  for (const tableItem of response.body.data.metrics) {
    const color = Option.match(tableItem.trend, {
      onNone: () => chalk.reset,
      onSome: (trend) => (trend.good ? chalk.green : chalk.red),
    });
    tableData.push([
      color(tableItem.key),
      color(stringifyMetric(chalk, tableItem.currentValue)),
      Option.match(tableItem.storedValue, {
        onNone: () => "",
        onSome: (storedValue) => color(stringifyMetric(chalk, storedValue)),
      }),
      Option.match(tableItem.diff, {
        onNone: () => "",
        onSome: (diff) => color(stringifyMetric(chalk, diff)),
      }),
      color(tableItem.sparkline),
    ]);
  }

  yield* _(Effect.sync(() => console.log(table(tableData))));
});

const stringifyMetric = (chalk: ChalkInstance, point: MetricPoint) => {
  const units = Option.match(point.units, {
    onNone: () => "",
    onSome: (units) => chalk.dim(units),
  });
  const upToThree = Math.round(point.value * 1000) / 1000;
  return `${upToThree}${units}`;
};

main.pipe(
  Effect.catchTag("IdTokenError", (err) => IdToken.intoGenericError(err)),
  Effect.catchTag("GenericError", (err) => GenericError.handleInCli(err)),
  exhaustiveEffect,
  Effect.provideServiceEffect(Chalk.tag, Chalk.withForcedAnsiColors),
  Effect.runPromise
);
