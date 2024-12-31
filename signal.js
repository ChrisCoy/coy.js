let context = null;

let genSignalId = idGenerator();

function signal(value) {
  const subscriptions = new Set();

  const getState = () => {
    if (context) subscriptions.add(context);
    update();
    return value;
  };
  getState[$$SignalType] = $$SignalGetter;

  const update = () => {
    getState.value = value;
  };

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
      value = updated(value);
    } else {
      value = updated;
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
