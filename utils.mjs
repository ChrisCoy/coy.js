// const logProxy = (sourceName, initialState) => {
//   return new Proxy(initialState, {
//     get(target, prop) {
//       console.log(`${sourceName}.${prop} = ${target[prop]}`);
//       return target[prop];
//     },
//     set(target, prop, value) {
//       console.log(`${sourceName}.${prop} = ${value}`);
//       target[prop] = value;
//       return true;
//     },
//   });
// };

import { react } from "./signal.mjs";

export const isStringNodeByTypeof = (type) => {
  if (type === "string" || type === "number" || type === "boolean") {
    return true;
  }

  return false;
};

export const cn = (...args) => {
  if (typeof args[0] === "function") {
    return react(() => {
      const result = args[0]();

      return cn(result);
    });
  }

  return args.flat().filter(Boolean).join(" ");
};

export const idGenerator = () => {
  let id = 1;
  return () => id++;
};

export const swipeItemsOnArray = (array, from, to) => {
  const temp = array[from];
  array[from] = array[to];
  array[to] = temp;
};

// export function hash(obj) {
//   const jsonString = JSON.stringify(obj);
//   let hash = 0;
//   for (let i = 0; i < jsonString.length; i++) {
//     const char = jsonString.charCodeAt(i);
//     hash = (hash << 5) - hash + char;
//     hash |= 0; // Convert to 32-bit integer
//   }
//   return hash;
// }

export const hasDuplicates = (arr) => new Set(arr).size !== arr.length;

export function findDuplicates(arr) {
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

export function createRandomString(length = 8) {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}