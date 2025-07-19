import { Div, Fragment } from "../components.mjs";
import { Counter } from "./Counter.mjs";
import { TodoPage } from "./TodoPage.mjs";
// import { Counter } from "./Counter.mjs";

export const FragmentTest = () => {
  return Fragment(
    Fragment(Div("teste", Fragment(Div("inside"), Counter()))),
    Div("after"),
    TodoPage()
  );
};
