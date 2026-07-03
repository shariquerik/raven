// Build this OS applet into raven/public/os-applets/, guarded so raven still installs on
// stock frappe. The applet compiles via Frappe OS's shared toolchain (its Vite + build
// preset), so it can only build where frappe-os is present. On Frappe Cloud that is
// guaranteed during raven's own build layer: frappe (and its already-built frappe-os) is
// installed first, and layers are cumulative — so raven's build sees it. On stock frappe
// (no frappe-os) there is no OS to load the applet, so we skip instead of failing the build.
import { existsSync } from "node:fs";
import { spawnSync } from "node:child_process";
import path from "node:path";

const here = import.meta.dirname;
const frappeOs = path.resolve(here, "../../../../frappe/frappe-os");
const viteBin = path.join(frappeOs, "node_modules", ".bin", "vite");

if (!existsSync(viteBin)) {
	console.log("frappe-os not present — skipping OS applet build (stock frappe).");
	process.exit(0);
}

const result = spawnSync(viteBin, ["build", "--config", path.join(here, "vite.config.js")], {
	cwd: frappeOs, // resolve Vite + its plugins from frappe-os, as the shared toolchain intends
	stdio: "inherit",
});
process.exit(result.status ?? 1);
