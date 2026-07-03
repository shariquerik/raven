import { defineComponent as e, h as t } from "vue";
//#region ../../raven/raven/os-applets/raven/src/index.ts
var n = e({
	name: "RavenApplet",
	render() {
		return t("iframe", {
			src: "/raven",
			style: "width:100%;height:100%;border:0;display:block;",
			allow: "clipboard-read; clipboard-write; microphone; camera; fullscreen"
		});
	}
});
//#endregion
export { n as default };
