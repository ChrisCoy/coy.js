// import { BaseComponent } from "./baseComponent.mjs";
// import { effect, isCoySignal } from "./signal.mjs";
// import { isStringNodeByTypeof } from "./utils.mjs";

// export function createElement(child) {
//   const typeofChild = typeof child;

//   if (typeofChild === "function") {
//     let result = child();
//     /** @type {BaseComponent} */
//     const element = createElement(result);

//     if (isCoySignal(child)) {
//       effect(() => {
//         // TODO: MAKE THIS BE ABLE TO RETURN COMPONENTS
//         // element.replaceChildren(child());
//         // in order to replace the old children with the new one, we need to make the diff, changing
//         // element.replaceChild
//         element.element.textContent = child();
//       });
//     }

//     return element;
//   }

//   if (child instanceof BaseComponent) {
//     return child;
//   }

//   if (isStringNodeByTypeof(typeofChild)) {
//     const el = new BaseComponent("text", [child]);
//     return el;
//   }

//   throw new Error(`invalid element, ${child} of type: ${typeofChild}`);
// }
