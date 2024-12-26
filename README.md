# Coy.Js

Coy.Js is a simple front-end library for building reactive UI components. Below is a guide on how to use it.

## Getting Started

### Installation

Include the following scripts in your HTML file:

```html
<script src="./signal.js"></script>
<script src="./utils.js"></script>
<script src="./coy.js"></script>
<script src="./components.js"></script>
<script src="./bootstrap.js"></script>
```

### Basic Usage

Create a root element in your HTML file:

```html
<div id="app"></div>
```

### Define Components

Define your components using the provided functions and classes. Here is an example of a simple Todo App:

```javascript
const Layout = (child) => {
  return Div(
    $props({
      className: "min-h-screen w-full grid place-items-center bg-zinc-100 p-4",
    }),
    child
  );
};

const TodoItem = ({ todoSignal, onDone, onRemove }) => {
  return Div(
    $props({
      className: cn(() => [
        "flex justify-between gap-4 items-center p-2 w-full mb-1",
        todoSignal().done && "bg-red-100",
      ]),
    }),
    Div(
      $props({
        className: cn(() => [todoSignal().done && "line-through"]),
      }),
      todoSignal().name
    ),
    Div(
      Button(
        $props({
          onclick: onDone,
          className: cn(
            "h-10 px-3 rounded font-bold text-1xl transition",
            todoSignal().done && "hover:bg-red-50 bg-red-200",
            !todoSignal().done && "hover:bg-green-50 bg-green-100"
          ),
        }),
        todoSignal().done ? "❌" : "✅"
      ),
      Button(
        $props({
          onclick: onRemove,
          className: cn(
            "ml-4 h-10 px-3 rounded font-bold text-1xl transition",
            "hover:bg-red-50 bg-red-200"
          ),
        }),
        "🗑️"
      )
    )
  );
};

const TodoApp = () => {
  const [inputText, setInputText] = signal("");
  const [todos, setTodos] = signal([
    { id: genId(), name: "build a front-end lib", done: true },
  ]);

  const handleTodoToggle = (id) => {
    setTodos(
      todos().map((t) => {
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
      alert("you cannot create an empty todo!");
      return;
    }
    setTodos([
      ...todos(),
      { id: genId(), name: inputText(), done: false },
    ]);
    setInputText("");
  };

  return Layout(
    Div(
      $props({
        className: "flex flex-col gap-4 border p-4 bg-white rounded max-w-[600px] w-full",
      }),
      H1($props({ className: "text-lg font-bold" }), "Todo App"),
      Hr(),
      Show({
        when: react(() => todos().length > 0),
        content: Div(
          $props({ className: "max-h-[300px] overflow-auto" }),
          List({
            data: todos,
            render: (todo) =>
              TodoItem({
                todoSignal: todo,
                onDone: () => handleTodoToggle(todo().id),
                onRemove: () => handleRemoveTodo(todo().id),
              }),
          })
        ),
        fallBack: Div(
          $props({ className: "text-center" }),
          "No todos available."
        ),
      }),
      Hr(),
      Div(
        $props({ className: "flex gap-4" }),
        Input(
          $props({
            placeholder: "Your next incredible task",
            oninput: (e) => setInputText(e.target.value),
            value: inputText,
            className: "h-10 px-2 bg-zinc-100 w-full",
          })
        ),
        Button(
          $props({
            className: "h-10 px-4 rounded bg-green-500 text-white hover:bg-green-400 transition",
            onclick: handleAddTodo,
          }),
          "Add"
        )
      )
    )
  );
};
```

### Bootstrap the Application

Finally, bootstrap your application by calling the `bootstrap` function:

```javascript
bootstrap(document.getElementById('app'), TodoApp);
```

## TODOs

- [ ] Implement FRAGMENTS
- [ ] Improve error messages for incorrect signal usage
- [ ] Publish the package on npm
- [ ] Migrate to typescript
- [ ] Implement an utility for creating components like styled components
- [ ] Create a lib like react query

## License

This project is licensed under the MIT License.
