import { expect, it, onTestFinished } from "@effect/vitest";
import { ConfigProvider, Effect } from "effect";
import { ActionInput } from "../src/config";

it.effect("skips empty strings in server_url", () => {
  process.env.INPUT_SERVER_URL = "";
  onTestFinished(() => {
    delete process.env.INPUT_SERVER_URL;
  });
  return Effect.gen(function* () {
    const { serverUrl } = yield* ActionInput;
    expect(String(serverUrl)).toEqual("https://benchy.hagever.com/");
  }).pipe(
    Effect.provide(ActionInput.Default),
    Effect.withConfigProvider(ConfigProvider.fromEnv()),
  );
});

it.effect("takes server_url from env", () => {
  process.env.INPUT_SERVER_URL = "https://example.com";
  onTestFinished(() => {
    delete process.env.INPUT_SERVER_URL;
  });
  return Effect.gen(function* () {
    const { serverUrl } = yield* ActionInput;
    expect(String(serverUrl)).toEqual("https://example.com/");
  }).pipe(
    Effect.provide(ActionInput.Default),
    Effect.withConfigProvider(ConfigProvider.fromEnv()),
  );
});
