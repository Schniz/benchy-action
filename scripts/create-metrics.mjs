import { stat, writeFile, mkdir } from "node:fs/promises";
import { create } from "@actions/glob";
import { relative } from "node:path";

async function main() {
  const globber = await create("dist/**/*", {
    followSymbolicLinks: false,
    matchDirectories: false,
  });
  console.log(globber);
  const distDir = new URL("../dist", import.meta.url);
  const metrics$ = (await globber.glob()).map(async (url) => {
    const { size } = await stat(url);
    return {
      key: relative(distDir.pathname, url),
      value: Math.round(size / 1024), // in KB
      units: "KB",
    };
  });

  const metrics = await Promise.all(metrics$);
  const json = JSON.stringify(metrics, null, 2);
  console.log(`storing`, json);
  await mkdir("tmp", { recursive: true });
  await writeFile(`tmp/metrics.json`, json);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
