// Post-build fix for static hosting (Apache / cPanel).
// Next 16's static export writes route-segment prefetch payloads as nested
// folders, e.g. out/about-us/__next.about-us/__PAGE__.txt, but the client
// router requests the flat name out/about-us/__next.about-us.__PAGE__.txt.
// A Node server rewrites that on the fly; a plain file host cannot, so we
// write a flat copy next to each nested file.
import { copyFileSync, existsSync, readdirSync, statSync } from "node:fs";
import { join, relative, sep } from "node:path";

const OUT = "out";
if (!existsSync(OUT)) {
  console.error("flatten-rsc: no out/ folder, run next build first");
  process.exit(1);
}

let copied = 0;

function walkSegments(pageDir, segRoot) {
  const stack = [segRoot];
  while (stack.length) {
    const dir = stack.pop();
    for (const name of readdirSync(dir)) {
      const full = join(dir, name);
      if (statSync(full).isDirectory()) stack.push(full);
      else if (name.endsWith(".txt")) {
        const flat = join(pageDir, relative(pageDir, full).split(sep).join("."));
        copyFileSync(full, flat);
        copied++;
      }
    }
  }
}

function walk(dir) {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (!statSync(full).isDirectory() || name === "_next") continue;
    if (name.startsWith("__next.")) walkSegments(dir, full);
    else walk(full);
  }
}

walk(OUT);
console.log(`flatten-rsc: wrote ${copied} flat prefetch files`);
