// TODO: FRAGMENTS
// TODO: think in a way of separate the html props from the custom props
// TODO: better errors to show if a signal was used in the wrong way

function setPropertiesAndListenToSignals(cursor, key, prop) {
  const typeofProp = typeof prop;

  if (isStringNodeByTypeof(typeofProp)) {
    cursor[key] = prop;
    return;
  }

  if (typeofProp === "undefined" || prop === null) {
    return;
  }

  if (Array.isArray(prop)) {
    cursor[key] = prop;
  } else if (typeofProp === "object") {
    if (!cursor[key]) {
      cursor[key] = {};
    }

    Object.entries(prop).forEach(([k, v]) => {
      setPropertiesAndListenToSignals(cursor[key], k, v);
    });
  } else if (typeofProp === "function") {
    if (isCoySignal(prop)) {
      effect(() => {
        cursor[key] = prop();
      });
    } else {
      cursor[key] = prop;
    }
  }
}

class BaseComponent {
  el;
  props = {};
  children = [];

  constructor(tag, args = []) {
    const { children, props_objs } = args.reduce(
      (acc, arg) => {
        if (arg instanceof Props) {
          acc.props_objs.push(arg.props);
          return acc;
        }

        if (Array.isArray(arg)) {
          acc.children.push(...arg);
          return acc;
        }

        acc.children.push(arg);
        return acc;
      },
      { children: [], props_objs: [] }
    );

    this.children = children;
    Object.assign(this.props, ...props_objs);

    this.create(tag);
  }

  destroy() {
    this.el.remove();
  }

  #createElement(child) {
    const typeofChild = typeof child;

    if (typeofChild === "function") {
      let result = child();
      const element = this.#createElement(result);

      if (isCoySignal(child)) {
        effect(() => {
          // TODO: MAKE THIS BE ABLE TO RETURN COMPONENTS
          element.textContent = child();
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

  create(tag) {
    const hasProps = Object.keys(this.props).length > 0;

    this.el = document.createElement(tag);

    Object.entries(this.props).forEach(([key, value]) => {
      setPropertiesAndListenToSignals(this.el, key, value);
    });

    // else if (tag === "text") {
    //   if (this.props) {
    //     console.warn("props are ignored on text nodes");
    //   }

    //   this.el = document.createTextNode("");
    // }

    this.children?.forEach((c) => {
      this.el.appendChild(this.#createElement(c));
    });
  }
}

class Props {
  constructor(props) {
    this.props = props;
  }
}
