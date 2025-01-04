// TODO: to have a better typescript support we can pass the tag as the generic
// in the props, example: props<H1>({className: ""}); or props.h1({}) or H1.props({});
const props = (p) => new Props(p);

/* prettier-ignore */
//To avoid
const Fn = (fn) => (...args) => fn.apply(null, args);

const H1 = Fn((...args) => new BaseComponent("h1", args));
const H2 = Fn((...args) => new BaseComponent("h2", args));
const H3 = Fn((...args) => new BaseComponent("h3", args));
const H4 = Fn((...args) => new BaseComponent("h4", args));
const H5 = Fn((...args) => new BaseComponent("h5", args));
const H6 = Fn((...args) => new BaseComponent("h6", args));
const Hr = Fn((...args) => new BaseComponent("hr", args));
const Br = Fn((...args) => new BaseComponent("br", args));
const Div = Fn((...args) => new BaseComponent("div", args));
const Button = Fn((...args) => new BaseComponent("button", args));
const Input = Fn((...args) => new BaseComponent("input", args));
const A = Fn((...args) => new BaseComponent("a", args));
const Abbr = Fn((...args) => new BaseComponent("abbr", args));
const Address = Fn((...args) => new BaseComponent("address", args));
const Area = Fn((...args) => new BaseComponent("area", args));
const Article = Fn((...args) => new BaseComponent("article", args));
const Aside = Fn((...args) => new BaseComponent("aside", args));
const Audio = Fn((...args) => new BaseComponent("audio", args));
const B = Fn((...args) => new BaseComponent("b", args));
const Base = Fn((...args) => new BaseComponent("base", args));
const Bdi = Fn((...args) => new BaseComponent("bdi", args));
const Bdo = Fn((...args) => new BaseComponent("bdo", args));
const Blockquote = Fn((...args) => new BaseComponent("blockquote", args));
// const Body = Fn((...args) => new BaseComponent("body", args));
const Canvas = Fn((...args) => new BaseComponent("canvas", args));
const Caption = Fn((...args) => new BaseComponent("caption", args));
const Cite = Fn((...args) => new BaseComponent("cite", args));
const Code = Fn((...args) => new BaseComponent("code", args));
const Col = Fn((...args) => new BaseComponent("col", args));
const Colgroup = Fn((...args) => new BaseComponent("colgroup", args));
const Data = Fn((...args) => new BaseComponent("data", args));
const Datalist = Fn((...args) => new BaseComponent("datalist", args));
const Dd = Fn((...args) => new BaseComponent("dd", args));
const Del = Fn((...args) => new BaseComponent("del", args));
const Details = Fn((...args) => new BaseComponent("details", args));
const Dfn = Fn((...args) => new BaseComponent("dfn", args));
const Dialog = Fn((...args) => new BaseComponent("dialog", args));
const Dl = Fn((...args) => new BaseComponent("dl", args));
const Dt = Fn((...args) => new BaseComponent("dt", args));
const Em = Fn((...args) => new BaseComponent("em", args));
const Embed = Fn((...args) => new BaseComponent("embed", args));
const Fieldset = Fn((...args) => new BaseComponent("fieldset", args));
const Figcaption = Fn((...args) => new BaseComponent("figcaption", args));
const Figure = Fn((...args) => new BaseComponent("figure", args));
const Footer = Fn((...args) => new BaseComponent("footer", args));
const Form = Fn((...args) => new BaseComponent("form", args));
const H = Fn((...args) => new BaseComponent("h", args));
// const Head = Fn((...args) => new BaseComponent("head", args));
const Header = Fn((...args) => new BaseComponent("header", args));
const Hgroup = Fn((...args) => new BaseComponent("hgroup", args));
const I = Fn((...args) => new BaseComponent("i", args));
const Iframe = Fn((...args) => new BaseComponent("iframe", args));
const Img = Fn((...args) => new BaseComponent("img", args));
const Ins = Fn((...args) => new BaseComponent("ins", args));
const Kbd = Fn((...args) => new BaseComponent("kbd", args));
const Label = Fn((...args) => new BaseComponent("label", args));
const Legend = Fn((...args) => new BaseComponent("legend", args));
const Li = Fn((...args) => new BaseComponent("li", args));
const Link = Fn((...args) => new BaseComponent("link", args));
const Main = Fn((...args) => new BaseComponent("main", args));
const MapElement = Fn((...args) => new BaseComponent("map", args));
const Mark = Fn((...args) => new BaseComponent("mark", args));
// const Meta = Fn((...args) => new BaseComponent("meta", args));
const Meter = Fn((...args) => new BaseComponent("meter", args));
const Nav = Fn((...args) => new BaseComponent("nav", args));
const Noscript = Fn((...args) => new BaseComponent("noscript", args));
const ObjectElement = Fn((...args) => new BaseComponent("object", args));
const Ol = Fn((...args) => new BaseComponent("ol", args));
const Optgroup = Fn((...args) => new BaseComponent("optgroup", args));
const Option = Fn((...args) => new BaseComponent("option", args));
const Output = Fn((...args) => new BaseComponent("output", args));
const P = Fn((...args) => new BaseComponent("p", args));
const Param = Fn((...args) => new BaseComponent("param", args));
const Picture = Fn((...args) => new BaseComponent("picture", args));
const Pre = Fn((...args) => new BaseComponent("pre", args));
const Progress = Fn((...args) => new BaseComponent("progress", args));
const Q = Fn((...args) => new BaseComponent("q", args));
const Rp = Fn((...args) => new BaseComponent("rp", args));
const Rt = Fn((...args) => new BaseComponent("rt", args));
const Ruby = Fn((...args) => new BaseComponent("ruby", args));
const S = Fn((...args) => new BaseComponent("s", args));
const Samp = Fn((...args) => new BaseComponent("samp", args));
const Script = Fn((...args) => new BaseComponent("script", args));
const Section = Fn((...args) => new BaseComponent("section", args));
const Select = Fn((...args) => new BaseComponent("select", args));
const Small = Fn((...args) => new BaseComponent("small", args));
const Source = Fn((...args) => new BaseComponent("source", args));
const Span = Fn((...args) => new BaseComponent("span", args));
const Strong = Fn((...args) => new BaseComponent("strong", args));
const Style = Fn((...args) => new BaseComponent("style", args));
const Sub = Fn((...args) => new BaseComponent("sub", args));
const Summary = Fn((...args) => new BaseComponent("summary", args));
const Sup = Fn((...args) => new BaseComponent("sup", args));
const Table = Fn((...args) => new BaseComponent("table", args));
const Tbody = Fn((...args) => new BaseComponent("tbody", args));
const Td = Fn((...args) => new BaseComponent("td", args));
const Template = Fn((...args) => new BaseComponent("template", args));
const Textarea = Fn((...args) => new BaseComponent("textarea", args));
const Tfoot = Fn((...args) => new BaseComponent("tfoot", args));
const Th = Fn((...args) => new BaseComponent("th", args));
const Thead = Fn((...args) => new BaseComponent("thead", args));
const Time = Fn((...args) => new BaseComponent("time", args));
// const Title = Fn((...args) => new BaseComponent("title", args));
const Tr = Fn((...args) => new BaseComponent("tr", args));
const Track = Fn((...args) => new BaseComponent("track", args));
const U = Fn((...args) => new BaseComponent("u", args));
const Ul = Fn((...args) => new BaseComponent("ul", args));
const Var = Fn((...args) => new BaseComponent("var", args));
const Video = Fn((...args) => new BaseComponent("video", args));
const Wbr = Fn((...args) => new BaseComponent("wbr", args));

