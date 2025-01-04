// TODO: remove this function from here and put it on a proper place

function createElement(child) {
  const typeofChild = typeof child;

  if (typeofChild === "function") {
    let result = child();
    const element = createElement(result);

    if (isCoySignal(child)) {
      effect(() => {
        // TODO: MAKE THIS BE ABLE TO RETURN COMPONENTS
        // element.replaceChildren(child());
        element.element.textContent = child();
      });
    }

    return element;
  }

  if (child instanceof BaseComponent) {
    return child;
  }

  if (isStringNodeByTypeof(typeofChild)) {
    return new BaseComponent("text", [child]);
  }

  if (child === undefined || child === null) {
    return new BaseComponent("void");
  }

  throw new Error(`invalid element, ${child} of type: ${typeofChild}`);
}
