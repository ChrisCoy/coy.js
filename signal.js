let context = null;

var teste = "algum valor lol";

window.$$_stack = []

function signal(value) {
  const subscriptions = new Set();

  const runSubs = () => subscriptions.forEach((fn) => fn());

  const getState = () => {
    if (context) subscriptions.add(context);

    window.$$_stack.push(() => value);

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
const text = computed;
const react = computed;

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