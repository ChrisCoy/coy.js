import { BaseComponent } from "./baseComponent.mjs";
import { props } from "./components.mjs";
import { createRandomString } from "./utils.mjs";

const cssProps = new Set();
const allStylesSet = new Set();
// /** @type {HTMLStyleElement} */
let styleTag;
const initLib = () => {
  for (const key in document.body.style) {
    cssProps.add(key);
  }

  styleTag = document.createElement("style");
  styleTag.id = "coy-styled";
  document.head.appendChild(styleTag);
};
initLib();

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

function setDeep(obj, keys = [], value) {
  let current = obj;

  for (let i = 0; i < keys.length - 1; i++) {
    current = current[keys[i]] ||= {};
  }

  current[keys[keys.length - 1]] = value;
}

const styled = (tagOrComponent) => {
  const tokens = {
    selectors: {},
    rules: {},
  };

  let className = getValidClassName();

  const createFn = (styles) => {
    if (styles.constructor !== Object) {
      throw new Error("Style must be a object");
    }

    const getTokens = ({ curSelector, curObject, rule, type } = undefined) => {
      for (let [key, value] of Object.entries(curObject)) {
        if (cssProps.has(key)) {
          if (rule) {
            setDeep(rule, ["selectors", curSelector, key], value);
          } else {
            setDeep(tokens, ["selectors", curSelector, key], value);
          }
        } else if (key.startsWith("@")) {
          if (!tokens.rules[key]) {
            tokens.rules[key] = {};
          }

          if (key.toLowerCase().startsWith("@keyframes")) {
            getTokens({
              curSelector: "",
              curObject: value,
              rule: tokens.rules[key],
              type: "keyframes",
            });
          } else {
            getTokens({
              curSelector,
              curObject: value,
              rule: tokens.rules[key],
              type: "rule",
            });
          }
        } else {
          if (value.constructor !== Object) {
            throw new Error(
              `Error on selector: ${key}, value must be a object`
            );
          }

          let cn;

          if (type === "keyframes") {
            cn = key.replace(/%/g, "") + "%";
          } else if (key.startsWith("&")) {
            cn = key.replace(/&/g, curSelector);
          } else if (key.startsWith(":")) {
            cn = `${curSelector}${key.replace(/&/g, curSelector)}`;
          } else {
            cn = `${curSelector} ${key.replace(/&/g, curSelector)}`;
          }

          getTokens({
            curSelector: cn,
            curObject: value,
            rule,
            type: "selector",
          });
        }
      }
    };

    getTokens({
      curSelector: `.${className}`,
      curObject: styles,
      rule: undefined,
      type: "base",
    });

    const listenToStylesChange = (selector, styles) => {
      for (const [key, value] of Object.entries(styles)) {
        const typeofStyle = typeof value;

        if (typeofStyle === "function") {
          let cssRule;

          setTimeout(() => {
            for (const rule of styleTag.sheet.cssRules) {
              if (rule.selectorText === selector) {
                cssRule = rule;
              }
            }
            debugger;

            cssRule.style[key] = "pink";
          }, 2000);

          // effect(() => {
          //   const result = value();
          //   cssRule[key] = result;
          // });
        }
      }
    };

    const generateSelectorsStyle = (selectors) => {
      let selectorsStyle = "";
      for (let [selector, styles] of Object.entries(selectors)) {
        selectorsStyle += objectToCssRule(selector, styles);
        listenToStylesChange(selector, styles);
      }

      return selectorsStyle;
    };

    const generateRulesStyle = (rules) => {
      let rulesStyle = "";
      for (let [rule, props] of Object.entries(rules)) {
        rulesStyle += `${rule} {${generateSelectorsStyle(props.selectors)}}`;
      }

      return rulesStyle;
    };

    const selectorsStyles = generateSelectorsStyle(tokens.selectors);
    const rulesStyles = generateRulesStyle(tokens.rules);

    styleTag.textContent += selectorsStyles + rulesStyles;

    console.log(styleTag.textContent);

    if (typeof tagOrComponent === "string") {
      return (...args) => {
        return new BaseComponent(tagOrComponent, [
          ...args,
          props({ className }),
        ]);
      };
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
