// Build config for the Raven applet (ADR-0009). It defers entirely to the OFFICIAL Frappe OS
// preset — the externals (vue/frappe-ui/@frappe-os/api), the stable filename, and the dev-harness
// alias all live there, so an applet author writes only the paths.
//
// Run `yarn build` / `yarn dev` from THIS dir; each delegates to frappe-os's generic
// build-applet/dev-applet verb (it owns vite + @vitejs/plugin-vue + vue, resolved from its
// node_modules — this applet ships no Vue/build deps of its own, that's the whole point),
// pointed at this config:
//   (in this dir)  yarn build
//   (in this dir)  yarn dev    # stub-OS HMR harness
// No `vite` import on purpose: this config resolves its own imports from the raven side, which
// ships no Vue/build node_modules — vite + plugins live in frappe-os (run via its scripts). The
// preset (a frappe-os file) resolves @vitejs/plugin-vue from frappe-os/node_modules; we just
// return the plain config object the preset builds.
import path from "node:path";
import { appletConfig } from "../../../../frappe/frappe-os/preset/applet.js";

const here = import.meta.dirname;
const frappeOs = path.resolve(here, "../../../../frappe/frappe-os");

export default appletConfig({
  root: here,
  entry: path.resolve(here, "src/index.ts"),
  outDir: path.resolve(here, "../../public/os-applets"), // → /assets/raven/os-applets/
  fileName: "chat.js",
  devApiPath: path.resolve(frappeOs, "src/brokers/api.ts"), // dev-only @frappe-os/api alias
});
