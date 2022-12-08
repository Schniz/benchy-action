import { defineConfig } from "tsup";

export default defineConfig({
  entryPoints: ["src/index.ts"],
  sourcemap: true,
  noExternal: [/^@actions\//],
  esbuildOptions(opts, _ctx) {
    opts.legalComments = "external";
  },
});
