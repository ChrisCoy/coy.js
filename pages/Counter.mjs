import { Button, Div, props } from "../components.mjs";
import { signal } from "../signal.mjs";

const Counter = () => {
  const [count, setCount] = signal(0);

  return Div(
    count,
    Button("+", props({ onclick: () => setCount((prev) => prev + 1) })),
    Button("-", props({ onclick: () => setCount((prev) => prev - 1) }))
  );
};

export { Counter };
