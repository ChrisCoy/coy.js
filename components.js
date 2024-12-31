// TODO: remove this function from here and put it on a proper place
function createElement(child) {
  const typeofChild = typeof child;

  if (typeofChild === "function") {
    let result = child();
    const element = createElement(result);

    if (isCoySignal(child)) {
      effect(() => {
        // TODO: MAKE THIS BE ABLE TO RETURN COMPONENTS
        element.textContent = child();
      });
    }

    return element;
  }

  if (child instanceof BaseComponent) {
    return {
      node: child.el,
      raw: child,
    };
  }

  if (isStringNodeByTypeof(typeofChild)) {
    return {
      node: document.createTextNode(child + ""),
      raw: child,
    };
  }

  throw new Error(`invalid element, ${child} of type: ${typeofChild}`);
}

const props = (p) => new Props(p);

/* prettier-ignore */
const Lazy = (fn) => (...args) => fn.apply(null, args);

const H1 = Lazy((...args) => new BaseComponent("h1", args));
const H2 = Lazy((...args) => new BaseComponent("h2", args));
const H3 = Lazy((...args) => new BaseComponent("h3", args));
const H4 = Lazy((...args) => new BaseComponent("h4", args));
const H5 = Lazy((...args) => new BaseComponent("h5", args));
const H6 = Lazy((...args) => new BaseComponent("h6", args));
const Hr = Lazy((...args) => new BaseComponent("hr", args));
const Br = Lazy((...args) => new BaseComponent("br", args));
const Div = Lazy((...args) => new BaseComponent("div", args));
const Button = Lazy((...args) => new BaseComponent("button", args));
const Input = Lazy((...args) => new BaseComponent("input", args));
const A = Lazy((...args) => new BaseComponent("a", args));
const Abbr = Lazy((...args) => new BaseComponent("abbr", args));
const Address = Lazy((...args) => new BaseComponent("address", args));
const Area = Lazy((...args) => new BaseComponent("area", args));
const Article = Lazy((...args) => new BaseComponent("article", args));
const Aside = Lazy((...args) => new BaseComponent("aside", args));
const Audio = Lazy((...args) => new BaseComponent("audio", args));
const B = Lazy((...args) => new BaseComponent("b", args));
const Base = Lazy((...args) => new BaseComponent("base", args));
const Bdi = Lazy((...args) => new BaseComponent("bdi", args));
const Bdo = Lazy((...args) => new BaseComponent("bdo", args));
const Blockquote = Lazy((...args) => new BaseComponent("blockquote", args));
const Body = Lazy((...args) => new BaseComponent("body", args));
const Canvas = Lazy((...args) => new BaseComponent("canvas", args));
const Caption = Lazy((...args) => new BaseComponent("caption", args));
const Cite = Lazy((...args) => new BaseComponent("cite", args));
const Code = Lazy((...args) => new BaseComponent("code", args));
const Col = Lazy((...args) => new BaseComponent("col", args));
const Colgroup = Lazy((...args) => new BaseComponent("colgroup", args));
const Data = Lazy((...args) => new BaseComponent("data", args));
const Datalist = Lazy((...args) => new BaseComponent("datalist", args));
const Dd = Lazy((...args) => new BaseComponent("dd", args));
const Del = Lazy((...args) => new BaseComponent("del", args));
const Details = Lazy((...args) => new BaseComponent("details", args));
const Dfn = Lazy((...args) => new BaseComponent("dfn", args));
const Dialog = Lazy((...args) => new BaseComponent("dialog", args));
const Dl = Lazy((...args) => new BaseComponent("dl", args));
const Dt = Lazy((...args) => new BaseComponent("dt", args));
const Em = Lazy((...args) => new BaseComponent("em", args));
const Embed = Lazy((...args) => new BaseComponent("embed", args));
const Fieldset = Lazy((...args) => new BaseComponent("fieldset", args));
const Figcaption = Lazy((...args) => new BaseComponent("figcaption", args));
const Figure = Lazy((...args) => new BaseComponent("figure", args));
const Footer = Lazy((...args) => new BaseComponent("footer", args));
const Form = Lazy((...args) => new BaseComponent("form", args));
const H = Lazy((...args) => new BaseComponent("h", args));
const Head = Lazy((...args) => new BaseComponent("head", args));
const Header = Lazy((...args) => new BaseComponent("header", args));
const Hgroup = Lazy((...args) => new BaseComponent("hgroup", args));
const I = Lazy((...args) => new BaseComponent("i", args));
const Iframe = Lazy((...args) => new BaseComponent("iframe", args));
const Img = Lazy((...args) => new BaseComponent("img", args));
const Ins = Lazy((...args) => new BaseComponent("ins", args));
const Kbd = Lazy((...args) => new BaseComponent("kbd", args));
const Label = Lazy((...args) => new BaseComponent("label", args));
const Legend = Lazy((...args) => new BaseComponent("legend", args));
const Li = Lazy((...args) => new BaseComponent("li", args));
const Link = Lazy((...args) => new BaseComponent("link", args));
const Main = Lazy((...args) => new BaseComponent("main", args));
const MapElement = Lazy((...args) => new BaseComponent("map", args));
const Mark = Lazy((...args) => new BaseComponent("mark", args));
const Meta = Lazy((...args) => new BaseComponent("meta", args));
const Meter = Lazy((...args) => new BaseComponent("meter", args));
const Nav = Lazy((...args) => new BaseComponent("nav", args));
const Noscript = Lazy((...args) => new BaseComponent("noscript", args));
const ObjectElement = Lazy((...args) => new BaseComponent("object", args));
const Ol = Lazy((...args) => new BaseComponent("ol", args));
const Optgroup = Lazy((...args) => new BaseComponent("optgroup", args));
const Option = Lazy((...args) => new BaseComponent("option", args));
const Output = Lazy((...args) => new BaseComponent("output", args));
const P = Lazy((...args) => new BaseComponent("p", args));
const Param = Lazy((...args) => new BaseComponent("param", args));
const Picture = Lazy((...args) => new BaseComponent("picture", args));
const Pre = Lazy((...args) => new BaseComponent("pre", args));
const Progress = Lazy((...args) => new BaseComponent("progress", args));
const Q = Lazy((...args) => new BaseComponent("q", args));
const Rp = Lazy((...args) => new BaseComponent("rp", args));
const Rt = Lazy((...args) => new BaseComponent("rt", args));
const Ruby = Lazy((...args) => new BaseComponent("ruby", args));
const S = Lazy((...args) => new BaseComponent("s", args));
const Samp = Lazy((...args) => new BaseComponent("samp", args));
const Script = Lazy((...args) => new BaseComponent("script", args));
const Section = Lazy((...args) => new BaseComponent("section", args));
const Select = Lazy((...args) => new BaseComponent("select", args));
const Small = Lazy((...args) => new BaseComponent("small", args));
const Source = Lazy((...args) => new BaseComponent("source", args));
const Span = Lazy((...args) => new BaseComponent("span", args));
const Strong = Lazy((...args) => new BaseComponent("strong", args));
const Style = Lazy((...args) => new BaseComponent("style", args));
const Sub = Lazy((...args) => new BaseComponent("sub", args));
const Summary = Lazy((...args) => new BaseComponent("summary", args));
const Sup = Lazy((...args) => new BaseComponent("sup", args));
const Table = Lazy((...args) => new BaseComponent("table", args));
const Tbody = Lazy((...args) => new BaseComponent("tbody", args));
const Td = Lazy((...args) => new BaseComponent("td", args));
const Template = Lazy((...args) => new BaseComponent("template", args));
const Textarea = Lazy((...args) => new BaseComponent("textarea", args));
const Tfoot = Lazy((...args) => new BaseComponent("tfoot", args));
const Th = Lazy((...args) => new BaseComponent("th", args));
const Thead = Lazy((...args) => new BaseComponent("thead", args));
const Time = Lazy((...args) => new BaseComponent("time", args));
const Title = Lazy((...args) => new BaseComponent("title", args));
const Tr = Lazy((...args) => new BaseComponent("tr", args));
const Track = Lazy((...args) => new BaseComponent("track", args));
const U = Lazy((...args) => new BaseComponent("u", args));
const Ul = Lazy((...args) => new BaseComponent("ul", args));
const Var = Lazy((...args) => new BaseComponent("var", args));
const Video = Lazy((...args) => new BaseComponent("video", args));
const Wbr = Lazy((...args) => new BaseComponent("wbr", args));

