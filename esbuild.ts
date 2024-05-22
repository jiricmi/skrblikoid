const esbuild = require("esbuild");
const postCssPlugin = require('esbuild-style-plugin')

esbuild
    .build({
        entryPoints: ["frontend/Application.tsx", "frontend/css/index.css"],
        outdir: "frontend/Components/Assets",
        bundle: true,
        plugins: [
            postCssPlugin({
                postcss: {
                    plugins: [require('tailwindcss'), require('autoprefixer')],
                },
            }),
        ],
    })
    .then(() => console.log("Build complete!"))
    .catch(() => process.exit(1));
