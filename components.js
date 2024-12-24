function props(props) {
  return new Props(props);
}

function Heading({ level }, ...args) {
  return new BaseComponent(`h${level}`, args);
}

function Br() {
  return new BaseComponent("br");
}

function Div(...args) {
  return new BaseComponent("div", args);
}

function Button(...args) {
  return new BaseComponent("button", args);
}

function CText(...args) {
  let signal = null;
  const { props_objs, text } = args.reduce(
    (acc, arg) => {
      if (cur !== null) {
        debugger;
        signal = cur;
        cur = null;
      }

      if (arg instanceof Props) {
        Object.assign(acc.props_objs, arg.props);
        return acc;
      }

      acc.text += arg;
      return acc;
    },
    { props_objs: {}, text: "" }
  );

  const oldOnUpdate = props_objs.onUpdate;

  props_objs.onUpdate = (el, props) => {
    debugger;
    const textResult = oldOnUpdate?.(text);
    el.textContent = textResult;
  };

  return new BaseComponent("text", [props(props_objs), text]);
}

const Show = ({ when, child, fallBack }) => {};


/**
  Div(
    Show({
      when: observer(() => state() >= 10),
      child: Div(H1("texto lol")),
      fallBack: Div(H1("false")),
    });
  )
*/
