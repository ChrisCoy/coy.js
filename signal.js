let context = null;
let untrack = false;
let batching = false;
let batchContextStack = new Set();

function signal(value) {
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

    runSubs();
  };
  setState[$$SignalType] = "$$SignalSetter";

  return [getState, setState];
}

function effect(fn) {
  context = { fn };
  fn();
  context = null;
}

function effectOnDependencies(fn, deps = []) {
  context = { fn, dependencies: deps };
  fn();
  context = null;
}

function untracked(fn) {
  untrack = true;
  const result = fn();
  untrack = false;

  return result;
}

const peek = untrack;

function computed(fn) {
  const [getState, setState] = signal();

  effect(() => {
    setState(fn());
  });

  return getState;
}

const react = (fn) => {
  fn[$$SignalType] = $$SignalGetter;
  return fn;
};
const text = react;

function memo(fn) {
  const [getState, setState] = signal();

  effect(() => {
    const result = fn();
    if (result !== getState()) {
      setState(result);
    }
  });

  return getState;
}

function batch(fn) {
  batching = true;
  fn();
  batchContextStack.forEach((runSubs) => runSubs());
  batchContextStack = new Set();
  batching = false;
}
