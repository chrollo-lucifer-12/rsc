import path from "path";

import webpack from "webpack";

const builder = webpack({
  mode: "development",
  entry: path.join(import.meta.dir, "client.js"),
  output: {
    path: path.join(import.meta.dir, "./dist"),
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
});

builder.run((err) => console.error(err));
