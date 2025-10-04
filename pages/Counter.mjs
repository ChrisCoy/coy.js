import { Button, Div, H1 } from "../components.mjs";
import { signal } from "../signal.mjs";

const Counter = () => {
  const [count, setCount] = signal(0);

  const buttonClassName = "px-4 py-2 text-xl border-2 rounded flex hover:bg-zinc-50 active:bg-zinc-200";

  return Div(
    { className: "flex flex-col text-center gap-2 justify-center " },
    H1(count, { className: "text-6xl font-bold" }),
    Div(
      {className: "flex gap-2 justify-center"},
      Button("➕", {
        className: buttonClassName,
        onclick: () => setCount((prev) => prev + 1),
      }),
      Button("➖", {
        className: buttonClassName,
        onclick: () => setCount((prev) => prev - 1),
      })
    )
  );
};

export { Counter };
