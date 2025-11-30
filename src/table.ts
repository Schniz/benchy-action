import { table } from "table";
import type { MetricPoint, TableData } from "./body-schema";
import * as Chalk from "./chalk";
import { Effect, Option } from "effect";

type TableRow = [
  key: string,
  change: string,
  current: string,
  diff: string,
  sparkline: string,
];

export const build = (data: readonly TableData[]) =>
  Effect.gen(function* () {
    const chalk = yield* Chalk.Chalk;
    const stringifyMetric = getStringifyMetric(chalk);
    const tableData: TableRow[] = [
      ["", chalk.bold("change"), chalk.bold("current"), chalk.bold("diff"), ""],
    ];
    for (const tableItem of data) {
      const color = Option.match(tableItem.trend, {
        onNone: () => chalk.reset,
        onSome: (trend) => (trend.good ? chalk.green : chalk.red),
      });
      tableData.push([
        color(tableItem.key),
        color(stringifyMetric(tableItem.currentValue)),
        Option.match(tableItem.storedValue, {
          onNone: () => "",
          onSome: (storedValue) => color(stringifyMetric(storedValue)),
        }),
        Option.match(tableItem.diff, {
          onNone: () => "",
          onSome: (diff) => color(stringifyMetric(diff)),
        }),
        color(tableItem.sparkline),
      ]);
    }

    return table(tableData);
  });

const getStringifyMetric = (chalk: Chalk.Chalk) => (point: MetricPoint) => {
  const units = Option.match(point.units, {
    onNone: () => "",
    onSome: (units) => chalk.dim(units),
  });
  const upToThree = Math.round(point.value * 1000) / 1000;
  return `${upToThree}${units}`;
};
