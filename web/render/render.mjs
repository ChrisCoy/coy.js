import {
  batch,
  effectOnDependencies,
  react,
  setPropertiesAndListenToSignals,
  signal,
  signalToObject,
} from "../../signal.mjs";
import { $CoyComponent } from "../components/createCoyComponent.mjs";
import {
  findDuplicates,
  hasDuplicates,
  isStringByTypeof,
  swipeItemsOnArray,
} from "../utils/utils.mjs";

function render(entryPoint, component) {
  if (!entryPoint || !(entryPoint instanceof Element)) {
    throw new Error("EntryPoint must be a DOM node");
  }

  console.log(component);

  // if (!component || !component[$CoyComponent]) {
  //   throw new Error("Component must be a Coy component");

  // }
  iterateRecursive(entryPoint, component);
}

function coyAppendNode(father, newNode) {
  if (father.nodeType === Node.TEXT_NODE) {
    father.after(newNode);
  } else {
    father.append(newNode);
  }
}

// TODO: think about better names for this function
function iterateRecursive(father, coyElement) {
  const typeofCoyElement = typeof coyElement;

  if (isStringByTypeof(typeofCoyElement)) {
    const newElement = document.createTextNode(coyElement);
    coyAppendNode(father, newElement);
    return newElement;
  }

  if (coyElement[$CoyComponent]) {
    if (coyElement.type === "$CoyFragment") {
      handleFragmentNode(father, coyElement);
    } else if (coyElement.type === "$CoyList") {
      handleListNode(father, coyElement);
    } else if (coyElement.type === "$CoyShow") {
      handleShowNode(father, coyElement);
    } else {
      handleHTMLNode(father, coyElement);
    }
  }

  return coyElement;

  // if (isCoySignal(coyElement)) {
  //   let element;

  //   // TODO: refactor this ugly code
  //   // a signal node must re-render even if the data didn't changed, this way we
  //   // can simplify this piece of code
  //   effectOnDependencies((oldResult) => {
  //     const result = coyElement();
  //     const typeofResult = typeof result;

  //     if (result === undefined || result === null) {
  //       if (element) {
  //         father.removeChild(element);
  //         element = null;
  //       }
  //       return result;
  //     }

  //     if (isCoySignal(result)) {
  //       iterateRecursive(father, result);
  //       return result;
  //     }

  //     if (isStringByTypeof(typeofResult)) {
  //       if (!element) {
  //         element = document.createTextNode(result);
  //         father.appendChild(element);
  //       } else if (
  //         element.nodeType === Node.TEXT_NODE &&
  //         oldResult !== result
  //       ) {
  //         element.textContent = result;
  //       } else {
  //         const newElement = document.createTextNode(result);
  //         father.replaceChild(newElement, element);
  //         element = newElement;
  //       }

  //       return result;
  //     }

  //     if (result && result[$CoyComponent]) {
  //       if (!element) {
  //         if (result.type === "Fragment") {
  //           handleFragmentNode(father, result);
  //           // result.children.forEach((c) => {
  //           //   iterateRecursive(father, c);
  //           // });
  //         } else if (result.type === "List") {
  //           handleListNode(father, result);
  //         } else {
  //           handleHTMLNode(father, result);
  //           // Object.entries(result.props).forEach(([key, value]) => {
  //           //   setPropertiesAndListenToSignals(result.element, key, value);
  //           // });

  //           // father.appendChild(result.element);

  //           // result.children.forEach((c) => {
  //           //   iterateRecursive(result.element, c);
  //           // });
  //         }

  //         element = result.element;
  //         return result;
  //       } else if (oldResult !== result) {
  //         // TODO: we need to check if the tree changed and then apply the difference,
  //         // somewhat similar to what react does
  //         if (
  //           !oldResult.type == result.type ||
  //           !deepEqual(oldResult.children, result.children)
  //         ) {
  //           if (result.type === "Fragment") {
  //             father.replaceChildren();
  //             result.children.forEach((c) => {
  //               iterateRecursive(father, c);
  //             });
  //           } else {
  //             Object.entries(result.props).forEach(([key, value]) => {
  //               setPropertiesAndListenToSignals(result.element, key, value);
  //             });

  //             father.replaceChild(result.element, element);
  //             result.children.forEach((c) => {
  //               iterateRecursive(result.element, c);
  //             });
  //           }

  //           element = result.element;
  //           return result;
  //         }
  //       }
  //     }

  //     return result;
  //   }, [coyElement]);
  //   return;
  // }

  throw new Error("TODO: better error message");
}

