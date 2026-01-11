import { $CoyComponent } from "../components/createCoyComponent.mjs";
import { Props } from "./props.mjs";

function getPropsFromArgs(args = []) {
  let refFn;

  const { children, propsObjs } = args.reduce(
    (acc, arg) => {
      if (arg === undefined || arg === null) {
        return acc;
      }

      if (arg instanceof Props) {
        const { ref, ...rest } = arg.props;
        refFn = ref;
        acc.propsObjs.push(rest);
        return acc;
      }

      if (arg[$CoyComponent]) {
        acc.children.push(arg);
        return acc;
      }

      // if (Array.isArray(arg)) {
      //   acc.children.push(...arg);
      //   return acc;
      // }

      // to check if it's a plain object
      if (arg?.constructor === Object) {
        const { ref, ...rest } = arg;
        refFn = ref;
        acc.propsObjs.push(rest);
        return acc;
      }

      if (!!arg) {
        acc.children.push(arg);
      }

      return acc;
    },
    { children: [], propsObjs: [] }
  );

  let props = {};

  Object.assign(props, ...propsObjs);

  return { children, props: props, ref: refFn };
}

export { getPropsFromArgs };
