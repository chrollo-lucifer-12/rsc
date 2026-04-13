require("react-server-dom-webpack/node-register")();

require("@babel/register")({
  ignore: [/[\\\/](dist|node_modules)[\\\/]/],
  presets: [["@babel/preset-react", { runtime: "automatic" }]],
  plugins: ["@babel/plugin-transform-modules-commonjs"],
});

const path = require("path");
const express = require("express");
const React = require("react");
const fs = require("fs");
const ReactServerDOMWebpackServer = require("react-server-dom-webpack/server");

const { App } = require("./app.js");

const app = express();
const PORT = 1234;

const clientManifest = JSON.parse(
  fs.readFileSync(
    path.join(__dirname, "dist/react-client-manifest.json"),
    "utf-8",
  ),
);

app.use(express.static(path.join(__dirname, "dist")));

app.get("/rsc", (req, res) => {
  const tree = React.createElement(App, {
    searchParams: new URLSearchParams(req.query),
  });

  const stream = ReactServerDOMWebpackServer.renderToPipeableStream(
    tree,
    clientManifest,
  );

  res.setHeader("Content-Type", "text/x-component");
  stream.pipe(res);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
