// TODO: to have a better typescript support we can pass the tag as the generic
// in the props, example: props<H1>({className: ""}); or props.h1({}) or H1.props({});
const props = (p) => new Props(p);

// TODO, trocar para um objeto proops....
const fromArgs = (args) => {
  const { propsObjs } = args.reduce(
    (acc, arg) => {
      if (arg instanceof Props) {
        acc.propsObjs.push(arg.props);
      }
      return acc;
    },
    { propsObjs: [] }
  );

  return Object.assign({}, ...propsObjs);
};

const H1 = (...args) => new BaseComponent("h1", args);
const H2 = (...args) => new BaseComponent("h2", args);
const H3 = (...args) => new BaseComponent("h3", args);
const H4 = (...args) => new BaseComponent("h4", args);
const H5 = (...args) => new BaseComponent("h5", args);
const H6 = (...args) => new BaseComponent("h6", args);
const Hr = (...args) => new BaseComponent("hr", args);
const Br = (...args) => new BaseComponent("br", args);
const Div = (...args) => new BaseComponent("div", args);
const Button = (...args) => new BaseComponent("button", args);
const Input = (...args) => new BaseComponent("input", args);
const A = (...args) => new BaseComponent("a", args);
const Abbr = (...args) => new BaseComponent("abbr", args);
const Address = (...args) => new BaseComponent("address", args);
const Area = (...args) => new BaseComponent("area", args);
const Article = (...args) => new BaseComponent("article", args);
const Aside = (...args) => new BaseComponent("aside", args);
const Audio = (...args) => new BaseComponent("audio", args);
const B = (...args) => new BaseComponent("b", args);
const Base = (...args) => new BaseComponent("base", args);
const Bdi = (...args) => new BaseComponent("bdi", args);
const Bdo = (...args) => new BaseComponent("bdo", args);
const Blockquote = (...args) => new BaseComponent("blockquote", args);
// const Body = (...args) => new BaseComponent("body", args);
const Canvas = (...args) => new BaseComponent("canvas", args);
const Caption = (...args) => new BaseComponent("caption", args);
const Cite = (...args) => new BaseComponent("cite", args);
const Code = (...args) => new BaseComponent("code", args);
const Col = (...args) => new BaseComponent("col", args);
const Colgroup = (...args) => new BaseComponent("colgroup", args);
const Data = (...args) => new BaseComponent("data", args);
const Datalist = (...args) => new BaseComponent("datalist", args);
const Dd = (...args) => new BaseComponent("dd", args);
const Del = (...args) => new BaseComponent("del", args);
const Details = (...args) => new BaseComponent("details", args);
const Dfn = (...args) => new BaseComponent("dfn", args);
const Dialog = (...args) => new BaseComponent("dialog", args);
const Dl = (...args) => new BaseComponent("dl", args);
const Dt = (...args) => new BaseComponent("dt", args);
const Em = (...args) => new BaseComponent("em", args);
const Embed = (...args) => new BaseComponent("embed", args);
const Fieldset = (...args) => new BaseComponent("fieldset", args);
const Figcaption = (...args) => new BaseComponent("figcaption", args);
const Figure = (...args) => new BaseComponent("figure", args);
const Footer = (...args) => new BaseComponent("footer", args);
const Form = (...args) => new BaseComponent("form", args);
const H = (...args) => new BaseComponent("h", args);
// const Head = (...args) => new BaseComponent("head", args);
const Header = (...args) => new BaseComponent("header", args);
const Hgroup = (...args) => new BaseComponent("hgroup", args);
const I = (...args) => new BaseComponent("i", args);
const Iframe = (...args) => new BaseComponent("iframe", args);
const Img = (...args) => new BaseComponent("img", args);
const Ins = (...args) => new BaseComponent("ins", args);
const Kbd = (...args) => new BaseComponent("kbd", args);
const Label = (...args) => new BaseComponent("label", args);
const Legend = (...args) => new BaseComponent("legend", args);
const Li = (...args) => new BaseComponent("li", args);
const Link = (...args) => new BaseComponent("link", args);
const Main = (...args) => new BaseComponent("main", args);
const MapElement = (...args) => new BaseComponent("map", args);
const Mark = (...args) => new BaseComponent("mark", args);
// const Meta = (...args) => new BaseComponent("meta", args);
const Meter = (...args) => new BaseComponent("meter", args);
const Nav = (...args) => new BaseComponent("nav", args);
const Noscript = (...args) => new BaseComponent("noscript", args);
const ObjectElement = (...args) => new BaseComponent("object", args);
const Ol = (...args) => new BaseComponent("ol", args);
const Optgroup = (...args) => new BaseComponent("optgroup", args);
const Option = (...args) => new BaseComponent("option", args);
const Output = (...args) => new BaseComponent("output", args);
const P = (...args) => new BaseComponent("p", args);
const Param = (...args) => new BaseComponent("param", args);
const Picture = (...args) => new BaseComponent("picture", args);
const Pre = (...args) => new BaseComponent("pre", args);
const Progress = (...args) => new BaseComponent("progress", args);
const Q = (...args) => new BaseComponent("q", args);
const Rp = (...args) => new BaseComponent("rp", args);
const Rt = (...args) => new BaseComponent("rt", args);
const Ruby = (...args) => new BaseComponent("ruby", args);
const S = (...args) => new BaseComponent("s", args);
const Samp = (...args) => new BaseComponent("samp", args);
const Script = (...args) => new BaseComponent("script", args);
const Section = (...args) => new BaseComponent("section", args);
const Select = (...args) => new BaseComponent("select", args);
const Small = (...args) => new BaseComponent("small", args);
const Source = (...args) => new BaseComponent("source", args);
const Span = (...args) => new BaseComponent("span", args);
const Strong = (...args) => new BaseComponent("strong", args);
const Style = (...args) => new BaseComponent("style", args);
const Sub = (...args) => new BaseComponent("sub", args);
const Summary = (...args) => new BaseComponent("summary", args);
const Sup = (...args) => new BaseComponent("sup", args);
const Table = (...args) => new BaseComponent("table", args);
const Tbody = (...args) => new BaseComponent("tbody", args);
const Td = (...args) => new BaseComponent("td", args);
const Template = (...args) => new BaseComponent("template", args);
const Textarea = (...args) => new BaseComponent("textarea", args);
const Tfoot = (...args) => new BaseComponent("tfoot", args);
const Th = (...args) => new BaseComponent("th", args);
const Thead = (...args) => new BaseComponent("thead", args);
const Time = (...args) => new BaseComponent("time", args);
// const Title = (...args) => new BaseComponent("title", args);
const Tr = (...args) => new BaseComponent("tr", args);
const Track = (...args) => new BaseComponent("track", args);
const U = (...args) => new BaseComponent("u", args);
const Ul = (...args) => new BaseComponent("ul", args);
const Var = (...args) => new BaseComponent("var", args);
const Video = (...args) => new BaseComponent("video", args);
const Wbr = (...args) => new BaseComponent("wbr", args);

