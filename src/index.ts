import z from "zod";
import * as core from "@actions/core";

// const Metric = z.object({
//   key: z.string().max(255),
//   value: z.number(),
// });

function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function run() {
  try {
    const ms = z
      .number()
      .int()
      .positive()
      .parse(parseInt(core.getInput("milliseconds", { required: true }), 10));
    core.info(`Waiting ${ms} milliseconds ...`);

    core.debug(new Date().toTimeString());
    await wait(ms);
    core.info(new Date().toTimeString());

    core.setOutput("time", new Date().toTimeString());
  } catch (error) {
    core.setFailed(String(error));
  }
}

run();
