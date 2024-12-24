let context = null;
let stack = 0;
let isRendering = false;

function signal(value) {
  const subscriptions = new Set();

  const runSubs = () => subscriptions.forEach((fn) => fn());

  const getState = () => {
    if (context) subscriptions.add(context);

    if (isRendering) {
      stack++;
    }

    return value;
  };

  const setState = (updated) => {
    value = updated;
    runSubs();
  };

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

// let [getCount, setCount] = signal(0);

// effect(() => {
//   console.log(getCount());
// });

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
  //   debugger;
  //   this.props.onUpdate?.(this.el, this.props);
  // }

  destroy() {
    this.el.remove();
    // this.events?.forEach((e) =>
    //   window.removeEventListener(e, this.#eventCallBack.bind(this))
    // );
  }

  #patch(oldNode, newNode) {
    debugger;
    if (
      !(oldNode instanceof BaseComponent) ||
      !(newNode instanceof BaseComponent)
    ) {
      throw new Error("cannot patch new state");
    }

    if (oldNode.el === newNode.el) {
      return;
    }

    if (oldNode.el.textContent !== newNode.el.textContent) {
      oldNode.el.textContent = newNode.el.textContent;
    }

    // if()
  }

  #createElement(child) {
    const typeofChild = typeof child;

    if (typeofChild === "function") {
      let oldChild = child();
      const element = this.#createElement(oldChild);

      if (stack != 0) {
        stack = 0;
        effect(() => {
          debugger;
          // criar uma função de patch, onde ela vai receber a função que vai criar a outra arvore, e o node atual
          const content = child();

          if (isStringNodeByTypeof(typeof content)) {
            element.textContent = content;
            return;
          }

          this.#patch(oldChild, content);
        });
      }

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
      this.el.appendChild(this.#createElement(c));

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
