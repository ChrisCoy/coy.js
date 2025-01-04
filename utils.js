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
  if (fn && fn[$$SignalType] === $$SignalGetter) {
    return true;
  }

  return false;
};

function isCoyComponent(component) {
  if (component instanceof BaseComponent) {
    return true;
  }
  return false;
}


const cn = (...args) => {
  if (typeof args[0] === "function") {
    return react(() => {
      const result = args[0]();

      return cn(result);
    });
  }

  return args.flat().filter(Boolean).join(" ");
};

const idGenerator = () => {
  let id = 1;
  return () => id++;
};

const signalToObject = ([getter, setter]) => {
  return { get: getter, set: setter, id: Math.ceil(Math.random() * 100) };
};

const swipeItemsOnArray = (array, from, to) => {
  const temp = array[from];
  array[from] = array[to];
  array[to] = temp;
};

function hash(obj) {
  const jsonString = JSON.stringify(obj);
  let hash = 0;
  for (let i = 0; i < jsonString.length; i++) {
    const char = jsonString.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0; // Convert to 32-bit integer
  }
  return hash;
}

const hasDuplicates = (arr) => new Set(arr).size !== arr.length;

function findDuplicates(arr) {
  const seen = new Set();
  const duplicates = new Set();

  for (const item of arr) {
      if (seen.has(item)) {
          duplicates.add(item);
      } else {
          seen.add(item);
      }
  }

  return Array.from(duplicates);
}


function populateNodesDOM(node) {
  for (let i = 0; i < node.children.length; i++) {
    const component = node.children[i];

    if (node.tag === "fragment") {
      component.parent = node.parent;
    } else {
      component.parent = node;
    }

    node.appendChild(component, false);

    if (component.children.length > 0) {
      populateNodesDOM(component);
    }
  }
}
