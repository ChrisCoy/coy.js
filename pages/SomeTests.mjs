import { Div, Show } from "../components.mjs";
import { signal } from "../signal.mjs";

const maybeTrue = () => {
  if(Math.random() > 0.5) {
    return true;
  }

  return false;
}

const SomeTests = () => {
  const [maybe, setMaybe] = signal(maybeTrue());

  setInterval(() => {
    const maybeResult = maybeTrue();
    console.log({maybeResult});
    
    setMaybe(maybeResult)
  }, 1000);

  return Show({
    when: maybe,
    content: () => Div("True"),
    fallBack: () => "ou nao"
  })
};

export { SomeTests };
