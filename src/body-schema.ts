import { Schema } from "effect";

export class MetricPoint extends Schema.Class<MetricPoint>("MetricPoint")({
  value: Schema.Number,
  units: Schema.OptionFromUndefinedOr(Schema.String),
}) {}

export class TableData extends Schema.Class<TableData>("TableData")({
  key: Schema.String,
  storedValue: Schema.OptionFromNullishOr(MetricPoint, undefined),
  currentValue: MetricPoint,
  sparkline: Schema.String,
  diff: Schema.OptionFromNullishOr(MetricPoint, undefined),
  trend: Schema.OptionFromNullishOr(
    Schema.Struct({
      alt: Schema.String,
      url: Schema.URL,
      good: Schema.Boolean,
    }),
    undefined,
  ),
  chartUrl: Schema.URL,
}) {}

export const encodeTableData = Schema.encode(TableData);

const FailureSchema = Schema.Struct({
  error: Schema.Literal(true),
  message: Schema.String,
});

const SuccessSchema = Schema.Struct({
  error: Schema.Literal(false),
  data: Schema.Struct({
    markdown: Schema.String,
    warnings: Schema.Array(Schema.String),
    metrics: Schema.Array(TableData),
  }),
});

const ResponseSchema = Schema.Union(FailureSchema, SuccessSchema);
export const parseResponse = Schema.decodeUnknown(ResponseSchema);
