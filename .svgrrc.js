const path = require("path");

const template = (
  { imports, interfaces, componentName, props, jsx, exports },
  { tpl }
) => {
  return tpl`
${imports};

${interfaces};

type Props = SVGProps<SVGSVGElement> & {
  size: string | number;
};

const ${componentName} = (props: Props) => (
  ${jsx}
);

${componentName}.defaultProps = {
  size: "32px"
}

${exports};
`;
};

function indexTemplate(filePaths) {
  const exportEntries = filePaths.map((filePath) => {
    const basename = path.basename(filePath, path.extname(filePath));
    const exportName = /^\d/.test(basename) ? `Svg${basename}` : basename;
    return `export { default as ${exportName}Icon } from './${basename}'`;
  });
  return exportEntries.join("\n");
}

module.exports = {
  template,
  indexTemplate,
  typescript: true,
  outDir: "./src/packages/components/icons",
  filenameCase: "pascal",
  jsxRuntime: "automatic",
  icon: "1rem",
  jsx: {
    babelConfig: {
      plugins: [
        [
          "@svgr/babel-plugin-remove-jsx-attribute",
          {
            elements: ["svg", "path"],
            attributes: ["viewBox", "style"],
          },
        ],
        [
          "@svgr/babel-plugin-add-jsx-attribute",
          {
            elements: ["svg"],
            attributes: [
              {
                name: "fill",
                value: "'currentColor'",
                spread: false,
                literal: true,
                position: "end",
              },
              {
                name: "viewBox",
                value: "'0 0 512 512'",
                spread: false,
                literal: true,
                position: "end",
              },
            ],
          },
        ],
        [
          "@svgr/babel-plugin-replace-jsx-attribute-value",
          {
            values: [{ value: "1rem", newValue: "props.size", literal: true }],
          },
        ],
      ],
    },
  },
};
