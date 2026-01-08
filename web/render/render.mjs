import {
  isCoySignal,
  memo,
  setPropertiesAndListenToSignals,
} from "../../signal.mjs";
import { $CoyComponent } from "../components/createCoyComponent.mjs";
import { deepEqual, isStringByTypeof } from "../utils/utils.mjs";

function render(entryPoint, component) {
  if (!entryPoint || !(entryPoint instanceof Element)) {
    throw new Error("EntryPoint must be a DOM node");
  }

  if (!component || !component[$CoyComponent]) {
    throw new Error("Component must be a Coy component");
  }

  iterateRecursive(entryPoint, component);
}

function iterateRecursive(father, coyElement) {
  const typeofCoyElement = typeof coyElement;

  if (isStringByTypeof(typeofCoyElement)) {
    father.appendChild(document.createTextNode(coyElement));
    return;
  }

  if (isCoySignal(coyElement)) {
    let element;
    memo((oldResult) => {
      const result = coyElement();
      const typeofResult = typeof result;

      if (typeofResult === undefined || result === null) {
        if (element) {
          father.removeChild(element);
          element = null;
        }
        return result;
      }

      if (isCoySignal(result)) {
        iterateRecursive(father, result);
        return result;
      }

      if (isStringByTypeof(typeofResult)) {
        if (!element) {
          element = document.createTextNode(result);
          father.appendChild(element);
        } else if (
          element.nodeType === Node.TEXT_NODE &&
          oldResult !== result
        ) {
          element.textContent = result;
        } else {
          const newElement = document.createTextNode(result);
          father.replaceChild(newElement, element);
          element = newElement;
        }

        return result;
      }

      if (result[$CoyComponent]) {
        Object.entries(result.props).forEach(([key, value]) => {
          setPropertiesAndListenToSignals(result.element, key, value);
        });

        if (!element) {
          father.appendChild(result.element);

          result.children.forEach((c) => {
            iterateRecursive(result.element, c);
          });
        } else if (oldResult !== result) {
          if (
            !oldResult.type == result.type ||
            !deepEqual(oldResult.children, result.children)
            // !deepEqual(oldResult.props, result.props)
          ) {
            father.replaceChild(result.element, element);

            result.children.forEach((c) => {
              iterateRecursive(result.element, c);
            });
          }
        }
        element = result.element;
        return result;
      }

      throw new Error("TODO: better error message");
    });
    return;
  }

  Object.entries(coyElement.props).forEach(([key, value]) => {
    setPropertiesAndListenToSignals(coyElement.element, key, value);
  });

  debugger
  if(coyElement.type === "Fragment"){
    depoisDouUmNomeMelhor(father, coyElement.children);
  } else {
    father.appendChild(coyElement.element)
    depoisDouUmNomeMelhor(coyElement.element, coyElement.children);
  }

}

function depoisDouUmNomeMelhor(father, children) {
  for (let i = 0; i < children.length; i++) {
    const child = children[i];

    father.appendChild(child.element);
    if (child.type === "Fragment") {
      child.children.forEach((c) => {
        iterateRecursive(father, c);
      });
    } else if (child[$CoyComponent]) {
      child.children.forEach((c) => {
        iterateRecursive(child.element, c);
      });
    } else {
      throw new Error("TODO BETTER ERROR");
    }
  }
}

export { render };
