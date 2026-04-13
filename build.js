import path from "node:path";
import webpack from "webpack";
import ReactServerWebpackPlugin from "react-server-dom-webpack/plugin";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const builder = webpack({
  mode: "development",
  entry: path.join(__dirname, "client.js"),
  output: {
    path: path.join(__dirname, "./dist"),
    filename: "client.js",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              [
                "@babel/preset-react",
                {
                  runtime: "automatic",
                },
              ],
            ],
          },
        },
      },
    ],
  },
  plugins: [new ReactServerWebpackPlugin({ isServer: false })],
});
builder.run((err, stats) => {
  if (err) {
    console.error("Webpack error:", err);
    return;
  }

  console.log(
    stats.toString({
      colors: true,
      chunks: false,
      modules: false,
    }),
  );
});
