import Bun from "bun";
import path from "path";
import { existsSync, statSync } from "fs";
import React from "react";
import ReactServerDOMWebpackServer from "react-server-dom-webpack/server";
import { App } from "./app";

const PORT = 8080;
const distPath = path.join(import.meta.dir, "dist");

Bun.serve({
  port: PORT,
  async fetch(req) {
    const url = new URL(req.url);
    if (url.pathname === "/rsc") {
      const tree = React.createElement(App);
      const stream = ReactServerDOMWebpackServer.renderToReadableStream(tree);

      return new Response(stream, {
        headers: {
          "Content-Type": "text/x-component",
        },
      });
    }
    const filePath = path.join(distPath, url.pathname);
    const file = Bun.file(filePath);

    if (await file.exists()) {
      return new Response(file);
    }

    return new Response(Bun.file(path.join(distPath, "index.html")));
  },
});

console.log(`Server running at http://localhost:${PORT}`);
