import { BaseComponent, Props } from "./baseComponent.mjs";
import {
  batch,
  effect,
  effectOnDependencies,
  isCoySignal,
  react,
  signal,
  signalToObject,
} from "./signal.mjs";
import { findDuplicates, hasDuplicates, swipeItemsOnArray } from "./utils.mjs";

// TODO: to have a better typescript support we can pass the tag as the generic
export const props = (p) => new Props(p);

// TODO, trocar para um objeto proops....
export const fromArgs = (args) => {
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

export const H1 = (...args) => new BaseComponent("h1", args);
export const H2 = (...args) => new BaseComponent("h2", args);
export const H3 = (...args) => new BaseComponent("h3", args);
export const H4 = (...args) => new BaseComponent("h4", args);
export const H5 = (...args) => new BaseComponent("h5", args);
export const H6 = (...args) => new BaseComponent("h6", args);
export const Hr = (...args) => new BaseComponent("hr", args);
export const Br = (...args) => new BaseComponent("br", args);
export const Div = (...args) => new BaseComponent("div", args);
export const Button = (...args) => new BaseComponent("button", args);
export const Input = (...args) => new BaseComponent("input", args);
export const A = (...args) => new BaseComponent("a", args);
export const Abbr = (...args) => new BaseComponent("abbr", args);
export const Address = (...args) => new BaseComponent("address", args);
export const Area = (...args) => new BaseComponent("area", args);
export const Article = (...args) => new BaseComponent("article", args);
export const Aside = (...args) => new BaseComponent("aside", args);
export const Audio = (...args) => new BaseComponent("audio", args);
export const B = (...args) => new BaseComponent("b", args);
export const Base = (...args) => new BaseComponent("base", args);
export const Bdi = (...args) => new BaseComponent("bdi", args);
export const Bdo = (...args) => new BaseComponent("bdo", args);
export const Blockquote = (...args) => new BaseComponent("blockquote", args);
// const Body = (...args) => new BaseComponent("body", args);
export const Canvas = (...args) => new BaseComponent("canvas", args);
export const Caption = (...args) => new BaseComponent("caption", args);
export const Cite = (...args) => new BaseComponent("cite", args);
export const Code = (...args) => new BaseComponent("code", args);
export const Col = (...args) => new BaseComponent("col", args);
export const Colgroup = (...args) => new BaseComponent("colgroup", args);
export const Data = (...args) => new BaseComponent("data", args);
export const Datalist = (...args) => new BaseComponent("datalist", args);
export const Dd = (...args) => new BaseComponent("dd", args);
export const Del = (...args) => new BaseComponent("del", args);
export const Details = (...args) => new BaseComponent("details", args);
export const Dfn = (...args) => new BaseComponent("dfn", args);
export const Dialog = (...args) => new BaseComponent("dialog", args);
export const Dl = (...args) => new BaseComponent("dl", args);
export const Dt = (...args) => new BaseComponent("dt", args);
export const Em = (...args) => new BaseComponent("em", args);
export const Embed = (...args) => new BaseComponent("embed", args);
export const Fieldset = (...args) => new BaseComponent("fieldset", args);
export const Figcaption = (...args) => new BaseComponent("figcaption", args);
export const Figure = (...args) => new BaseComponent("figure", args);
export const Footer = (...args) => new BaseComponent("footer", args);
export const Form = (...args) => new BaseComponent("form", args);
export const H = (...args) => new BaseComponent("h", args);
// const Head = (...args) => new BaseComponent("head", args);
export const Header = (...args) => new BaseComponent("header", args);
export const Hgroup = (...args) => new BaseComponent("hgroup", args);
export const I = (...args) => new BaseComponent("i", args);
export const Iframe = (...args) => new BaseComponent("iframe", args);
export const Img = (...args) => new BaseComponent("img", args);
export const Ins = (...args) => new BaseComponent("ins", args);
export const Kbd = (...args) => new BaseComponent("kbd", args);
export const Label = (...args) => new BaseComponent("label", args);
export const Legend = (...args) => new BaseComponent("legend", args);
export const Li = (...args) => new BaseComponent("li", args);
export const Link = (...args) => new BaseComponent("link", args);
export const Main = (...args) => new BaseComponent("main", args);
export const MapElement = (...args) => new BaseComponent("map", args);
export const Mark = (...args) => new BaseComponent("mark", args);
// const Meta = (...args) => new BaseComponent("meta", args);
export const Meter = (...args) => new BaseComponent("meter", args);
export const Nav = (...args) => new BaseComponent("nav", args);
export const Noscript = (...args) => new BaseComponent("noscript", args);
export const ObjectElement = (...args) => new BaseComponent("object", args);
export const Ol = (...args) => new BaseComponent("ol", args);
export const Optgroup = (...args) => new BaseComponent("optgroup", args);
export const Option = (...args) => new BaseComponent("option", args);
export const Output = (...args) => new BaseComponent("output", args);
export const P = (...args) => new BaseComponent("p", args);
export const Param = (...args) => new BaseComponent("param", args);
export const Picture = (...args) => new BaseComponent("picture", args);
export const Pre = (...args) => new BaseComponent("pre", args);
export const Progress = (...args) => new BaseComponent("progress", args);
export const Q = (...args) => new BaseComponent("q", args);
export const Rp = (...args) => new BaseComponent("rp", args);
export const Rt = (...args) => new BaseComponent("rt", args);
export const Ruby = (...args) => new BaseComponent("ruby", args);
export const S = (...args) => new BaseComponent("s", args);
export const Samp = (...args) => new BaseComponent("samp", args);
export const Script = (...args) => new BaseComponent("script", args);
export const Section = (...args) => new BaseComponent("section", args);
export const Select = (...args) => new BaseComponent("select", args);
export const Small = (...args) => new BaseComponent("small", args);
export const Source = (...args) => new BaseComponent("source", args);
export const Span = (...args) => new BaseComponent("span", args);
export const Strong = (...args) => new BaseComponent("strong", args);
export const Style = (...args) => new BaseComponent("style", args);
export const Sub = (...args) => new BaseComponent("sub", args);
export const Summary = (...args) => new BaseComponent("summary", args);
export const Sup = (...args) => new BaseComponent("sup", args);
export const Table = (...args) => new BaseComponent("table", args);
export const Tbody = (...args) => new BaseComponent("tbody", args);
export const Td = (...args) => new BaseComponent("td", args);
export const Template = (...args) => new BaseComponent("template", args);
export const Textarea = (...args) => new BaseComponent("textarea", args);
export const Tfoot = (...args) => new BaseComponent("tfoot", args);
export const Th = (...args) => new BaseComponent("th", args);
export const Thead = (...args) => new BaseComponent("thead", args);
export const Time = (...args) => new BaseComponent("time", args);
// const Title = (...args) => new BaseComponent("title", args);
export const Tr = (...args) => new BaseComponent("tr", args);
export const Track = (...args) => new BaseComponent("track", args);
export const U = (...args) => new BaseComponent("u", args);
export const Ul = (...args) => new BaseComponent("ul", args);
export const Var = (...args) => new BaseComponent("var", args);
export const Video = (...args) => new BaseComponent("video", args);
export const Wbr = (...args) => new BaseComponent("wbr", args);

export const Fragment = (...args) => new BaseComponent("fragment", args);

export const CustomComponent = (tag, ...args) => new BaseComponent(tag, args);

export const Show = ({ when, content, fallBack = undefined }) => {
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

        container.removeAllChildren();

        let component;
        if (!isFallBack && content) {
          component = container.appendChild(content);
        } else {
          component = container.appendChild(fallBack);
        }

        component.renderChildren()

        // if(component.tag === "void" && fallBack) {
        //   component = createElement(fallBack)
        // }

        lastState = mustShowContent;
      }
    });

    return container;
  } else {
    return !!when ? content : fallBack;
  }
};

