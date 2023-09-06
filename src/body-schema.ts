import * as Schema from "@effect/schema/Schema";
import * as ParseResult from "@effect/schema/ParseResult";

const MetricPoint = Schema.struct({
  value: Schema.number,
  units: Schema.optionFromNullable(Schema.string),
});
export type MetricPoint = Schema.Schema.To<typeof MetricPoint>;

export const Url = Schema.transformOrFail(
  Schema.string,
  Schema.instanceOf(URL),
  (string) => {
    try {
      return ParseResult.success(new URL(string));
    } catch (e) {
      return ParseResult.failure({
        _tag: "Unexpected",
        actual: string,
      });
    }
  },
  (u) => ParseResult.success(u.href)
);

export const TableData = Schema.struct({
  key: Schema.string,
  storedValue: Schema.optionFromNullable(MetricPoint),
  currentValue: MetricPoint,
  sparkline: Schema.string,
  diff: Schema.optionFromNullable(MetricPoint),
  trend: Schema.optionFromNullable(
    Schema.struct({
      alt: Schema.string,
      url: Url,
      good: Schema.boolean,
    })
  ),
  chartUrl: Url,
});

export const encodeTableData = Schema.encode(TableData);

export type TableData = Schema.Schema.To<typeof TableData>;

const FailureSchema = Schema.struct({
  error: Schema.literal(true),
  message: Schema.string,
});

const SuccessSchema = Schema.struct({
  error: Schema.literal(false),
  data: Schema.struct({
    warnings: Schema.array(Schema.string),
    metrics: Schema.array(TableData),
  }),
});

const ResponseSchema = Schema.union(FailureSchema, SuccessSchema);
export const parseResponse = Schema.parse(ResponseSchema);
