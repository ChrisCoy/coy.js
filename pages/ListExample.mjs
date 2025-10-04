import { Div, List, Show } from "../components.mjs";
import { react, signal } from "../signal.mjs";

const ListExample = () => {
  const [list, setList] = signal([
    { label: "example1" },
    { label: "example2" },
    { label: "example3" },
    { label: "example4" },
    { label: "example5" },
    { label: "example6" },
  ]);

  // setInterval(() => {
  //   setList((old) => [...old, { label: Math.random().toString() }]);
  // }, 200);

  // setInterval(() => {
  //   setList((old) => old.reverse());
  // }, 2000);

  return Show({
    when: react(() => true),
    content: List({
      data: list,
      render: (item) => Div(item().label),
      keyExtractor: (item) => item().label,
    }),
  });
};

export { ListExample };
