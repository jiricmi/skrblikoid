const esbuild = require("esbuild");

esbuild
  .build({
    entryPoints: ["frontend/Application.tsx"],
    outdir: "frontend/Components/Assets",
    bundle: true,
  })
  .then(() => console.log("Build complete!"))
  .catch(() => process.exit(1));
