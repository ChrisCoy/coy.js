import { isCoySignal, memo } from "./signal.mjs";
import { createCoyComponent } from "./web/components/createCoyComponent.mjs";
import { Props } from "./web/props/props.mjs";

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
    { propsObjs: [] },
  );

  return Object.assign({}, ...propsObjs);
};

export const H1 = (...args) => createCoyComponent("h1", args);
export const H2 = (...args) => createCoyComponent("h2", args);
export const H3 = (...args) => createCoyComponent("h3", args);
export const H4 = (...args) => createCoyComponent("h4", args);
export const H5 = (...args) => createCoyComponent("h5", args);
export const H6 = (...args) => createCoyComponent("h6", args);
export const Hr = (...args) => createCoyComponent("hr", args);
export const Br = (...args) => createCoyComponent("br", args);
export const Div = (...args) => createCoyComponent("div", args);
export const Button = (...args) => createCoyComponent("button", args);
export const Input = (...args) => createCoyComponent("input", args);
export const A = (...args) => createCoyComponent("a", args);
export const Abbr = (...args) => createCoyComponent("abbr", args);
export const Address = (...args) => createCoyComponent("address", args);
export const Area = (...args) => createCoyComponent("area", args);
export const Article = (...args) => createCoyComponent("article", args);
export const Aside = (...args) => createCoyComponent("aside", args);
export const Audio = (...args) => createCoyComponent("audio", args);
export const B = (...args) => createCoyComponent("b", args);
export const Base = (...args) => createCoyComponent("base", args);
export const Bdi = (...args) => createCoyComponent("bdi", args);
export const Bdo = (...args) => createCoyComponent("bdo", args);
export const Blockquote = (...args) => createCoyComponent("blockquote", args);
// const Body = (...args) => createCoyComponent("body", args);
export const Canvas = (...args) => createCoyComponent("canvas", args);
export const Caption = (...args) => createCoyComponent("caption", args);
export const Cite = (...args) => createCoyComponent("cite", args);
export const Code = (...args) => createCoyComponent("code", args);
export const Col = (...args) => createCoyComponent("col", args);
export const Colgroup = (...args) => createCoyComponent("colgroup", args);
export const Data = (...args) => createCoyComponent("data", args);
export const Datalist = (...args) => createCoyComponent("datalist", args);
export const Dd = (...args) => createCoyComponent("dd", args);
export const Del = (...args) => createCoyComponent("del", args);
export const Details = (...args) => createCoyComponent("details", args);
export const Dfn = (...args) => createCoyComponent("dfn", args);
export const Dialog = (...args) => createCoyComponent("dialog", args);
export const Dl = (...args) => createCoyComponent("dl", args);
export const Dt = (...args) => createCoyComponent("dt", args);
export const Em = (...args) => createCoyComponent("em", args);
export const Embed = (...args) => createCoyComponent("embed", args);
export const Fieldset = (...args) => createCoyComponent("fieldset", args);
export const Figcaption = (...args) => createCoyComponent("figcaption", args);
export const Figure = (...args) => createCoyComponent("figure", args);
export const Footer = (...args) => createCoyComponent("footer", args);
export const Form = (...args) => createCoyComponent("form", args);
export const H = (...args) => createCoyComponent("h", args);
// const Head = (...args) => createCoyComponent("head", args);
export const Header = (...args) => createCoyComponent("header", args);
export const Hgroup = (...args) => createCoyComponent("hgroup", args);
export const I = (...args) => createCoyComponent("i", args);
export const Iframe = (...args) => createCoyComponent("iframe", args);
export const Img = (...args) => createCoyComponent("img", args);
export const Ins = (...args) => createCoyComponent("ins", args);
export const Kbd = (...args) => createCoyComponent("kbd", args);
export const Label = (...args) => createCoyComponent("label", args);
export const Legend = (...args) => createCoyComponent("legend", args);
export const Li = (...args) => createCoyComponent("li", args);
export const Link = (...args) => createCoyComponent("link", args);
export const Main = (...args) => createCoyComponent("main", args);
export const MapElement = (...args) => createCoyComponent("map", args);
export const Mark = (...args) => createCoyComponent("mark", args);
// const Meta = (...args) => createCoyComponent("meta", args);
export const Meter = (...args) => createCoyComponent("meter", args);
export const Nav = (...args) => createCoyComponent("nav", args);
export const Noscript = (...args) => createCoyComponent("noscript", args);
export const ObjectElement = (...args) => createCoyComponent("object", args);
export const Ol = (...args) => createCoyComponent("ol", args);
export const Optgroup = (...args) => createCoyComponent("optgroup", args);
export const Option = (...args) => createCoyComponent("option", args);
export const Output = (...args) => createCoyComponent("output", args);
export const P = (...args) => createCoyComponent("p", args);
export const Param = (...args) => createCoyComponent("param", args);
export const Picture = (...args) => createCoyComponent("picture", args);
export const Pre = (...args) => createCoyComponent("pre", args);
export const Progress = (...args) => createCoyComponent("progress", args);
export const Q = (...args) => createCoyComponent("q", args);
export const Rp = (...args) => createCoyComponent("rp", args);
export const Rt = (...args) => createCoyComponent("rt", args);
export const Ruby = (...args) => createCoyComponent("ruby", args);
export const S = (...args) => createCoyComponent("s", args);
export const Samp = (...args) => createCoyComponent("samp", args);
export const Script = (...args) => createCoyComponent("script", args);
export const Section = (...args) => createCoyComponent("section", args);
export const Select = (...args) => createCoyComponent("select", args);
export const Small = (...args) => createCoyComponent("small", args);
export const Source = (...args) => createCoyComponent("source", args);
export const Span = (...args) => createCoyComponent("span", args);
export const Strong = (...args) => createCoyComponent("strong", args);
export const Style = (...args) => createCoyComponent("style", args);
export const Sub = (...args) => createCoyComponent("sub", args);
export const Summary = (...args) => createCoyComponent("summary", args);
export const Sup = (...args) => createCoyComponent("sup", args);
export const Table = (...args) => createCoyComponent("table", args);
export const Tbody = (...args) => createCoyComponent("tbody", args);
export const Td = (...args) => createCoyComponent("td", args);
export const Template = (...args) => createCoyComponent("template", args);
export const Textarea = (...args) => createCoyComponent("textarea", args);
export const Tfoot = (...args) => createCoyComponent("tfoot", args);
export const Th = (...args) => createCoyComponent("th", args);
export const Thead = (...args) => createCoyComponent("thead", args);
export const Time = (...args) => createCoyComponent("time", args);
// const Title = (...args) => createCoyComponent("title", args);
export const Tr = (...args) => createCoyComponent("tr", args);
export const Track = (...args) => createCoyComponent("track", args);
export const U = (...args) => createCoyComponent("u", args);
export const Ul = (...args) => createCoyComponent("ul", args);
export const Var = (...args) => createCoyComponent("var", args);
export const Video = (...args) => createCoyComponent("video", args);
export const Wbr = (...args) => createCoyComponent("wbr", args);

