import * as path from "path"
import { generateWebpackConfig } from "@tubeu/configs-webpack"

const config = {
  ...generateWebpackConfig({
    outputDir: path.resolve(__dirname, "dist"),
  }),
}

export default config
