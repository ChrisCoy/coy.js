// TODO: LIST COMPONENT

const $props = (props) => new Props(props);

const H1 = (...args) => new BaseComponent("h1", args);
const H2 = (...args) => new BaseComponent("h2", args);
const H3 = (...args) => new BaseComponent("h3", args);
const H4 = (...args) => new BaseComponent("h4", args);
const H5 = (...args) => new BaseComponent("h5", args);
const H6 = (...args) => new BaseComponent("h6", args);
const Hr = (...args) => new BaseComponent("hr", args);
const Br = () => new BaseComponent("br");
const Div = (...args) => new BaseComponent("div", args);
const Button = (...args) => new BaseComponent("button", args);
const Input = (...args) => new BaseComponent("input", args);

// TODO: BETTER APPROACH
const Show = ({ when, content, fallBack }) => {
  let lastState = null;

  if (isCoySignal(when)) {
    const fragment = new BaseComponent("div");

    effect(() => {
      const result = when();
      if (result !== lastState) {
        const component = !!result ? content : fallBack;
        if (component) {
          fragment.el.replaceChildren(component.el);
        } else {
          fragment.el.replaceChildren();
        }
        lastState = result;
      }
    });

    return fragment;
  } else {
    return !!when ? content : fallBack;
  }
};

// the fact you need to run the signals breaks the rules, making components less re-usable
const List = ({ data, render }) => {
  if (isCoySignal(data)) {
    const fragment = new BaseComponent("div");

    effect(() => {
      const result = data() || [];
      const componentsArray = result.map(render).map((c) => c.el);

      fragment.el.replaceChildren(...componentsArray);
    });

    return fragment;
  } else {
    return data.map((d) => render(d));
  }
};
