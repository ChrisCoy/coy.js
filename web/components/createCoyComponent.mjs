import { effect, isCoySignal } from "../../signal.mjs";
import { getPropsFromArgs } from "../props/getPropsFromArgs.mjs";
import { isStringNodeByTypeof } from "../utils/utils.mjs";

export const HTMLElementSymbol = Symbol("$HTMLElementSymbol");
const FragmentElementSymbol = Symbol("$FragmentElementSymbol");
const CommentElementSymbol = Symbol("$CommentElementSymbol");

function createCoyComponent(tag, args = []) {
  const { children, props, ref } = getPropsFromArgs(args);

  let element;

  switch (tag) {
    case "text":
      element = document.createTextNode("");

      effect(() => {
        let text;
        for (let prop of children) {
          if (isCoySignal(prop)) {
            const signalValue = prop();

            if (!isStringNodeByTypeof(typeof signalValue)) {
              throw new Error("Text Components only accepts text as children");
            }

            text += prop;
          } else if (isStringNodeByTypeof(typeof prop)) {
            text += prop;
          } else {
            throw new Error("Text Components only accepts text as children");
          }

          element.innerText = text;
        }
      });

      break;
    case "fragment":
      for (let i = 0; i < children.length; i++) {
        const child = children[i];

        if (typeof child === "function") {
          const component = child();
        }
      }
      break;
    default:
      for (let i = 0; i < children.length; i++) {
        const child = children[i];

        if (typeof child === "function") {
          const component = child();
          children[i] = component;
        }
      }
      element = document.createElement(tag);

      // Object.entries(props).forEach(([key, value]) => {
      //   setPropertiesAndListenToSignals(element, key, value);
      // });
      break;
  }

  // if (refFn) {
  //   if (typeof refFn === "function") {
  //     if (this.tag !== "fragment") {
  //       refFn(this.element);
  //     } else {
  //       console.error("You cannot attach a ref in a fragment component");
  //     }
  //   } else {
  //     console.error("Ref prop must be a function");
  //   }
  // }

  console.log("teste");

  return {
    element,
    children,
    props,
    [HTMLElementSymbol]: true,
  };
}

export { createCoyComponent };