export const Fragment = (...args) => createCoyComponent("$CoyFragment", args);

export const CustomHTMLComponent = (tag, ...args) => createCoyComponent(tag, args);

export const Show = ({ when, content, fallBack = undefined }) => {
  if(!isCoySignal(when)){
    throw new Error("when must be a signal")
  }

  if(content && typeof content !== "function"){
    throw new Error("content must be a function that returns a component")
  }
  if(fallBack && typeof fallBack !== "function"){
    throw new Error("fallBack must be a function that returns a component")
  }

  return createCoyComponent("$CoyShow", [{when: memo(() => when()), content, fallBack}])
  // let lastState = null;

  // if (content !== undefined && typeof content !== "function") {
  //   throw new Error("Content must be a function");
  // }

  // if (fallBack !== undefined && typeof fallBack !== "function") {
  //   throw new Error("FallBack must be a function");
  // }

  // return memo(() => (when() ? content?.() : fallBack?.()));
};

export const ShowMap = ({ key, map, fallBack }) => {
  return Show({
    when: key,
    content: () => map[key()] || fallBack,
    fallBack: fallBack,
  });
};

export const List = ({ data, render = (d) => d, keyExtractor }) => {
  if (!Array.isArray(data) == !isCoySignal(data)) {
    throw new Error(
      "Data property on List must be an array or a signal that returns an Array",
    );
  }

  if (!keyExtractor) {
    throw new Error("You must pass the key keyExtractor function");
  }

  return createCoyComponent("$CoyList", [{ data, render, keyExtractor }]);
};

export const ListView = ({ data, render, keyExtractor, empty = undefined }) => {
  return List({
    data,
    render,
    keyExtractor,
  });
  // return Show({
  //   when: react(() => (data() || []).length > 0),
  //   content: () =>
  //     List({
  //       data,
  //       render,
  //       keyExtractor,
  //     }),
  //   fallBack: empty,
  // });
};