const Show = Lazy(({ when, content = "", fallBack }) => {
  let lastState = null;

  if (isCoySignal(when)) {
    const fragment = new BaseComponent("div");

    effect(() => {
      const mustShowContent = when();
      if (mustShowContent !== lastState) {
        const component = createElement(!!mustShowContent ? content : fallBack);
        if (component) {
          fragment.replaceChildren(component);
        } else {
          fragment.replaceChildren();
        }
        lastState = mustShowContent;
      }
    });

    return fragment;
  } else {
    return !!when ? content : fallBack;
  }
});

// TODO: implement memoization to avoid unnecessary signals call
const List = Lazy(({ data, render, keyExtractor, container }) => {
  if (Array.isArray(data)) {
    throw new Error("Data property on List must be an array");
  }

  if (!keyExtractor) {
    throw new Error("You must pass the key keyExtractor function");
  }

  if (container && !(container instanceof BaseComponent)) {
    throw new Error(
      "Container is optional, but must be a BaseComponent instance"
    );
  }

  if (isCoySignal(data)) {
    container ??= new BaseComponent("div");
    const signals = [];
    let keys = [];

    effectOnDependencies(() => {
      const result = data() || [];
      isEmpty = result.length === 0;
      const newKeys = result.map((r) => keyExtractor(react(() => r))) || [];

      if (hasDuplicates(newKeys)) {
        throw new Error("There is duplicated key, please use unique values");
      }

      const permutationsIndexes = [];

      // check for removed items
      for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        if (!newKeys.includes(key)) {
          signals.splice(i, 1);
          keys.splice(i, 1);
          container.removeChildAt(i);
          i = i - 1;
        }
      }

      for (let i = 0; i < newKeys.length; i++) {
        const key = newKeys[i];
        const oldKeyIndex = keys.findIndex((k) => k === key);

        // we have to run the signal again because the data may have change.

        if (oldKeyIndex === i) {
          // when node stills in the same place
          signals[i].set(result[i]);
        } else if (oldKeyIndex === -1) {
          // when node is new
          signals.splice(i, 0, signalToObject(signal(result[i])));

          const component = createElement(render(signals[i].get));
          container.appendChild(component);
        } else if (
          !permutationsIndexes.includes(oldKeyIndex) ||
          !permutationsIndexes.includes(i)
        ) {
          // when node changed it's place
          swipeItemsOnArray(signals, oldKeyIndex, i);
          container.swapChild(oldKeyIndex, i);
          signals[i].set(result[i]);
          signals[oldKeyIndex].set(result[oldKeyIndex]);
          permutationsIndexes.push(oldKeyIndex, i);
        }
      }

      keys = newKeys;
    }, [data]);

    return container;
  } else {
    return data.map((d) => render(d));
  }
});

const ListView = ({ data, render, keyExtractor, container, empty }) => {
  return Show({
    when: react(() => data().length > 0),
    content: List({
      data,
      render,
      keyExtractor,
      container,
    }),
    fallBack: empty,
  });
};
