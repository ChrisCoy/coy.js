const logProxy = (sourceName, initialState) => {
  return new Proxy(initialState, {
    get(target, prop) {
      console.log(`${sourceName}.${prop} = ${target[prop]}`);
      return target[prop];
    },
    set(target, prop, value) {
      console.log(`${sourceName}.${prop} = ${value}`);
      target[prop] = value;
      return true;
    },
  });
};

const isStringNodeByTypeof = (type) => {
  if (type === "string" || type === "number" || type === "boolean") {
    return true;
  }

  return false;
};

const $$SignalType = Symbol("$$SignalType");
const $$SignalGetter = Symbol("$$SignalGetter");
const $$SignalSetter = Symbol("$$SignalSetter");

const isCoySignal = (fn) => {
  if (fn[$$SignalType] === $$SignalGetter) {
    return true;
  }

  return false;
};

const cn = (...args) => {
  if (typeof args[0] === "function") {
    return computed(() => {
      const result = args[0]();

      return cn(result);
    });
  }

  return args.flat().filter(Boolean).join(" ");
};

const genIdd = (function () {
  this.id = 1;
  return () => this.id++;
})();

const genId = (() => {
  let id = 1;
  return () => id++;
})();
