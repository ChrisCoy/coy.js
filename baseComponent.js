// TODO: FRAGMENTS
// TODO: better errors to show if a signal was used in the wrong way

// function populateChildren(container, childrenList) {
//   let children = [];
//   childrenList?.forEach((c) => {
//     const element = createElement(c);

//     if (c.tag === "fragment") {
//       populateChildren(container, c.children);
//       return;
//     }

//     container.appendChild(element);
//     children.push(element);
//   });

//   return children;
// }

class BaseComponent {
  element;
  props = {};
  children = [];
  tag;
  parent;
  nodeText = "";

  constructor(tag, args = []) {
    let refFn = null;
    const { children, propsObjs } = args.reduce(
      (acc, arg) => {
        if (arg instanceof Props) {
          const { ref, ...rest } = arg.props;
          refFn = ref;
          acc.propsObjs.push(rest);
          return acc;
        }

        if (Array.isArray(arg)) {
          acc.children.push(...arg);
          return acc;
        }

        acc.children.push(arg);
        return acc;
      },
      { children: [], propsObjs: [] }
    );

    Object.assign(this.props, ...propsObjs);
    this.children = children;
    this.tag = tag;

    this.create(refFn);
  }

  destroy() {
    if (this.tag !== "void") {
      this.element.remove();
    }
  }

  create(refFn) {
    const hasProps = Object.keys(this.props).length > 0;

    switch (this.tag) {
      case "void":
        if (hasProps) console.warn("Props are ignored on void components");
        break;
      case "text":
        if (hasProps) console.warn("Props are ignored on text components");
        this.element = document.createTextNode("");
        break;
      case "fragment":
        this.element = document.createComment("Coy.Fragment");
        break;
      case "reference":
        const { DOMNode, ...rest } = this.props;

        if (DOMNode) {
          if (
            !(DOMNode instanceof Element) &&
            !(DOMNode instanceof BaseComponent)
          ) {
            throw new Error(
              "DOMNode node must be either a Dom Element or a BaseComponent"
            );
          }

          this.element = DOMNode;
        } else {
          throw new Error(
            "In reference component you need to pass the DOMNode prop which"
          );
        }

        Object.entries(rest).forEach(([key, value]) => {
          setPropertiesAndListenToSignals(this.element, key, value);
        });
        break;
      default:
        this.element = document.createElement(this.tag);

        Object.entries(this.props).forEach(([key, value]) => {
          setPropertiesAndListenToSignals(this.element, key, value);
        });
        break;
    }

    if (refFn && typeof refFn === "function") {
      if (this.element.tag !== "void" && this.element.tag !== "fragment") {
        refFn(this.element);
      }
    }

    this.#createChildren();
  }

  appendChild(element) {
    if (!isCoyComponent(element)) {
      throw new Error("Element must be a BaseComponent instance");
    }

    if (element.tag === "void") {
      return;
    }

    if (this.tag === "fragment") {
      if (this.parent && this.parent.element.contains(this.element)) {
        this.parent.element.insertBefore(element.element, this.element);
      }
    } else {
      this.element.appendChild(element.element);
    }
  }

  swapChild(from, to) {
    if (from === to) return;

    if (typeof from !== "number" || from < 0 || from >= this.children.length) {
      throw new Error(
        `Invalid from position ${from} at BaseComponent.swapChild`
      );
    }

    if (typeof to !== "number" || to < 0 || to >= this.children.length) {
      throw new Error(`Invalid to position ${to} at BaseComponent.swapChild`);
    }

    const fromNode = this.children[from];
    const toNode = this.children[to];

    swipeItemsOnArray(this.children, from, to);

    if (!fromNode || !toNode) {
      throw new Error("Nodes at specified positions do not exist.");
    }

    const parentNode = fromNode.parent.element;
    if (parentNode) {
      const temp = document.createComment("");
      toNode.element.replaceWith(temp);
      fromNode.element.replaceWith(toNode.element);
      temp.replaceWith(fromNode.element);
    }
  }

  removeChildAt(position) {
    if (
      typeof position !== "number" ||
      position < 0 ||
      position > this.children.length
    ) {
      throw new Error(
        `Invalid position ${position} at BaseComponent.removeChildAt`
      );
    }

    this.children[position].destroy();
    this.children.splice(position, 1);
  }

  removeAllChildren() {
    if (this.tag === "fragment") {
      this.children.forEach((c) => c.destroy());
    } else {
      this.element.textContent = "";
    }

    this.children = [];
  }

  #createChildren() {
    if (this.tag === "text") {
      this.nodeText = this.children.join("");
      this.element.textContent = this.nodeText;
      this.children = [];
    } else {
      this.children = this.children.map((c) => createElement(c));
    }
  }
}

class Props {
  constructor(props) {
    this.props = props;
  }
}
