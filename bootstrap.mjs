import { BaseComponent } from "./baseComponent.mjs";
import { props } from "./components.mjs";

export function bootstrap(root, component) {
  if (!root || !(root instanceof Element)) {
    throw new Error("Root must be a reference dom a DOM node");
  }

  // const c = createElement(Div("teste"))

  const rootComponent = new BaseComponent("reference", [
    props({ DOMNode: root }),
    component()
  ]);

  console.log("tree", rootComponent);
  
  rootComponent.renderChildren();

  console.log("tree", rootComponent);
  // const element = createElement(component);
  // console.log("element", element);
  
  // rootComponent.appendChild(element)

  // console.log("tree", rootComponent);
}
