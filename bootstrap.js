function bootstrap(root, component) {
  if (!root || !(root instanceof Element)) {
    throw new Error("Root must be a reference dom a DOM node");
  }

  const element = createElement(component);

  const tree = new BaseComponent("reference", [
    props({ DOMNode: root }),
    element,
  ]);

  console.log(tree);

  populateNodesDOM(tree);
}
