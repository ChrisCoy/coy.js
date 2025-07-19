// export function createProvider(defaultValue) {
//   let contextValue = defaultValue;

//   const Provider = ({ value, children }) => {
//     if (value) {
//       contextValue = value;
//     }

//     return children;
//   };

//   const Context = () => {
//     return contextValue;
//   };

//   return {
//     Provider,
//     Context,
//   };
// }

// export function useContext(context) {
//   if (!context) {
//     throw new Error("You must pass a context");
//   } else if (!context.Context || !context.Provider) {
//     throw new Error("Context is not a valid context");
//   }

//   return context.Context();
// }

// const CounterProvider = createProvider({
//   value: {
//     count: () => this._value,
//     setCount(value) {
//       this._value = value;
//     },
//   },
// });

// const useCounter = () => useContext(CounterProvider);

// const { count, setCount } = useCounter();

// console.log("count", count());

// setCount(69);

// console.log("count", count());