const Fragment = (...args) => new BaseComponent("fragment", args);

const CustomComponent = (tag, ...args) => new BaseComponent(tag, args);

const Show = ({ when, content, fallBack }) => {
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

        let component;

        if (!isFallBack && content) {
          component = createElement(content);
        } else {
          component = createElement(fallBack);
        }

        // if(component.tag === "void" && fallBack) {
        //   component = createElement(fallBack)
        // }

        container.removeAllChildren();

        container.appendChild(component);
        container.children.push(component);

        component.parent = container.parent;

        populateNodesDOM(component);

        lastState = mustShowContent;
      }
    });

    return container;
  } else {
    return !!when ? content : fallBack;
  }
};

const ShowSignalComponent = (component) => {
  if (!isCoySignal(component)) {
    throw new Error("Component must be a signal that returns a component!");
  }
  const memoizedComponent = memo(() => {
    const el = component();

    if(!isCoyComponent(el)){
      throw new Error("Result from signal must be a coy component!");
    }

    return el;
  });

  const container = new BaseComponent("fragment");

  effect(() => {
    container.removeAllChildren();
    const resultComponent = memoizedComponent();
    container.appendChild(resultComponent);
    container.children.push(resultComponent);

    resultComponent.parent = container.parent;

    populateNodesDOM(resultComponent);
  });
};

const ShowMap = ({ key, map, fallBack }) => {
  return Show({
    when: key,
    content: () => map[key()] || fallBack,
    fallBack: fallBack,
  });
};

const List = ({ data = [], render = (d) => d, keyExtractor, container }) => {
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
};

const ListView = ({ data, render, keyExtractor, empty }) => {
  return Show({
    when: react(() => data().length > 0),
    content: List({
      data,
      render,
      keyExtractor,
    }),
    fallBack: empty,
  });
};
