import { getPropsFromArgs } from "../props/getPropsFromArgs.mjs";

export const $CoyComponent = Symbol("$CoyComponent");

function createCoyComponent(tag, args = []) {
  const { children, props, ref } = getPropsFromArgs(args);

  /** @type {HTMLElement | Comment} */
  let element;

  if(tag === "$CoyFragment" || tag === "$CoyList" || tag === "$CoyShow" ){
    element = document.createComment(tag);
  } else if (!tag) {
    throw new Error("invalid coy element type")
  } 
  else {
    element = document.createElement(tag);
  }

  if (ref) {
    if (typeof ref === "function") {
      if (tag === "$CoyFragment" || tag === "$CoyList" || tag === "$CoyShow") {
        console.error("You cannot attach a ref in a fragment component");
      } else {
        // @ts-ignore
        ref(element);
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
