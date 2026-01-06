import { getPropsFromArgs } from "../props/getPropsFromArgs.mjs";

export const $CoyComponent = Symbol("$CoyComponent");

function createCoyComponent(tag, args = []) {
  const { children, props, ref } = getPropsFromArgs(args);

  let element = document.createElement(tag);

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

  return {
    element,
    children,
    type: tag,
    props,
    [$CoyComponent]: true,
  };
}

export { createCoyComponent };
