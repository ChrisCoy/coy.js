let context = null;
let isRendering = false;

function literalsToString(strings, values) {
  const result = strings.reduce((acc, str, i) => {
    const value = typeof values[i] === "function" ? values[i]() : values[i];
    return acc + str + (value !== undefined ? value : "");
  }, "");

  return result;
}

class Subscriber {
  constructor(first, ...args) {
    if (typeof first === "function") {
      this.type = "function";
      this.func = first;
    } else {
      this.type = "literals";
      this.strings = first;
      this.values = args;
    }
  }
}

function sub(...args) {
  return new Subscriber(...args);
}

function signal(value) {
  const subscriptions = new Set();

  const runSubs = () => subscriptions.forEach((fn) => fn());

  const getState = () => {
    if (context) subscriptions.add(context);

    return value;
  };
  getState.type = "$$SignalGetter";

  const setState = (updated) => {
    value = updated;
    runSubs();
  };
  setState.type = "$$SignalSetter";

  return [getState, setState];
}

function effect(fn) {
  context = fn;
  fn();
  context = null;
}

function computed(fn) {
  const [getState, setState] = signal();

  effect(() => {
    setState(fn());
  });

  return getState;
}

class BaseComponent {
  el;
  // events;
  // props = logProxy("BaseComponent.props", {});
  props = {};
  children = [];

  constructor(tag, args = []) {
    isRendering = true;
    const { children, props_objs } = args.reduce(
      (acc, arg) => {
        if (arg instanceof Props) {
          acc.props_objs.push(arg.props);
          return acc;
        }

        acc.children.push(arg);
        return acc;
      },
      { children: [], props_objs: [] }
    );

    this.children = children;
    Object.assign(this.props, ...props_objs);
    this.props.tag = tag;

    // if (Array.isArray(this.props.listen))
    //   this.events = new Set(this.props.listen);

    // if (this.props.onUpdate && this.events)
    //   this.events.forEach((e) =>
    //     window.addEventListener(e, this.#eventCallBack.bind(this))
    //   );

    this.create();

    isRendering = false;
  }

  // #eventCallBack() {
  //   this.props.onUpdate?.(this.el, this.props);
  // }

  destroy() {
    this.el.remove();
    // this.events?.forEach((e) =>
    //   window.removeEventListener(e, this.#eventCallBack.bind(this))
    // );
  }

  #createElement(child) {
    const typeofChild = typeof child;

    if (typeofChild === "function") {
      let oldChild = child();
      const element = this.#createElement(oldChild);

      return element;
    }

    if (child instanceof BaseComponent) {
      return child.el;
    }

    if (isStringNodeByTypeof(typeofChild)) {
      return document.createTextNode(child + "");
    }

    throw new Error(`invalid element type: ${typeofChild}`);
  }

  create() {
    // if (this.props.tag === "text") {
    //   this.el = document.createTextNode(this.children[0]);
    //   return;
    // }

    this.el = document.createElement(this.props.tag);
    Object.assign(this.el, this.props);

    this.children?.forEach((c, index) => {
      if (c instanceof Subscriber) {
        if (c.type === "function") {
          effect(() => {
            Object.assign(this.el, c.func(this.props));
          });
        } else {
          const textNode = document.createTextNode("");

          effect(() => {
            const text = literalsToString(c.strings, c.values);

            textNode.textContent = text;
          });

          this.el.appendChild(textNode);
        }
      } else {
        this.el.appendChild(this.#createElement(c));
      }

      // if (c instanceof BaseComponent) {
      //   this.el.appendChild(c.el);
      //   return;
      // }

      // if (isStringNode(c)) {
      //   const textNode = document.createTextNode(c);
      //   this.el.appendChild(textNode);
      //   this.children[index] = textNode;
      //   return;
      // }

      // throw new Error("Invalid child type!");
    });
  }
}

class Props {
  constructor(props) {
    this.props = props;
  }
}
