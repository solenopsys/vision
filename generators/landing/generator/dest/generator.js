// src/tools/generator.ts
import { renderToString } from "@solenopsys/converged-renderer";

// src/components/markdown.tsx
import { marked } from "marked";
import { readFile } from "@fileio";
import { jsxDEV } from "@solenopsys/converged-renderer/jsx-dev-runtime";
function Markdown({ url }) {
  const text = readFile(url);
  const html = marked.parse(text);
  return /* @__PURE__ */ jsxDEV("div", {
    dangerouslySetInnerHTML: { __html: html }
  }, undefined, false, undefined, this);
}

// src/components/banner/banner.tsx
import { jsxDEV as jsxDEV2 } from "@solenopsys/converged-renderer/jsx-dev-runtime";
var Banner = ({ url }) => {
  return /* @__PURE__ */ jsxDEV2("div", {
    class: "banner-container",
    children: /* @__PURE__ */ jsxDEV2("img", {
      src: url,
      alt: "banner",
      class: "banner-image"
    }, undefined, false, undefined, this)
  }, undefined, false, undefined, this);
};

// src/components/plan/plan.tsx
import { For } from "@solenopsys/converged-renderer";
import { parse } from "yaml";
import { readFile as readFile2 } from "@fileio";
import { jsxDEV as jsxDEV3 } from "@solenopsys/converged-renderer/jsx-dev-runtime";
function Plan({ url }) {
  return () => {
    const text = readFile2(url);
    const planData = parse(text).plan;
    console.log("plan", planData);
    return /* @__PURE__ */ jsxDEV3("div", {
      class: "plan-card",
      children: [
        /* @__PURE__ */ jsxDEV3("div", {
          class: "plan-header",
          children: [
            /* @__PURE__ */ jsxDEV3("h2", {
              children: planData.name
            }, undefined, false, undefined, this),
            /* @__PURE__ */ jsxDEV3("div", {
              children: planData.target
            }, undefined, false, undefined, this),
            /* @__PURE__ */ jsxDEV3("div", {
              class: "plan-price",
              children: planData.price
            }, undefined, false, undefined, this)
          ]
        }, undefined, true, undefined, this),
        /* @__PURE__ */ jsxDEV3("div", {
          class: "plan-features",
          children: /* @__PURE__ */ jsxDEV3(For, {
            values: planData.features,
            children: (feature) => /* @__PURE__ */ jsxDEV3("div", {
              class: "feature-item",
              children: [
                /* @__PURE__ */ jsxDEV3("span", {
                  class: "feature-bullet",
                  children: "•"
                }, undefined, false, undefined, this),
                /* @__PURE__ */ jsxDEV3("span", {
                  children: feature
                }, undefined, false, undefined, this)
              ]
            }, undefined, true, undefined, this)
          }, undefined, false, undefined, this)
        }, undefined, false, undefined, this)
      ]
    }, undefined, true, undefined, this);
  };
}

// src/components/plan/plan-group.tsx
import { For as For2 } from "@solenopsys/converged-renderer";
import { parse as parse2 } from "yaml";
import { readFile as readFile3 } from "@fileio";
import { jsxDEV as jsxDEV4 } from "@solenopsys/converged-renderer/jsx-dev-runtime";
function PlanGroup({ url }) {
  return () => {
    console.log("planDir", url);
    const yamlContent = readFile3(url + "/index.yaml");
    const config = parse2(yamlContent);
    return /* @__PURE__ */ jsxDEV4("div", {
      className: "page",
      children: [
        /* @__PURE__ */ jsxDEV4(Markdown, {
          url: url + "/" + config.header
        }, undefined, false, undefined, this),
        /* @__PURE__ */ jsxDEV4(For2, {
          values: config.items,
          children: (item) => {
            if (item.plan) {
              return /* @__PURE__ */ jsxDEV4(Plan, {
                url: url + "/" + item.plan
              }, undefined, false, undefined, this);
            }
            return null;
          }
        }, undefined, false, undefined, this),
        /* @__PURE__ */ jsxDEV4(Markdown, {
          url: url + "/" + config.footer
        }, undefined, false, undefined, this)
      ]
    }, undefined, true, undefined, this);
  };
}

