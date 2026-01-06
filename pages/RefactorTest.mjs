import { Div, Fragment } from "../components.mjs";
import { effect, memo, react, signal } from "../signal.mjs";

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
      0: Div("Zero"),
      1: Div("One"),
      2: Div("Two"),
      3: Div("Three"),
    };
    return memo(() => map[count()] || Div("Many"));
  };


  return Div("Count: ", Comp(), {ref: console.log});
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
  return Componente();
};

export { RefactorTest };
