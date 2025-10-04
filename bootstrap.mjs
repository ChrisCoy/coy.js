import { BaseComponent } from "./baseComponent.mjs";
import { props } from "./components.mjs";

export function bootstrap(root, component) {
  if (!root || !(root instanceof Element)) {
    throw new Error("Root must be a reference dom a DOM node");
  }

  const rootComponent = new BaseComponent("reference", [
    props({ DOMNode: root }),
    component()
  ]);

  rootComponent.renderChildren();
}
