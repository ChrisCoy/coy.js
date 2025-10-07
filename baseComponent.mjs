// TODO: better errors to show if a signal was used in the wrong way
// let context = null;

import {
  effect,
  isCoySignal,
  setPropertiesAndListenToSignals,
} from "./signal.mjs";
import { isStringNodeByTypeof, swipeItemsOnArray } from "./utils.mjs";

export function isCoyComponent(component) {
  if (component instanceof BaseComponent) {
    return true;
  }
  return false;
}

export class BaseComponent {
  // make props private, external components must only can interact by methods
  /** @type {Element | Text | Comment} */
  element;

  props = {};

  /** @type {Array<BaseComponent>} */
  children = [];
  tag;

  /** @type {BaseComponent} */
  parent;

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

        // to check if it's a plain object
        if(arg?.constructor === Object){
          const { ref, ...rest } = arg;
          refFn = ref;
          acc.propsObjs.push(rest);
          return acc;
        }

        if(!!arg){
          acc.children.push(arg);
        }

        return acc;
      },
      { children: [], propsObjs: [] }
    );

    Object.assign(this.props, ...propsObjs);
    this.tag = tag;

    this.#create(refFn);
    this.#createChildren(children);
  }

  renderChildren() {
    for (let i = 0; i < this.children.length; i++) {
      const element = this.children[i];
      let result;

      if (this.tag === "fragment") {
        element.parent = this.parent;
        result = this.appendChild(element, false);
      } else {
        element.parent = this;
        result = this.appendChild(element, false);
      }

      if (result.tag !== "text") {
        result.renderChildren();
      }
    }
  }

  destroy() {
    if (this.tag === "fragment") {
      this.children.forEach((el) => el.destroy());
    }
    this.children = [];
    this.element.remove();
  }

  #create(refFn) {
    const hasProps = Object.keys(this.props).length > 0;

    switch (this.tag) {
      case "text":
        if (hasProps) console.warn("Props are ignored on text components");
        this.element = document.createTextNode("");
        break;
      case "fragment":
        this.element = document.createComment(
          `Coy.${this.props.name ?? "Fragment"}`
        );
        break;
      case "comment":
        this.element = document.createComment(this.props.text);
        break;
      case "reference":
        const { DOMNode, ...componentProps } = this.props;

        if (DOMNode) {
          if (!(DOMNode instanceof Element)) {
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

        Object.entries(componentProps).forEach(([key, value]) => {
          setPropertiesAndListenToSignals(this.element, key, value);
        });
        break;
      default:
        // all other elements like div, h1, section and etc.
        this.element = document.createElement(this.tag);

        Object.entries(this.props).forEach(([key, value]) => {
          setPropertiesAndListenToSignals(this.element, key, value);
        });
        break;
    }

    if (refFn) {
      if (typeof refFn === "function") {
        if (this.tag !== "fragment") {
          refFn(this.element);
        } else {
          console.error("You cannot attach a ref in a fragment component");
        }
      } else {
        console.error("Ref prop must be a function");
      }
    }
  }

  #createElement(toCreate) {
    const typeofChild = typeof toCreate;

    if (typeofChild === "function") {
      let result = toCreate();
      /** @type {BaseComponent} */
      const element = this.#createElement(result);

      if (isCoySignal(toCreate)) {
        effect(() => {
          // TODO: MAKE THIS BE ABLE TO RETURN COMPONENTS
          // element.replaceChildren(child());
          // in order to replace the old children with the new one, we need to make the diff, changing
          // element.replaceChild
          element.element.textContent = toCreate();
        });
      }

      return element;
    }

    if (toCreate instanceof BaseComponent) {
      return toCreate;
    }

    if (isStringNodeByTypeof(typeofChild)) {
      const el = new BaseComponent("text", [toCreate]);
      return el;
    }

    throw new Error(`invalid element, ${toCreate} of type: ${typeofChild}`);
  }

  /** @param {Array} children  */
  #createChildren(children) {
    if (this.tag === "text") {
      this.element.textContent = children.join("");
      this.children = children;
      return;
    }

    this.children = children.map((el) => this.#createElement(el));
  }

  /** @param {BaseComponent} toAppend */
  appendChild(toAppend, addToList = true) {
    toAppend = this.#createElement(toAppend);

    if (addToList) {
      this.children.push(toAppend);
    }

    if (this.tag === "fragment") {
      if (this.parent && this.parent.element.contains(this.element)) {
        this.parent.element.insertBefore(toAppend.element, this.element);
      }
    } else {
      this.element.appendChild(toAppend.element);
    }

    return toAppend;
  }

  swapChildPlaces(from, to) {
    if (from === to) return;

    if (typeof from !== "number" || from < 0 || from >= this.children.length) {
      throw new Error(
        `Invalid from position ${from} at BaseComponent.swapChildPlaces`
      );
    }

    if (typeof to !== "number" || to < 0 || to >= this.children.length) {
      throw new Error(
        `Invalid to position ${to} at BaseComponent.swapChildPlaces`
      );
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

  replaceChild(fromComponent, toComponent) {
    const index = this.children.findIndex((e) => e === fromComponent);
    if (index === -1) {
      throw new Error(
        "You're trying to replace a element that it is not on this component."
      );
    }

    if (isCoyComponent(toComponent)) {
      throw new Error("Component is not a coy component");
    }

    this.children[index] = toComponent;

    fromComponent.element.replaceWith(toComponent);
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
}

/**
 *
    type PropsType<T = any> = T
    type Props<T = any, K = any> = K extends PropsType ? PropsType<T> : K;

    type DivProperties = {
      id: string;
      style: object;
    }

    function Div(...props: Props<DivProperties>[]){}
    function H1(...props: Props<{h1: string}>[]){}

    function props<T>(props: PropsType<T>) : PropsType<T> {
      return "" as PropsType<T>;
    }

    Div(props({id: "text", style: {}}))
    H1(props({h1: "text"}))
 */
export class Props {
  constructor(props) {
    this.props = props;
  }
}
