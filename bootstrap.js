function bootstrap(root, component) {
  const el = createElement(component);

  root.appendChild(el.node);
}
