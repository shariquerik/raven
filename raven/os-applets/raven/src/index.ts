// Applet entry (ADR-0009): the module's DEFAULT export IS the component the OS mounts. The
// official Frappe OS preset builds this to a single stable-filename ESM with vue/frappe-ui/
// @frappe-os/api kept external; the OS's resolveApplet does `import(assetUrl)` and reads
// `.default`.
//
// Raven is a React SPA served at /raven. Rather than port its UI to Vue, this applet is a
// thin Vue host that frames the live Raven app full-bleed. Same origin (the OS and /raven are
// the same site), so Raven authenticates off the shared session cookie with nothing to wire.
// Authored as a render function — NOT a .vue SFC — so Raven's React-only build never has to
// pull in @vitejs/plugin-vue just to emit one <iframe>. `vue` is externalized by the preset
// either way, so `h` resolves to the host's single Vue at runtime.
import { defineComponent, h } from "vue";

export default defineComponent({
  name: "RavenApplet",
  render() {
    return h("iframe", {
      src: "/raven",
      // Fill the OS window's content area; the window chrome is the OS's, not Raven's.
      style: "width:100%;height:100%;border:0;display:block;",
      allow: "clipboard-read; clipboard-write; microphone; camera; fullscreen",
    });
  },
});
