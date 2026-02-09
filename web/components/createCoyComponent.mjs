import { getPropsFromArgs } from "../props/getPropsFromArgs.mjs";

export const $CoyComponent = Symbol("$CoyComponent");

function createCoyComponent(tag, args = []) {
  const { children, props, ref } = getPropsFromArgs(args);

  let element;

  if(tag !== "fragment" && tag !== "List"){
    element = document.createElement(tag);
  }

  if (ref) {
    if (typeof ref === "function") {
      if (tag !== "fragment" && tag !== "List") {
        // @ts-ignore
        ref(element);
      } else {
        console.error("You cannot attach a ref in a fragment component");
      }
    } else {
      console.error("Ref prop must be a function");
    }
  }

  return {
    element,
    children,
    type: tag,
    props,
    [$CoyComponent]: true,
  };
}

export { createCoyComponent };
