import { BaseComponent } from "./baseComponent.mjs";
import { props } from "./components.mjs";
import { createRandomString } from "./utils.mjs";

const cssProps = [];

for (const key in document.body.style) {
  cssProps.push(key);
}

const allStylesSet = new Set();

const getValidClassName = () => {
  let className = createRandomString();
  while (allStylesSet.has(className)) {
    className = createRandomString();
  }

  return className;
};

const styled = (tagOrComponent) => {
  let className = ".coys-" + getValidClassName();

  const createFn = (styles) => {
    if (styles.constructor !== Object) {
      throw new Error("Style must be a object");
    }

    // ...styles here...

    const aaaaaaaa = () => {
      
    }

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
