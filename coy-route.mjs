import { BaseComponent } from "./baseComponent.mjs";
import { A, fromArgs, props } from "./components.mjs";
import { signal } from "./signal.mjs";

/** @type {BaseComponent} */
let outletCtx = null;

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

export const useRouter = () => {
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

export const RoutesProvider = (routes) => {
  const container = new BaseComponent("fragment");

  let tree = [];

  const changeUrlEventCallback = () => {
    setCurrentRoute(formatUrl(window.location.pathname));
  };

  changeUrlEventCallback();
  window.addEventListener("popstate", changeUrlEventCallback);

  debugger;

  const getUrlPieces = () => {
    const curRoute = currentRoute();
    const splittedRoutes = curRoute.split("/");
    let pieces = [];

    if (curRoute === "/" || curRoute === "") {
      return ["/"];
    }

    for (const piece of splittedRoutes) {
      if (piece !== "/" && piece !== "") {
        pieces.push(piece);
      }
    }

    return pieces;
  };

  const getComponents = (
    nodesArray = [],
    pieces = [],
    components = [],
    valid = true
  ) => {
    if (pieces.length === 0) {
      const lastNode = nodesArray.find((n) => n.path === "/");

      if (lastNode?.component) {
        components.push({
          piece: "/",
          component: lastNode.component,
        });
      }

      return {
        components,
        valid,
      };
    }

    let curPiece = pieces[0];
    let restUrlPieces = pieces.slice(1);

    for (const node of nodesArray) {
      if (node.path === curPiece) {
        if (node.component) {
          components.push({
            piece: node.path,
            component: node.component,
          });
        }
        const result = getComponents(
          node.routes,
          restUrlPieces,
          components,
          valid
        );

        return result;
      }
    }

    return {
      components,
      valid: false,
    };
  };

  const populate = (treeRoutes, root) => {
    const newTree = getComponents(treeRoutes, getUrlPieces());

    // for (const node of ) {
    //   if( !== )
    // }

    for (let i = 0; i < newTree.components.length; i++) {
      const newNode = newTree.components[i];
      const oldNode = tree[i];

      if (newNode.piece === oldNode?.piece) {
        continue;
      }

      // if the component is new we remove all of the root children and then put the newNode
      if (newNode.piece !== oldNode?.piece) {
        root.removeAllChildren();

        if (newNode.component) {
          root.appendChild(newNode.component);
          if (outletCtx) {
            root = outletCtx;
            newNode
          }
        }

        outletCtx = null;
      }
    }
  };

  return container;

  // // LIXO
  // const child = treeeeeeeeee[1].component();

  // // console.log("child", child.element.documentQuery);

  // container.appendChild(child, true);

  // let freezedOutlet = outletCtx;

  // debugger;
  // /** @type {BaseComponent} */
  // const toAdd = treeeeeeeeee[1].routes[0].component();
  // freezedOutlet.appendChild(toAdd, true);
  // toAdd.renderChildren();

  // // outletCtx.children.push(tree[1].routes[0].component());

  // setTimeout(() => {
  //   debugger;
  //   freezedOutlet.removeAllChildren();
  //   /** @type {BaseComponent} */
  //   const algo = treeeeeeeeee[1].routes[1].component();
  //   freezedOutlet.appendChild(algo, true);
  //   algo.renderChildren();
  // }, 2000);

  // // console.log("doTree()", doTree());
};

export const RouteLink = (...args) => {
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
export const RouteOutlet = () => {
  // const outlet = new BaseComponent("comment", [
  //   props({ [$$RouteOutletSymbol]: true, text: "Coy.RouteOutlet" }),
  // ]);
  const outlet = new BaseComponent("fragment", [
    props({ name: `RouteOutlet-${Math.random()}` }),
  ]);
  outletCtx = outlet;
  return outlet;
};
RouteOutlet.type = "outlet";

// const resultComponent = node.component();
// root.appendChild(resultComponent);
// const innerOutlet = outletCtx;

// if (innerOutlet) {
//   renderTree(innerOutlet, node.routes, restUrlPieces);
// } else {
//   renderTree(root, node.routes, restUrlPieces);
// }
