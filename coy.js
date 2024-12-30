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
  nodes = [];

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

    Object.assign(this.props, ...props_objs);

    this.#create(tag, children);
  }

  destroy() {
    this.el.remove();
  }

  // TODO: remove this function from here and put it as a lib function
  createElement(child) {
    const typeofChild = typeof child;

    if (typeofChild === "function") {
      let result = child();
      const element = this.createElement(result);

      if (isCoySignal(child)) {
        effect(() => {
          // TODO: MAKE THIS BE ABLE TO RETURN COMPONENTS
          element.textContent = child();
        });
      }

      return element;
    }

    if (child instanceof BaseComponent) {
      return {
        node: child.el,
        raw: child,
      };
    }

    if (isStringNodeByTypeof(typeofChild)) {
      return {
        node: document.createTextNode(child + ""),
        raw: child,
      };
    }

    throw new Error(`invalid element type: ${typeofChild}`);
  }

  #create(tag, children) {
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

    children?.forEach((c) => {
      const element = this.createElement(c);
      this.el.appendChild(element.node);
      this.nodes.push(element);
    });
  }

  appendChild(element) {
    this.el.appendChild(element.node);
    this.nodes.push(element);
  }

  appendChildAtPosition(position, element) {
    if (!element || !element.node || !element.raw) {
      throw new Error(`Invalid element at BaseComponent.appendAtPosition`);
    }

    if (
      typeof position !== "number" ||
      position < 0 ||
      position > this.nodes.length
    ) {
      throw new Error(
        `Invalid position ${position} at BaseComponent.appendAtPosition`
      );
    }

    if (position === 0) {
      this.nodes.unshift(element);
      this.el.prepend(element.node);
    } else if (position === this.nodes.length - 1) {
      this.nodes.push(element);
      this.el.appendChild(element.node);
    } else {
      this.nodes.splice(position, 0, element);
      this.nodes[position - 1].insertAdjacentElement("beforeend", element.node);
    }
  }

  swapChild(from, to) {
    if (typeof from !== "number" || from < 0 || from >= this.nodes.length) {
      throw new Error(
        `Invalid from position ${from} at BaseComponent.swapChild`
      );
    }

    if (typeof to !== "number" || to < 0 || to >= this.nodes.length) {
      throw new Error(`Invalid to position ${to} at BaseComponent.swapChild`);
    }

    if(from === to) return;

    const fromNode = this.nodes[from];
    const toNode = this.nodes[to];

    swipeItemsOnArray(this.nodes, from, to);

    if (!fromNode || !toNode) {
      throw new Error("Nodes at specified positions do not exist.");
    }

    const fromTemp = document.createElement("div");
    const toTemp = document.createElement("div");

    fromNode.node.insertAdjacentElement("beforebegin", fromTemp);
    toNode.node.insertAdjacentElement("beforebegin", toTemp);
    
    fromTemp.replaceWith(toNode.node)
    toTemp.replaceWith(fromNode.node)
  }

  replaceChildren(...newChildren) {
    if (!newChildren || newChildren.length === 0) {
      this.el.replaceChildren();
    } else {
      this.el.replaceChildren(
        ...newChildren.map((nc) => {
          if (!nc || !nc.node || !nc.raw) {
            throw new Error(`Invalid element at BaseComponent.replaceChildren`);
          }

          return nc.node;
        })
      );
    }
  }

  removeChildAt(position) {
    if (
      typeof position !== "number" ||
      position < 0 ||
      position > this.nodes.length
    ) {
      throw new Error(
        `Invalid position ${position} at BaseComponent.removeChildAt`
      );
    }

    this.nodes[position].node.remove();
    this.nodes.splice(position, 1);
  }
}

class Props {
  constructor(props) {
    this.props = props;
  }
}
