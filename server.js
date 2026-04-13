import Bun from "bun";
import path from "path";
import { existsSync, statSync } from "fs";

const PORT = 8080;
const distPath = path.join(import.meta.dir, "dist");

Bun.serve({
  port: PORT,
  async fetch(req) {
    const url = new URL(req.url);
    let pathname = decodeURIComponent(url.pathname);

    let filePath = path.join(distPath, pathname);

    try {
      if (existsSync(filePath) && statSync(filePath).isDirectory()) {
        filePath = path.join(filePath, "index.html");
      }
      if (existsSync(filePath)) {
        return new Response(Bun.file(filePath));
      }
    } catch (err) {}

    return new Response(Bun.file(path.join(distPath, "index.html")));
  },
});

console.log(`Server running at http://localhost:${PORT}`);
