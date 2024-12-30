// TODO: LIST COMPONENT

const $props = (props) => new Props(props);

const H1 = (...args) => new BaseComponent("h1", args);
const H2 = (...args) => new BaseComponent("h2", args);
const H3 = (...args) => new BaseComponent("h3", args);
const H4 = (...args) => new BaseComponent("h4", args);
const H5 = (...args) => new BaseComponent("h5", args);
const H6 = (...args) => new BaseComponent("h6", args);
const Hr = (...args) => new BaseComponent("hr", args);
const Br = () => new BaseComponent("br");
const Div = (...args) => new BaseComponent("div", args);
const Button = (...args) => new BaseComponent("button", args);
const Input = (...args) => new BaseComponent("input", args);

// TODO: BETTER APPROACH
const Show = ({ when, content = "", fallBack }) => {
  let lastState = null;

  if (isCoySignal(when)) {
    const fragment = new BaseComponent("div");

    effect(() => {
      const result = when();
      if (result !== lastState) {
        const component = fragment.createElement(!!result ? content : fallBack);
        if (component) {
          fragment.replaceChildren(component);
        } else {
          fragment.replaceChildren();
        }
        lastState = result;
      }
    });

    return fragment;
  } else {
    return !!when ? content : fallBack;
  }
};

const List = ({ data, render, keyExtractor }) => {
  if (!keyExtractor) {
    throw new Error("you must pass the key keyExtractor function");
  }

  if (isCoySignal(data)) {
    const fragment = new BaseComponent("div");
    const signals = [];
    let keys = [];
    let toUpdateSignalsKeys = [];

    // we cannot create a signal within an effect and call it there, because it'll
    // cause infinite call to the effect. To avoid this we need to create the
    // signals in an effect and call it on another one.
    effect(() => {
      const permutationsIndexes = [];
      const result = data() || [];

      const newKeys = result.map((r) => keyExtractor(react(() => r))) || [];

      for (let i = 0; i < keys.length; i++) {
        if (!newKeys.includes(keys[i])) {
          toUpdateSignalsKeys.splice(i, 1);
        }
      }

      for (let i = 0; i < newKeys.length; i++) {
        const oldKeyIndex = toUpdateSignalsKeys.findIndex(
          (k) => k === newKeys[i]
        );

        if (oldKeyIndex === i) {
          // when node do not change its position
          signals[i].set(result[i]);
        } else if (oldKeyIndex === -1) {
          // when node is new
          continue;
        } else if (
          !permutationsIndexes.includes(oldKeyIndex) ||
          !permutationsIndexes.includes(i)
        ) {
          // case the object change its position
          // we run the signals again to update just in case the result had change
          signals[i].set(result[i]);
          signals[oldKeyIndex].set(result[oldKeyIndex]);
        }
      }

      toUpdateSignalsKeys = newKeys;
    });

    effect(() => {
      const permutationsIndexes = [];
      const result = data() || [];

      const newKeys = result.map((r) => keyExtractor(react(() => r))) || [];

      // check for removed items
      for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        if (!newKeys.includes(key)) {
          signals.splice(i, 1);
          keys.splice(i, 1);
          fragment.removeChildAt(i);
        }
      }

      for (let i = 0; i < newKeys.length; i++) {
        const key = newKeys[i];
        const oldKeyIndex = keys.findIndex((k) => k === key);

        // when node do not change its position
        if (oldKeyIndex === i) {
          continue;
        }

        // when node is new
        if (oldKeyIndex === -1) {
          signals.splice(i, 0, signalToObject(signal(result[i])));

          // here that shit happens
          const component = fragment.createElement(render(signals[i].get));
          fragment.appendChild(component);

          continue;
        }

        // case the object change its position
        if (
          !permutationsIndexes.includes(oldKeyIndex) ||
          !permutationsIndexes.includes(i)
        ) {
          swipeItemsOnArray(signals, oldKeyIndex, i);
          fragment.swapChild(oldKeyIndex, i);

          permutationsIndexes.push(oldKeyIndex, i);
        }
      }

      keys = newKeys;
    });

    return fragment;
  } else {
    return data.map((d) => render(d));
  }
};
