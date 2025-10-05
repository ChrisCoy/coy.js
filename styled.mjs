import { BaseComponent } from "./baseComponent.mjs";
import { props } from "./components.mjs";
import { createRandomString } from "./utils.mjs";

const cssProps = new Set();

for (const key in document.body.style) {
  cssProps.add(key);
}

const allStylesSet = new Set();

function objectToCssRule(selector, styleObj) {
  const css = Object.entries(styleObj)
    .map(([prop, value]) => {
      const kebab = prop.replace(/[A-Z]/g, (m) => "-" + m.toLowerCase());
      return `${kebab}: ${value};`;
    })
    .join(" ");

  return `${selector} { ${css} }`;
}

const getValidClassName = () => {
  let className = `coys-${createRandomString()}`;
  while (allStylesSet.has(className)) {
    className = `coys-${createRandomString()}`;
  }

  allStylesSet.add(className);

  return className;
};

const styled = (tagOrComponent) => {
  const sheet = new CSSStyleSheet();
  let className = getValidClassName();

  const createFn = (styles) => {
    if (styles.constructor !== Object) {
      throw new Error("Style must be a object");
    }

    const generateStylesRecursively = (curSelector, curObject) => {
      const buildedStyle = {};

      for (let [key, value] of Object.entries(curObject)) {
        if (cssProps.has(key)) {
          // when it's a css property
          if (typeof value === "function") {
          } else {
            buildedStyle[key] = value;
          }
        } else if (key.startsWith("@")) {
          // when it's a rule
          const styleString = generateStylesRecursively(curSelector, value);
          let mediaRule = `${key} { ${styleString} }`

          sheet.insertRule(mediaRule)
        } else {
          // when it's a selector
          let cn;

          if (key.startsWith("&")) {
            cn = key.replace(/&/g, curSelector);
          } else if (key.startsWith(":")) {
            cn = `${curSelector}${key.replace(/&/g, curSelector)}`;
          } else {
            cn = `${curSelector} ${key.replace(/&/g, curSelector)}`;
          }

          const styleString = generateStylesRecursively(cn, value);
          sheet.insertRule(styleString)
        }
      }

      return objectToCssRule(curSelector, buildedStyle);
    };

    const mainStyle = generateStylesRecursively(`.${className}`, styles);
    sheet.insertRule(mainStyle);
    document.adoptedStyleSheets = [...document.adoptedStyleSheets, sheet];

    if (typeof tagOrComponent === "string") {
      return (...args) =>
        new BaseComponent(tagOrComponent, [...args, props({ className })]);
    }

    return (args) => {
      if (args && args.constructor !== Object) {
        throw new Error(
          "The props need to be a object in order to use a component as a base to styled"
        );
      }

      return tagOrComponent({ ...(args || {}), className });
    };
  };

  createFn.toString = () => className;

  return createFn;
};

export { styled };

// const AlgumComponent = styled("div")({
//   display: "flex",

//   ["&:div > algo"]: {},
// });
