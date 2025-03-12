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
import { parse } from "yaml";
import { readFile as readFile2 } from "@fileio";

// src/components/button/button.tsx
import { jsxDEV as jsxDEV2 } from "@solenopsys/converged-renderer/jsx-dev-runtime";
function Button({ onClick, title, icon }) {
  return /* @__PURE__ */ jsxDEV2("button", {
    class: "button",
    onClick,
    children: [
      title,
      /* @__PURE__ */ jsxDEV2("img", {
        src: icon,
        style: { height: "24px", width: "auto", position: "absolute", top: "10px", right: "10px", filter: "brightness(0) invert(1)" }
      }, undefined, false, undefined, this)
    ]
  }, undefined, true, undefined, this);
}
function JoinButton() {
  return /* @__PURE__ */ jsxDEV2(Button, {
    title: "Присоединиться",
    icon: "/images/arrow-thick-circle-right-1.svg",
    onClick: () => {
      console.log("JOIN");
    }
  }, undefined, false, undefined, this);
}

// src/components/banner/banner.tsx
import { jsxDEV as jsxDEV3 } from "@solenopsys/converged-renderer/jsx-dev-runtime";
var Banner = ({ url }) => {
  const yamlContent = readFile2(url);
  const config = parse(yamlContent);
  console.log("banner", config);
  return /* @__PURE__ */ jsxDEV3("div", {
    class: "banner-container",
    children: [
      /* @__PURE__ */ jsxDEV3("img", {
        src: config.image,
        alt: "banner",
        class: "banner-image"
      }, undefined, false, undefined, this),
      /* @__PURE__ */ jsxDEV3("div", {
        class: "width_conteiner banner-text-block",
        children: [
          /* @__PURE__ */ jsxDEV3("div", {
            class: "banner-title",
            children: config.title
          }, undefined, false, undefined, this),
          " ",
          /* @__PURE__ */ jsxDEV3("br", {}, undefined, false, undefined, this),
          /* @__PURE__ */ jsxDEV3("div", {
            class: "banner-subtitle",
            children: [
              config.subtitle,
              " "
            ]
          }, undefined, true, undefined, this),
          /* @__PURE__ */ jsxDEV3(JoinButton, {}, undefined, false, undefined, this)
        ]
      }, undefined, true, undefined, this)
    ]
  }, undefined, true, undefined, this);
};

// src/components/plan/plan.tsx
import { For } from "@solenopsys/converged-renderer";
import { parse as parse2 } from "yaml";
import { readFile as readFile3 } from "@fileio";
import { jsxDEV as jsxDEV4 } from "@solenopsys/converged-renderer/jsx-dev-runtime";
function Plan({ url }) {
  return () => {
    const text = readFile3(url);
    const planData = parse2(text).plan;
    console.log("plan", planData);
    return /* @__PURE__ */ jsxDEV4("div", {
      class: "plan-card",
      children: [
        /* @__PURE__ */ jsxDEV4("div", {
          class: "plan-header",
          children: [
            /* @__PURE__ */ jsxDEV4("h2", {
              children: planData.name
            }, undefined, false, undefined, this),
            /* @__PURE__ */ jsxDEV4("div", {
              children: planData.target
            }, undefined, false, undefined, this),
            /* @__PURE__ */ jsxDEV4("div", {
              class: "plan-price",
              children: planData.price
            }, undefined, false, undefined, this)
          ]
        }, undefined, true, undefined, this),
        /* @__PURE__ */ jsxDEV4("div", {
          class: "plan-features",
          children: /* @__PURE__ */ jsxDEV4(For, {
            values: planData.features,
            children: (feature) => /* @__PURE__ */ jsxDEV4("div", {
              class: "feature-item",
              children: [
                /* @__PURE__ */ jsxDEV4("span", {
                  class: "feature-bullet",
                  children: " "
                }, undefined, false, undefined, this),
                /* @__PURE__ */ jsxDEV4("span", {
                  children: feature
                }, undefined, false, undefined, this)
              ]
            }, undefined, true, undefined, this)
          }, undefined, false, undefined, this)
        }, undefined, false, undefined, this),
        /* @__PURE__ */ jsxDEV4(JoinButton, {}, undefined, false, undefined, this)
      ]
    }, undefined, true, undefined, this);
  };
}

// src/components/plan/plan-group.tsx
import { For as For2 } from "@solenopsys/converged-renderer";
import { parse as parse3 } from "yaml";
import { readFile as readFile4 } from "@fileio";
import { jsxDEV as jsxDEV5 } from "@solenopsys/converged-renderer/jsx-dev-runtime";
function PlanGroup({ url }) {
  return () => {
    console.log("planDir", url);
    const yamlContent = readFile4(url + "/index.yaml");
    const config = parse3(yamlContent);
    return /* @__PURE__ */ jsxDEV5("div", {
      class: "width_conteiner",
      children: [
        /* @__PURE__ */ jsxDEV5(Markdown, {
          url: url + "/" + config.header
        }, undefined, false, undefined, this),
        /* @__PURE__ */ jsxDEV5("div", {
          class: "plan-group",
          children: /* @__PURE__ */ jsxDEV5(For2, {
            values: config.items,
            children: (item) => {
              if (item.plan) {
                return /* @__PURE__ */ jsxDEV5(Plan, {
                  url: url + "/" + item.plan
                }, undefined, false, undefined, this);
              }
              return null;
            }
          }, undefined, false, undefined, this)
        }, undefined, false, undefined, this),
        /* @__PURE__ */ jsxDEV5(Markdown, {
          url: url + "/" + config.footer
        }, undefined, false, undefined, this)
      ]
    }, undefined, true, undefined, this);
  };
}