export const ShowMap = ({ key, map, fallBack }) => {
  return Show({
    when: key,
    content: () => map[key()] || fallBack,
    fallBack: fallBack,
  });
};

export const List = ({ data, render = (d) => d, keyExtractor }) => {
  //TODO: to avoid the problem of listing don't having the parent node, we have to
  // implement a life cycle hook that will be called when the node is added to the tree

  if (!Array.isArray(data) == !isCoySignal(data)) {
    throw new Error(
      "Data property on List must be an array or a signal that returns an Array"
    );
  }

  const container = new BaseComponent("fragment", [
    props({ id: Math.random() }),
  ]);

  if (isCoySignal(data)) {
    if (!keyExtractor) {
      throw new Error("You must pass the key keyExtractor function");
    }

    const signals = [];
    let keys = [];

    effectOnDependencies(() => {
      // @ts-ignore
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
            // @ts-ignore
            signals.splice(i, 0, signalToObject(signal(result[i])));

            // const component = createElement(render(signals[i].get));
            // const component = createElement(render(memo(signals[i].get)));

            const component = render(signals[i].get);
            component.parent = container.parent;
            component.renderChildren();

            console.log(component);

            container.appendChild(component, true);
            // container.children.push(component);

            // component.parent = container.parent;

            // populateNodesDOM(component);
          } else if (
            !permutationsIndexes.includes(oldKeyIndex) ||
            !permutationsIndexes.includes(i)
          ) {
            // when node changed it's place
            swipeItemsOnArray(signals, oldKeyIndex, i);
            if (container.parent) {
              container.swapChildPlaces(oldKeyIndex, i);
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
      const component = render(d);
      component.parent = container.parent;
      component.renderChildren();
      container.appendChild(component, true);
    });

    // data.forEach((d) => {
    //   const result = createElement(render(d));

    //   container.children.push(result);
    // });
  }

  return container;
};

export const ListView = ({ data, render, keyExtractor, empty = undefined }) => {
  return Show({
    when: react(() => (data() || []).length > 0),
    content: List({
      data,
      render,
      keyExtractor,
    }),
    fallBack: empty,
  });
};