// src/group.tsx
import { For as For3 } from "@solenopsys/converged-renderer";
import { jsxDEV as jsxDEV5 } from "@solenopsys/converged-renderer/jsx-dev-runtime";
function Group(items) {
  return () => {
    return /* @__PURE__ */ jsxDEV5("div", {
      className: "page",
      children: /* @__PURE__ */ jsxDEV5(For3, {
        values: items,
        children: (item) => {
          if (item.plan) {
            return /* @__PURE__ */ jsxDEV5("div", {
              style: "margin-left:40px;margin-right:40px",
              children: /* @__PURE__ */ jsxDEV5(PlanGroup, {
                url: item.plan
              }, undefined, false, undefined, this)
            }, undefined, false, undefined, this);
          }
          if (item.md) {
            return /* @__PURE__ */ jsxDEV5("div", {
              style: "margin-left:40px;margin-right:40px",
              children: /* @__PURE__ */ jsxDEV5(Markdown, {
                url: item.md
              }, undefined, false, undefined, this)
            }, undefined, false, undefined, this);
          }
          if (item.banner) {
            return /* @__PURE__ */ jsxDEV5(Banner, {
              url: item.banner
            }, undefined, false, undefined, this);
          }
          return null;
        }
      }, undefined, false, undefined, this)
    }, undefined, false, undefined, this);
  };
}

// src/components/header/header.tsx
import { jsxDEV as jsxDEV6 } from "@solenopsys/converged-renderer/jsx-dev-runtime";
function Header() {
  return /* @__PURE__ */ jsxDEV6("div", {
    children: /* @__PURE__ */ jsxDEV6("img", {
      src: "/images/4ir.svg",
      style: "width:200px;padding:14px"
    }, undefined, false, undefined, this)
  }, undefined, false, undefined, this);
}

// src/components/footer/footer.tsx
import { jsxDEV as jsxDEV7 } from "@solenopsys/converged-renderer/jsx-dev-runtime";
function Footer() {
  return /* @__PURE__ */ jsxDEV7("div", {
    children: "footer"
  }, undefined, false, undefined, this);
}

// src/body.tsx
import { jsxDEV as jsxDEV8 } from "@solenopsys/converged-renderer/jsx-dev-runtime";
function Body(objectArray) {
  return /* @__PURE__ */ jsxDEV8("body", {
    children: [
      /* @__PURE__ */ jsxDEV8(Header, {}, undefined, false, undefined, this),
      /* @__PURE__ */ jsxDEV8("div", {
        class: "content",
        children: () => Group(objectArray)
      }, undefined, false, undefined, this),
      /* @__PURE__ */ jsxDEV8(Footer, {}, undefined, false, undefined, this)
    ]
  }, undefined, true, undefined, this);
}

// src/tools/generator.ts
import { writeFile } from "@fileio";
var fonts = ["Open Sans", "Montserrat", "Oswald"];
async function renderPage(objectArray, out) {
  const body = await renderToString(Body(objectArray));
  const fontsLinks = fonts.map((font) => {
    const family = font.replace(/ /g, "+");
    return `<link href="https://fonts.googleapis.com/css2?family=${family}&display=swap" rel="stylesheet">`;
  }).join(`
    `);
  const html = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <link rel="preconnect" href="https://fonts.googleapis.com">
<meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1">


    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    ${fontsLinks}
    <link href="/generator.css" rel="stylesheet">
</head>
<body>
    ${body}
</body>
</html>
`;
  writeFile(out, html);
  console.log(`Страница сгенерирована: ${out}`);
}
export {
  renderPage
};
