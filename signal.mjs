import { isStringNodeByTypeof } from "./utils.mjs";

let context = null;
let untrack = false;
let batching = false;
let batchContextStack = new Set();

const $$SignalType = Symbol("$$SignalType");
const $$SignalGetter = Symbol("$$SignalGetter");
const $$SignalSetter = Symbol("$$SignalSetter");

export function signal(value) {
  const subscriptions = new Set();
  let signalValue = value;

  const getState = () => {
    if (context && !untrack) subscriptions.add(context);

    return signalValue;
  };
  getState[$$SignalType] = $$SignalGetter;

  const runSubs = () =>
    subscriptions.forEach((sub) => {
      if (sub.dependencies === undefined) {
        sub.fn();
      } else if (sub.dependencies.includes(getState)) {
        sub.fn();
      }
    });

  const setState = (updated) => {
    if (typeof updated === "function") {
      signalValue = updated(signalValue);
    } else {
      signalValue = updated;
    }

    if (batching) {
      batchContextStack.add(runSubs);
      return;
    }

    if (!untrack) {
      runSubs();
    }
  };
  setState[$$SignalType] = "$$SignalSetter";

  return [getState, setState];
}

export function effect(fn) {
  context = { fn };
  fn();
  context = null;
}

export function effectOnDependencies(fn, deps = []) {
  context = { fn, dependencies: deps };
  fn();
  context = null;
}

export function untracked(fn) {
  untrack = true;
  fn();
  untrack = false;
}

export function peek(fn) {
  untrack = true;
  const result = fn();
  untrack = false;

  return result;
}

export const react = (fn) => {
  fn[$$SignalType] = $$SignalGetter;
  return fn;
};

export function computed(fn) {
  const [getState, setState] = signal();

  effect(() => {
    setState(fn());
  });

  return getState;
}

export function memo(fn) {
  const [getState, setState] = signal();

  effect(() => {
    const result = fn();
    const oldState = peek(getState);

    if (
      Array.isArray(result) &&
      Array.isArray(oldState) &&
      result.length === oldState.length
    ) {
      if (result === oldState) {
        return;
      }

      let hasChanges = false;
      for (let i = 0; i < result.length; i++) {
        if (result[i] !== oldState[i]) {
          hasChanges = true;
          break;
        }
      }

      if (hasChanges) {
        setState(result);
      }
    } else if (result !== oldState) {
      setState(result);
    }
  });

  return getState;
}

export function batch(fn) {
  batching = true;
  fn();
  batchContextStack.forEach((runSubs) => runSubs());
  batchContextStack = new Set();
  batching = false;
}

export function setPropertiesAndListenToSignals(cursor, key, prop) {
  const typeofProp = typeof prop;

  if (isStringNodeByTypeof(typeofProp)) {
    cursor[key] = prop;
    return;
  }

  if (typeofProp === "undefined" || prop === null) {
    return;
  }

  if (Array.isArray(prop)) {
    cursor[key] = prop;
  } else if (typeofProp === "object") {
    if (!cursor[key]) {
      cursor[key] = {};
    }

    Object.entries(prop).forEach(([k, v]) => {
      setPropertiesAndListenToSignals(cursor[key], k, v);
    });
  } else if (typeofProp === "function") {
    if (isCoySignal(prop)) {
      effect(() => {
        cursor[key] = prop();
      });
    } else {
      cursor[key] = prop;
    }
  }
}

export const isCoySignal = (fn) => {
  if (fn && fn[$$SignalType] === $$SignalGetter) {
    return true;
  }

  return false;
};

export const signalToObject = ([getter, setter]) => {
  return { get: getter, set: setter };
};
