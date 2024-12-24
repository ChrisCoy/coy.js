var logProxy = (sourceName, initialState) => {
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

var isStringNodeByTypeof = (type) =>
  ["string", "number", "boolean"].includes(type);

var isStringNode = (node) =>
  ["string", "number", "boolean"].includes(typeof node);
