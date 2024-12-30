let context = null;

function signal(value) {
  const subscriptions = new Set();

  const runSubs = () => subscriptions.forEach((fn) => fn());

  const getState = () => {
    if (context) subscriptions.add(context);

    return value;
  };
  getState[$$SignalType] = $$SignalGetter;

  const setState = (updated) => {
    value = updated;
    runSubs();
  };
  setState[$$SignalType] = "$$SignalSetter";

  return [getState, setState];
}

function effect(fn) {
  context = fn;
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
