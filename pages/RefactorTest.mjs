import { Div, Fragment } from "../components.mjs";
import { memo, signal } from "../signal.mjs";

const Inside = (texto) => {
  return Div(texto);
};

const Dynamic = () => {
  const [count, setCount] = signal(0);

  setInterval(() => {
    setCount((c) => c + 1);
  }, 1000);

  const Comp = () => {
    const map = {
      0: Div("Zero", { id: Math.random() }),
      1: Div("One", { id: Math.random() }),
      2: Div("Two", { id: Math.random() }),
      3: Div("Three", { id: Math.random() }),
    };
    return memo(() => map[count()] || Div("Many", { id: count }));
  };

  return Div("Count: ", Comp(), { ref: console.log });
};

const OutroComponent = (texto) => {
  const [text, setText] = signal(Math.random().toString(36));

  setInterval(() => {
    setText(Math.random().toString(36));
  }, 1000);

  return Fragment(Div(texto), Inside(text), Dynamic());
};

const Componente = () => {
  return OutroComponent("teste 42");
};

const RefactorTest = () => {
  // return Componente();
  debugger
  return Div("Texto", { id: "refactor-test" });
};

export { RefactorTest };
