

function bootstrap(root, component) {
  window.firstRender = true;
  if(typeof component !== "function"){
    throw new Error("component must be a function")
  }

  const el = component();

  if (!(el instanceof BaseComponent)) {
    throw new Error("The return must be a Component must be a BaseComponent");
  }

  window.firstRender = false;

  root.appendChild(el.el);
}
