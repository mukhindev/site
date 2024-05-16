import { stat } from "node:fs/promises";
import { join } from "node:path";
import { watch } from "node:fs/promises";
import { SITE_DIR, PORT, PUBLIC_DIR } from "../../config";
import { build } from "../build";

Bun.serve({
  port: PORT,
  async fetch(req) {
    let clientPathname = new URL(req.url).pathname;

    const stats = await stat(join(PUBLIC_DIR, clientPathname));

    if (stats.isDirectory()) {
      clientPathname = join(clientPathname, "index.html");
    }

    const serverPathname = join(PUBLIC_DIR, clientPathname);
    const file = Bun.file(serverPathname);

    log(req.method, clientPathname);

    return new Response(file);
  },
  error() {
    return new Response("404", { status: 404 });
  },
});

console.log(`http://localhost:${PORT}`);

function log(method: Request["method"], pathname: string) {
  console.log(`${method} ${pathname}`);
}

const watcher = watch(SITE_DIR, { recursive: true });

for await (const event of watcher) {
  if (event.eventType === "change") {
    console.log(`Changed: ${SITE_DIR}/${event.filename}`);
  }

  await build();
}
