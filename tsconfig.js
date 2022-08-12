module.exports = {
  compilerOptions: {
    plugins: [{ name: "typescript-plugin-css-modules" }],
    target: "es5",
    lib: ["dom", "dom.iterable", "esnext"],
    allowJs: true,
    skipLibCheck: true,
    esModuleInterop: true,
    allowSyntheticDefaultImports: true,
    strict: true,
    forceConsistentCasingInFileNames: true,
    noFallthroughCasesInSwitch: true,
    module: "esnext",
    moduleResolution: "node",
    resolveJsonModule: true,
    isolatedModules: true,
    noEmit: true,
    jsx: "react-jsx",
    //    "baseUrl": ".",
    //    "paths": {
    //      "#components": ["src/packages/components"],
    //      "#components/*": ["src/packages/components/*"],
    //      "#app": ["src/packages/app"],
    //      "#app/*": ["src/packages/app/*"]
    //    }
  },
  include: ["src"],
}
