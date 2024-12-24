function props(props) {
  return new Props(props);
}

function Heading({ level }, ...args) {
  return new BaseComponent(`h${level}`, args);
}

function Br() {
  return new BaseComponent("br");
}

function Div(...args) {
  return new BaseComponent("div", args);
}

function Button(...args) {
  return new BaseComponent("button", args);
}

const Show = ({ when, child, fallBack }) => {};


/**
  Div(
    Show({
      when: observer(() => state() >= 10),
      child: Div(H1("texto lol")),
      fallBack: Div(H1("false")),
    });
  )
*/
