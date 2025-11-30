import { pipe, Schema } from "effect";

const Trend = Schema.Union(
  Schema.Literal("lower-is-better").pipe(
    Schema.annotations({
      description:
        "if value is _lower_ than the previous run, the trend is _good_. otherwise, the trend is bad",
    }),
  ),
  Schema.Literal("higher-is-better").pipe(
    Schema.annotations({
      descriptions:
        "if value is _higher_ than the previous run, the trend is _good_. otherwise, the trend is bad",
    }),
  ),
).pipe(
  Schema.annotations({
    description: "The acceptable trend for the given metric",
  }),
);
type Trend = Schema.Schema.Type<typeof Trend>;

const Key = Schema.String.pipe(
  Schema.maxLength(120),
  Schema.minLength(1),
  Schema.minLength(1),
).annotations({
  description: "A unique string that represents this metric across runs",
});

const Value = Schema.Number.annotations({
  description: "The numeric value of the metric",
});

const SortDate = Schema.DateFromString.annotations({
  description: "the date to apply sorting by. defaults to the commit time",
  jsonSchema: {
    format: "date-time",
  },
});

const Units = pipe(Schema.String, Schema.maxLength(32)).annotations({
  description: "The units of the metric",
  examples: ["ms", "ns", "bytes", "kb", "mb"],
});

export class Metric extends Schema.Class<Metric>("Metric")(
  {
    key: Key,
    value: Value,
    sortDate: SortDate.pipe(Schema.optional),
    units: Units.pipe(Schema.optional),
    trend: Trend.pipe(Schema.optional),
  },
  {
    jsonSchema: { additionalProperties: false },
  },
) {}

export class RequestBody extends Schema.Class<RequestBody>("RequestBody")({
  metrics: Metric.pipe(Schema.Array),
}) {}

export const FileSchema = Schema.Union(
  Schema.Struct({
    metrics: Schema.Array(Metric).pipe(
      Schema.annotations({ description: "A list of metrics to report" }),
    ),
  }).annotations({ jsonSchema: { additionalProperties: true } }),
  Metric.pipe(Schema.Array),
  Metric,
);