const Fragment = Fn((...args) => new BaseComponent("fragment", args));

const Custom = Fn((tag, ...args) => new BaseComponent(tag, args));

const Show = Fn(({ when, content = "", fallBack }) => {
  let lastState = null;

  if (isCoySignal(when)) {
    const container = new BaseComponent("fragment");

    effect(() => {
      const mustShowContent = when();
      if (mustShowContent !== lastState) {
        const isFallBack =
          mustShowContent === false ||
          mustShowContent === null ||
          mustShowContent === undefined;

        const component = createElement(isFallBack ? fallBack : content);
        container.removeAllChildren();

        container.appendChild(component);
        container.children.push(component);

        component.parent = container.parent;

        populateNodesDOM(component);

        // if (component) {
        //   fragment.replaceChildren(component);
        // } else {
        //   fragment.replaceChildren();
        // }
        lastState = mustShowContent;
      }
    });

    return container;
  } else {
    return !!when ? content : fallBack;
  }
});

const ShowMap = Fn(({ when, map, fallBack }) => {
  return Show({
    when: when,
    content: () => map[when()],
    fallBack: fallBack,
  });
});

const List = Fn(({ data = [], render = (d) => d, keyExtractor, container }) => {
  if (!Array.isArray(data) ^ isCoySignal(data)) {
    throw new Error(
      "Data property on List must be an array or a signal that returns an Array"
    );
  }

  if (container && !(container instanceof BaseComponent)) {
    throw new Error(
      "Container is optional, but must be a BaseComponent instance"
    );
  }
  container ??= new BaseComponent("fragment");

  if (isCoySignal(data)) {
    if (!keyExtractor) {
      throw new Error("You must pass the key keyExtractor function");
    }

    const signals = [];
    let keys = [];

    effectOnDependencies(() => {
      const result = data() || [];
      if (!Array.isArray(result)) {
        throw new Error(
          "Data property on List must be an array or a signal that returns an Array"
        );
      }

      const newKeys = result.map((r) => keyExtractor(react(() => r))) || [];

      if (hasDuplicates(newKeys)) {
        const duplicates = findDuplicates(newKeys)
          .map((k) => `key: ${k}`)
          .join(", ");
        throw new Error(
          `Has some non unique key, ${duplicates}, please use unique values`
        );
      }

      const permutationsIndexes = [];

      // check for removed items
      for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        if (!newKeys.includes(key)) {
          signals.splice(i, 1);
          keys.splice(i, 1);

          if (container.parent) {
            container.removeChildAt(i);
          }

          i = i - 1;
        }
      }

      batch(() => {
        for (let i = 0; i < newKeys.length; i++) {
          const key = newKeys[i];
          const oldKeyIndex = keys.findIndex((k) => k === key);

          if (oldKeyIndex === i) {
            // when node stills in the same place
            // we have to run the signal again because the data may have change.
            signals[i].set(result[i]);
          } else if (oldKeyIndex === -1) {
            // when node is new
            signals.splice(i, 0, signalToObject(signal(result[i])));

            const component = createElement(render(signals[i].get));
            // const component = createElement(render(memo(signals[i].get)));

            container.appendChild(component);
            container.children.push(component);

            component.parent = container.parent;

            populateNodesDOM(component);
          } else if (
            !permutationsIndexes.includes(oldKeyIndex) ||
            !permutationsIndexes.includes(i)
          ) {
            // when node changed it's place
            swipeItemsOnArray(signals, oldKeyIndex, i);
            if (container.parent) {
              container.swapChild(oldKeyIndex, i);
            }

            signals[i].set(result[i]);
            signals[oldKeyIndex].set(result[oldKeyIndex]);
            permutationsIndexes.push(oldKeyIndex, i);
          }
        }
      });

      keys = newKeys;
    }, [data]);
  } else {
    data.forEach((d) => {
      const result = createElement(render(d));
      container.children.push(result);
    });
  }

  return container;
});

const ListView = Fn(({ data, render, keyExtractor, container, empty }) => {
  return Show({
    when: react(() => data().length > 0),
    content: List({
      data,
      render,
      keyExtractor,
    }),
    fallBack: empty,
  });
});