// src/components/tiles/tile.tsx
import { jsxDEV as jsxDEV6 } from "@solenopsys/converged-renderer/jsx-dev-runtime";
function Tile({ persent, description }) {
  return /* @__PURE__ */ jsxDEV6("div", {
    class: "tile",
    children: [
      /* @__PURE__ */ jsxDEV6("div", {
        class: "tile-persent",
        children: [
          persent,
          "%"
        ]
      }, undefined, true, undefined, this),
      /* @__PURE__ */ jsxDEV6("div", {
        class: "tile-description",
        children: description
      }, undefined, false, undefined, this)
    ]
  }, undefined, true, undefined, this);
}

// src/components/tiles/tiles.tsx
import { For as For3 } from "@solenopsys/converged-renderer";
import { parse as parse4 } from "yaml";
import { readFile as readFile5 } from "@fileio";
import { jsxDEV as jsxDEV7 } from "@solenopsys/converged-renderer/jsx-dev-runtime";
var Tiles = ({ url }) => {
  const yamlContent = readFile5(url);
  const config = parse4(yamlContent);
  console.log("tiles", config);
  return /* @__PURE__ */ jsxDEV7("div", {
    class: "width_conteiner tiles",
    children: /* @__PURE__ */ jsxDEV7(For3, {
      values: config,
      children: (feature) => /* @__PURE__ */ jsxDEV7("div", {
        children: /* @__PURE__ */ jsxDEV7(Tile, {
          persent: feature.persent,
          description: feature.description
        }, undefined, false, undefined, this)
      }, undefined, false, undefined, this)
    }, undefined, false, undefined, this)
  }, undefined, false, undefined, this);
};

// src/components/features/feature.tsx
import { For as For4 } from "@solenopsys/converged-renderer";

// src/components/iconlabel/iconlabel.tsx
import { jsxDEV as jsxDEV8 } from "@solenopsys/converged-renderer/jsx-dev-runtime";
function IconLabel({ icon, label }) {
  return /* @__PURE__ */ jsxDEV8("div", {
    class: "iconlabel",
    children: [
      /* @__PURE__ */ jsxDEV8("div", {
        class: "iconlabel-icon",
        children: /* @__PURE__ */ jsxDEV8("img", {
          src: icon,
          alt: label,
          style: { height: "32px", width: "auto", paddingTop: "12px" }
        }, undefined, false, undefined, this)
      }, undefined, false, undefined, this),
      /* @__PURE__ */ jsxDEV8("div", {
        class: "iconlabel-label",
        children: label
      }, undefined, false, undefined, this)
    ]
  }, undefined, true, undefined, this);
}

// src/components/features/feature.tsx
import { jsxDEV as jsxDEV9 } from "@solenopsys/converged-renderer/jsx-dev-runtime";
function Feature({ icon, title, description, labels }) {
  console.log("labels11", labels);
  return /* @__PURE__ */ jsxDEV9("div", {
    class: "feature",
    children: [
      /* @__PURE__ */ jsxDEV9("div", {
        style: "display:flex;gap:10px",
        children: [
          /* @__PURE__ */ jsxDEV9("div", {
            children: /* @__PURE__ */ jsxDEV9("img", {
              src: icon,
              alt: title,
              style: { height: "48px", width: "auto", paddingTop: "12px" }
            }, undefined, false, undefined, this)
          }, undefined, false, undefined, this),
          /* @__PURE__ */ jsxDEV9("div", {
            style: { paddingLeft: "23px" },
            children: [
              /* @__PURE__ */ jsxDEV9("div", {
                class: "feature-title",
                children: title
              }, undefined, false, undefined, this),
              /* @__PURE__ */ jsxDEV9("div", {
                class: "feature-description",
                children: description
              }, undefined, false, undefined, this)
            ]
          }, undefined, true, undefined, this)
        ]
      }, undefined, true, undefined, this),
      /* @__PURE__ */ jsxDEV9("div", {
        class: "labels-container",
        children: /* @__PURE__ */ jsxDEV9(For4, {
          values: labels,
          children: (label) => /* @__PURE__ */ jsxDEV9(IconLabel, {
            icon: label.icon,
            label: label.title
          }, undefined, false, undefined, this)
        }, undefined, false, undefined, this)
      }, undefined, false, undefined, this)
    ]
  }, undefined, true, undefined, this);
}

