const process = require("process");
const cp = require("child_process");
const path = require("path");

// shows how the runner will run a javascript action with env / stdout protocol
test("test runs", () => {
  process.env["INPUT_MILLISECONDS"] = 100;
  const ip = path.join(__dirname, "../src/index.ts");
  const result = cp.spawnSync(`pnpm`, ["ts-node", ip], {
    env: process.env,
    encoding: "utf8",
  }).stdout;
  console.log(result);
});
