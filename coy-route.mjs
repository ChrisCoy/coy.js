const formatUrl = (url) => {
  let newUrl = url;
  if (newUrl.endsWith("index.html")) {
    newUrl = newUrl.replace("index.html", "");
  }

  newUrl = newUrl.replace(/\/$/, "");

  return newUrl;
};

const [currentRoute, setCurrentRoute] = signal(
  formatUrl(window.location.pathname)
);

const useRouter = () => {
  return {
    route: currentRoute,
    // options: {params: string[]; query: string[], state: maybe?}
    push: (path, options) => {
      if (path === currentRoute()) return;

      window.history.pushState({}, "", path);
      setCurrentRoute(path);
    },
  };
};

/**
 * [{
 *    path: "",
 *    guards: [AuthGuard()],
 *    component: (children) => Div(children),
 *    children: [
 *      {
 *        path: "",
 *        guards: [SubRoutGuard()],
 *        component: (children) => Div(),
 *      },
 *      {
 *        path: "/another",
 *        component: (children) => Div()
 *      }
 *    ]
 * }]
 */

const RoutesProvider = (routes) => {
  const container = new BaseComponent("fragment")
  // const componentsAlready = new Set();
  // let stack = [];
  // let curComponent = null;
  // let count = 0;

  let tree = routes;

  console.log("routestree", routes);

  const changeUrlEventCallback = () => {
    setCurrentRoute(formatUrl(window.location.pathname));
  };

  const doTree = () => {
    const pieces = currentRoute().split("/");

    console.log(pieces);

    console.log(
      "tree.map((p) => p.path)",
      tree.map((p) => p.path)
    );

    let curKey = undefined;
    for (let urlPiece of pieces) {
      const key = tree.map((node) => node.path).find((key) => key === urlPiece);

      if (key === undefined) {
        continue;
      }

      curKey = key;
    }

    if (curKey === undefined) {
      throw new Error("cant found component to this route");
    }

    const c = createElement(tree.find((node) => node.path === curKey).component)

    container.appendChild(c)
    container.children.push(c)
  };

  doTree()

  changeUrlEventCallback();

  window.addEventListener("popstate", changeUrlEventCallback);

  // console.log("doTree()", doTree());
  

  return container;
};

const RouteLink = (...args) => {
  const { href, onclick } = fromArgs(args);

  const onclickLink = (e) => {
    e.preventDefault();

    onclick?.(e);

    if (href !== currentRoute()) {
      let result;
      if (typeof href === "function") {
        result = href();
      } else {
        result = href;
      }

      window.history.pushState({}, "", result);
      setCurrentRoute(result);
    }
  };

  return A(
    ...args,
    props({
      onclick: onclickLink,
    })
  );
};

const $$RouteOutletSymbol = Symbol("$$RouteOutletSymbol");
const RouteOutlet = () => {
  const outlet = new BaseComponent("comment", [
    props({ [$$RouteOutletSymbol]: true, text: "$$RouteOutlet" }),
  ]);
  return outlet;
};
RouteOutlet.type = "outlet";
