import { Div, Fragment, props } from "../components.mjs";
import { Counter } from "./Counter.mjs";
// import { Counter } from "./Counter.mjs";

export const FragmentTest = () => {
  return Fragment(
    props({ name: "Fragment=Container" }),
    Fragment(
      props({ name: "Fragment=Inside" }),
      Div(
        "Fragment Test",
        Fragment(
          props({ name: "Fragment=SooDeepStepBro" }),
          Div("inside"),
          Counter()
        )
      )
    ),
    Div("after")
  );
};