function handleShowNode(father, coyElement) {
  /** @type {any} */
  let createdHtmlElement;
  console.log(coyElement);

  effectOnDependencies(() => {
    const resultWhen = coyElement.props.when();

    console.log("resultWhen", resultWhen);

    if (createdHtmlElement && createdHtmlElement[$CoyComponent]) {
      createdHtmlElement.element.remove();
    } else if (createdHtmlElement) {
      createdHtmlElement.remove();
    }

    if (resultWhen && coyElement.props.content) {
      // createdHtmlElement = coyElement.props.content();
      createdHtmlElement = iterateRecursive(father, coyElement.props.content());
    } else {
      createdHtmlElement = iterateRecursive(
        father,
        coyElement.props.fallBack(),
      );
      // createdHtmlElement = coyElement.props.fallBack();
    }
  }, [coyElement.props.when]);
}

function handleHTMLNode(father, coyElement) {
  Object.entries(coyElement.props).forEach(([key, value]) => {
    setPropertiesAndListenToSignals(coyElement.element, key, value);
  });

  // father.appendChild(coyElement.element);
  coyAppendNode(father, coyElement.element);

  coyElement.children.forEach((e) => {
    iterateRecursive(coyElement.element, e);
  });
}

function handleFragmentNode(father, coyElement) {
  coyElement.children.forEach((e) => {
    iterateRecursive(father, e);
  });
}

function handleListNode(father, coyElement) {
  console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$");
  console.log(coyElement);
  console.log({ father });

  let children = [];

  const signals = [];
  let keys = [];

  effectOnDependencies(() => {
    const result = coyElement.props.data() || [];
    if (!Array.isArray(result)) {
      throw new Error(
        "Data property on List must be an array or a signal that returns an Array",
      );
    }

    const newKeys =
      result.map((r) => coyElement.props.keyExtractor(react(() => r))) || [];

    if (hasDuplicates(newKeys)) {
      const duplicates = findDuplicates(newKeys)
        .map((k) => `key: ${k}`)
        .join(", ");
      throw new Error(
        `Has some non unique key, ${duplicates}, please use unique values`,
      );
    }

    const permutationsIndexes = [];

    // check for removed items
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      if (!newKeys.includes(key)) {
        signals.splice(i, 1);
        keys.splice(i, 1);

        children[i].element.remove();

        i = i - 1;
      }
    }

    batch(() => {
      for (let i = 0; i < newKeys.length; i++) {
        const key = newKeys[i];
        const oldKeyIndex = keys.findIndex((k) => k === key);

        if (oldKeyIndex === i) {
          // when node stills in the same place
          // we have to run the signal again because the data may have change.
          signals[i].set(result[i]);
        } else if (oldKeyIndex === -1) {
          // when node is new
          // @ts-ignore
          signals.splice(i, 0, signalToObject(signal(result[i])));

          // const component = createElement(render(signals[i].get));
          // const component = createElement(render(memo(signals[i].get)));

          const component = coyElement.props.render(signals[i].get);
          // component.parent = container.parent;
          // component.renderChildren();

          iterateRecursive(father, component);

          children[i] = component;

          // console.log(component);

          // container.appendChild(component, true);
          // container.children.push(component);

          // component.parent = container.parent;

          // populateNodesDOM(component);
        } else if (
          !permutationsIndexes.includes(oldKeyIndex) ||
          !permutationsIndexes.includes(i)
        ) {
          // when node changed it's place
          swipeItemsOnArray(signals, oldKeyIndex, i);
          swipeItemsOnArray(children, oldKeyIndex, i);
          // if (container.parent) {
          //   container.swapChildPlaces(oldKeyIndex, i);
          // }

          swapNodes(children[i], children[oldKeyIndex]);

          // run signals again because the data may have changed
          signals[i].set(result[i]);
          signals[oldKeyIndex].set(result[oldKeyIndex]);
          permutationsIndexes.push(oldKeyIndex, i);
        }
      }
    });

    keys = newKeys;
  }, [coyElement.props.data]);
}

function handleTextNode(father, content) {}

function swapNodes(origin, target) {
  if (
    (target[$CoyComponent] && !(target.element instanceof Node)) ||
    (target[$CoyComponent] && !(target.element instanceof Node))
  ) {
    throw new TypeError("swapNodes(a, b): a e b precisam ser Nodes do DOM");
  }

  if (origin.element === target.element) return;

  const aParent = origin.element.parentNode,
    bParent = target.element.parentNode;
  if (!aParent || !bParent)
    throw new Error("Ambos os nós precisam estar no DOM");

  const aNext = origin.element.nextSibling;
  const bNext = target.element.nextSibling;

  const ph = document.createTextNode("");
  aParent.insertBefore(ph, origin.element);

  bParent.insertBefore(origin.element, bNext);
  aParent.insertBefore(target.element, aNext);

  ph.remove();
}

export { render };
