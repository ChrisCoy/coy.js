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

// TODO: think about better names for this function
function iterateRecursive(father, coyElement) {
  const typeofCoyElement = typeof coyElement;

  if (isStringByTypeof(typeofCoyElement)) {
    father.appendChild(document.createTextNode(coyElement));
    return;
  }

  if (coyElement[$CoyComponent]) {
    if (coyElement.type === "Fragment") {
      coyElement.children.forEach((e) => {
        iterateRecursive(father, e);
      });
      return;
    } else {
      Object.entries(coyElement.props).forEach(([key, value]) => {
        setPropertiesAndListenToSignals(coyElement.element, key, value);
      });

      father.appendChild(coyElement.element);

      coyElement.children.forEach((e) => {
        iterateRecursive(coyElement.element, e);
      });
      return;
    }
  }

  if (isCoySignal(coyElement)) {
    let element;

    // TODO: refactor this ugly code
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
          if (result.type === "Fragment") {
            result.children.forEach((c) => {
              iterateRecursive(father, c);
            });
          } else {
            Object.entries(result.props).forEach(([key, value]) => {
              setPropertiesAndListenToSignals(result.element, key, value);
            });

            father.appendChild(result.element);

            result.children.forEach((c) => {
              iterateRecursive(result.element, c);
            });
          }

          element = result.element;
          return result;
        } else if (oldResult !== result) {
          // TODO: we need to check if the tree changed and then apply the difference,
          // somewhat similar to what react does
          if (
            !oldResult.type == result.type ||
            !deepEqual(oldResult.children, result.children)
          ) {
            if (result.type === "Fragment") {
              father.replaceChildren();
              result.children.forEach((c) => {
                iterateRecursive(father, c);
              });
            } else {
              Object.entries(result.props).forEach(([key, value]) => {
                setPropertiesAndListenToSignals(result.element, key, value);
              });

              father.replaceChild(result.element, element);
              result.children.forEach((c) => {
                iterateRecursive(result.element, c);
              });
            }

            element = result.element;
            return result;
          }
        }
      }

      return result;
    });
    return;
  }

  throw new Error("TODO: better error message");
}

export { render };
