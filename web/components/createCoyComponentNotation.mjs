import { getChildrenAndPropsFromArgs } from "../props/getPropsFromArgs.mjs";

function createCoyComponentNotation(tag, args = []) {
  const { children, props, ref } = getChildrenAndPropsFromArgs();

  const hasProps = Object.keys(props).length > 0;

  switch (tag) {
    case "text":
      if (hasProps) console.warn("Props are ignored on Text Components");
      break;
    case "fragment":
      if (hasProps) console.warn("Props are ignored on Fragment Components");
      break;
    default:
      break;
  }

  return {
    type: tag,
    ref: ref,
    props: props,
    children: children,
  };
}

export { createCoyComponentNotation };
