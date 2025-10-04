import { Button, Div, H1, Hr, Input, ListView } from "../components.mjs";
import { effect, react, signal } from "../signal.mjs";
import { ToastProviderGlobal, useToast } from "../toast.mjs";
import { cn, idGenerator } from "../utils.mjs";
import {styled} from "../styled.mjs"

const genId = idGenerator();

const Layout = (child) => {
  return Div(
    {
      className: "min-h-screen w-full grid place-items-center bg-zinc-100 p-4",
    },
    ToastProviderGlobal(),
    child
  );
};

const TodoItem = ({ todoSignal, onDone, onRemove }) => {
  console.log("look how this log only runs once for each item", todoSignal());

  return Div(
    {
      className: cn(() => [
        "flex justify-between gap-4 items-center p-2 w-full mb-1",
        todoSignal().done && "bg-red-100",
      ]),
    },
    Div(
      {
        className: cn(() => [todoSignal().done && "line-through"]),
      },
      react(() => todoSignal().name)
    ),
    Div(
      Button(
        {
          onclick: onDone,
          className: cn(() => [
            "h-10 px-3 rounded font-bold text-1xl transition",
            todoSignal().done && "hover:bg-red-50 bg-red-200",
            !todoSignal().done && "hover:bg-green-50 bg-green-100",
          ]),
        },
        react(() => (todoSignal().done ? "❌" : "✅"))
      ),
      Button(
        {
          onclick: onRemove,
          className: cn(
            "ml-4 h-10 px-3 rounded font-bold text-1xl transition",
            "hover:bg-red-50 bg-red-200"
          ),
        },
        "🗑️"
      )
    )
  );
};

export const TodoPage = () => {
  const toast = useToast();
  const [inputText, setInputText] = signal("");
  const [todos, setTodos] = signal([
    { id: genId(), name: "Refactor this library", done: false },
    { id: genId(), name: "Implement new feature", done: true },
    { id: genId(), name: "Fix bugs", done: false },
    { id: genId(), name: "Write tests", done: true },
  ]);
  const [containerRef, setContainerRef] = signal(null);

  effect(() => {
    console.log("ref", containerRef());
  });

  const handleTodoToggle = (id) => {
    setTodos((t) =>
      t.map((t) => {
        if (t.id === id) t.done = !t.done;

        return t;
      })
    );
  };

  const handleRemoveTodo = (id) => {
    setTodos(todos().filter((t) => t.id !== id));
  };

  const handleAddTodo = () => {
    if (inputText().length === 0) {
      toast("you cannot create a empty todo!");
      return;
    }
    setTodos([...todos(), { id: genId(), name: inputText(), done: false }]);
    setInputText("");
  };

  return Layout(
    Div(
      {
        className:
          "flex flex-col gap-4 border p-4 bg-white rounded max-w-[600px] w-full",
        ref: setContainerRef,
      },
      H1({ className: "text-lg font-bold" }, "Todo App"),
      Hr(),
      ListView({
        data: todos,
        keyExtractor: (todo) => todo().id,
        render: (todo) =>
          TodoItem({
            todoSignal: todo,
            onDone: () => handleTodoToggle(todo().id),
            onRemove: () => handleRemoveTodo(todo().id),
          }),
        empty: Div({ className: "text-center" }, "Nenhuma todo cadastrada."),
      }),
      Hr(),
      Div(
        { className: "flex gap-4 max-sm:flex-col" },
        Input({
          placeholder: "Your next incredible task",
          oninput: (e) => setInputText(e.target.value),
          value: inputText,
          className: "h-10 px-2 bg-zinc-100 w-full",
        }),
        Button(
          {
            className:
              "h-10 px-4 rounded bg-green-500 text-white hover:bg-green-400 transition",
            onclick: handleAddTodo,
          },
          "create"
        ),
        Button(
          {
            className:
              "h-10 px-4 rounded bg-blue-500 text-white hover:bg-blue-400 transition text-nowrap",
            onclick: () => {
              setTodos((t) => t.reverse());
            },
          },
          "invert"
        ),
        Button(
          {
            className:
              "h-10 px-4 rounded bg-orange-500 text-white hover:bg-orange-400 transition text-nowrap",
            onclick: () => {
              setTodos((t) => t.map((td) => ({ ...td, done: !td.done })));
            },
          },
          "toggle all"
        )
      )
    )
  );
};
