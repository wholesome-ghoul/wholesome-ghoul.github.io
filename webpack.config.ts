import * as path from "path"
import { generateWebpackConfig } from "@tubeu/configs-webpack"

const config = {
  ...generateWebpackConfig({
    outputDir: path.resolve(__dirname, "dist"),
    template: "./public/index.html",
    publicUrl: process.env.PUBLIC_URL,
  }),
}

export default config