// src/components/features/features.tsx
import { For as For5 } from "@solenopsys/converged-renderer";
import { parse as parse5 } from "yaml";
import { readFile as readFile6 } from "@fileio";
import { jsxDEV as jsxDEV10 } from "@solenopsys/converged-renderer/jsx-dev-runtime";
var Features = ({ url }) => {
  const yamlContent = readFile6(url);
  const config = parse5(yamlContent);
  console.log("features", config);
  return /* @__PURE__ */ jsxDEV10("div", {
    class: "width_conteiner features",
    children: [
      /* @__PURE__ */ jsxDEV10("h1", {
        children: config.header
      }, undefined, false, undefined, this),
      /* @__PURE__ */ jsxDEV10(For5, {
        values: config.items,
        children: (feature) => /* @__PURE__ */ jsxDEV10("div", {
          children: /* @__PURE__ */ jsxDEV10(Feature, {
            icon: feature.icon,
            title: feature.title,
            description: feature.description,
            labels: feature.labels
          }, undefined, false, undefined, this)
        }, undefined, false, undefined, this)
      }, undefined, false, undefined, this)
    ]
  }, undefined, true, undefined, this);
};

// src/group.tsx
import { For as For6 } from "@solenopsys/converged-renderer";
import { jsxDEV as jsxDEV11 } from "@solenopsys/converged-renderer/jsx-dev-runtime";
function Group(items) {
  return () => {
    return /* @__PURE__ */ jsxDEV11("div", {
      class: "page",
      children: /* @__PURE__ */ jsxDEV11(For6, {
        values: items,
        children: (item) => {
          if (item.plan) {
            return /* @__PURE__ */ jsxDEV11("div", {
              style: "margin-left:40px;margin-right:40px",
              children: /* @__PURE__ */ jsxDEV11(PlanGroup, {
                url: item.plan
              }, undefined, false, undefined, this)
            }, undefined, false, undefined, this);
          }
          if (item.tiles) {
            return /* @__PURE__ */ jsxDEV11("div", {
              style: "margin-left:40px;margin-right:40px",
              children: /* @__PURE__ */ jsxDEV11(Tiles, {
                url: item.tiles
              }, undefined, false, undefined, this)
            }, undefined, false, undefined, this);
          }
          if (item.features) {
            return /* @__PURE__ */ jsxDEV11("div", {
              style: "margin-left:40px;margin-right:40px",
              children: /* @__PURE__ */ jsxDEV11(Features, {
                url: item.features
              }, undefined, false, undefined, this)
            }, undefined, false, undefined, this);
          }
          if (item.md) {
            return /* @__PURE__ */ jsxDEV11("div", {
              class: "width_conteiner",
              children: /* @__PURE__ */ jsxDEV11(Markdown, {
                url: item.md
              }, undefined, false, undefined, this)
            }, undefined, false, undefined, this);
          }
          if (item.banner) {
            return /* @__PURE__ */ jsxDEV11(Banner, {
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
import { jsxDEV as jsxDEV12 } from "@solenopsys/converged-renderer/jsx-dev-runtime";
function Header() {
  return /* @__PURE__ */ jsxDEV12("div", {
    class: "width_conteiner",
    children: /* @__PURE__ */ jsxDEV12("img", {
      src: "/images/4ir.svg",
      class: "logo"
    }, undefined, false, undefined, this)
  }, undefined, false, undefined, this);
}

// src/components/footer/footer.tsx
import { jsxDEV as jsxDEV13 } from "@solenopsys/converged-renderer/jsx-dev-runtime";
function Footer() {
  return /* @__PURE__ */ jsxDEV13("div", {
    class: "footer",
    children: /* @__PURE__ */ jsxDEV13("div", {
      class: "width_conteiner",
      children: [
        /* @__PURE__ */ jsxDEV13("b", {
          children: "Contacts"
        }, undefined, false, undefined, this),
        " ",
        /* @__PURE__ */ jsxDEV13("br", {}, undefined, false, undefined, this),
        "Phone: +7 (495) 085-00-17",
        /* @__PURE__ */ jsxDEV13("br", {}, undefined, false, undefined, this),
        "Email: info@solenopsys.org",
        /* @__PURE__ */ jsxDEV13("br", {}, undefined, false, undefined, this),
        "© 2025 4IR Club"
      ]
    }, undefined, true, undefined, this)
  }, undefined, false, undefined, this);
}

// src/body.tsx
import { jsxDEV as jsxDEV14 } from "@solenopsys/converged-renderer/jsx-dev-runtime";
function Body(objectArray) {
  return /* @__PURE__ */ jsxDEV14("body", {
    children: [
      /* @__PURE__ */ jsxDEV14(Header, {}, undefined, false, undefined, this),
      /* @__PURE__ */ jsxDEV14("div", {
        class: "content",
        children: () => Group(objectArray)
      }, undefined, false, undefined, this),
      /* @__PURE__ */ jsxDEV14(Footer, {}, undefined, false, undefined, this)
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
 
    ${body}
 
</html>
`;
  writeFile(out, html);
  console.log(`Страница сгенерирована: ${out}`);
}
export {
  renderPage
};
