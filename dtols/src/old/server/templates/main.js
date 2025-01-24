var __commonJS = (cb, mod) => () => (mod || cb((mod = { exports: {} }).exports, mod), mod.exports);

// src/server/app/main.tsx
import {
render,
For,
useFetch
} from "@solenopsys/converged-renderer";
import $ from "@solenopsys/converged-reactive";
import {
jsxDEV
} from "@solenopsys/converged-renderer/jsx-dev-runtime";
var require_main = __commonJS(() => {
  var Contents = (params) => {
    return jsxDEV("div", {
      style: "position:absolute;top:0;right:0;width:250px;height:100%;color:white;",
      children: jsxDEV(For, {
        values: params.pages,
        children: (value) => jsxDEV("div", {
          children: value.title
        }, undefined, false, undefined, this)
      }, undefined, false, undefined, this)
    }, undefined, false, undefined, this);
  };
  var WP_ROOT = "/content/topics/EN/whitepapers/";
  var WP = "solenopsys";
  var WP_CONF_NAME = "whitepaper.json";
  var Cover = (params) => {
    const resource = useFetch(WP_ROOT + WP + "/" + WP_CONF_NAME);
    const image = $(params.image);
    const pages = $(params.pages);
    $.effect(() => {
      const state = resource();
      console.log("LOADED", state);
      if (!state.pending) {
        state.value.json().then((json) => {
          image(json.cover.image);
          pages(json.pages);
        });
      }
    });
    return jsxDEV("div", {
      children: [
        jsxDEV("img", {
          src: image,
          alt: "robotics",
          style: "width:100%;"
        }, undefined, false, undefined, this),
        jsxDEV(Contents, {
          pages
        }, undefined, false, undefined, this)
      ]
    }, undefined, true, undefined, this);
  };
  render(() => {
    const pages = [{ name: "page1" }, { name: "page2" }];
    return Cover({
      image: "solenopsys/images/robotics.png",
      pages
    });
  }, document.getElementById("main"));
});
export default require_main();
