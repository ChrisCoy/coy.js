import { BaseComponent } from "./baseComponent.mjs";
import { A, fromArgs, props } from "./components.mjs";
import { effectOnDependencies, signal } from "./signal.mjs";

const isSameUrl = (url = "") => {
  const urlPathname = new URL(formatUrl(url), window.location.href).pathname;
  if (formatUrl(urlPathname) === currentRoute()) {
    return true;
  }

  return false;
};

const formatUrl = (url = "") => {
  let newUrl = url;
  if (newUrl.endsWith("index.html")) {
    newUrl = newUrl.replace("index.html", "");
  }

  newUrl = newUrl.replace(/\/$/, "");

  if (newUrl === "" || newUrl === "/") {
    return "/";
  }


  return newUrl;
};
/** @type {BaseComponent} */
let outletCtx = null;

const [currentRoute, setCurrentRoute] = signal(
  formatUrl(window.location.pathname)
);

export const useRouter = () => {
  return {
    route: currentRoute,
    // options: {params: string[]; query: string[], state: maybe?}
    navigate: (url, options) => {
      if (isSameUrl(url)) return;

      const formattedUrl = formatUrl(url);

      setTimeout(() => {
        window.history.pushState({}, "", formattedUrl);
        setCurrentRoute(formattedUrl);
      }, 0);
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
// TODO: REFACTOR THIS, IT'S A MESS
export const RoutesProvider = (routeTree) => {
  const container = new BaseComponent("fragment");

  let oldUrlPieces = [];

  const changeUrlEventCallback = () => {
    setCurrentRoute(formatUrl(window.location.pathname));
  };

  changeUrlEventCallback();
  window.addEventListener("popstate", changeUrlEventCallback);

  const getUrlPieces = (url = "") => {
    if (url === "/") return ["/"];

    return url.split("/").map((urlPiece) => (urlPiece === "" ? "/" : urlPiece));
  };

  effectOnDependencies(() => {
    const newUrlPieces = getUrlPieces(currentRoute());
    let rootNode = routeTree;
    let rootComponent = container;

    for (let i = 0; i < newUrlPieces.length; i++) {
      const newUrlPiece = newUrlPieces[i];
      const oldUrlPiece = oldUrlPieces[i];

      const foundRoute = rootNode.find((r) => r.path === newUrlPiece);

      if (newUrlPiece === oldUrlPiece) {
        if (foundRoute?.outlet) {
          rootComponent = foundRoute.outlet;
        }
        rootNode = foundRoute?.routes;
        continue;
      }

      if (!foundRoute) break;
      if (foundRoute.path !== newUrlPiece) break;

      rootNode = foundRoute.routes;

      if (!foundRoute.component) {
        continue;
      } else {
        rootComponent?.removeAllChildren();
        rootComponent?.appendChild(foundRoute.component);
        rootComponent?.renderChildren();

        if (outletCtx) {
          foundRoute.outlet = outletCtx;
          rootComponent = outletCtx;
          outletCtx = null;
        } else {
          rootComponent = undefined;
        }
      }
    }

    if (oldUrlPieces.length !== newUrlPieces.length) {
      rootComponent?.removeAllChildren();
    }

    oldUrlPieces = newUrlPieces;
  }, [currentRoute]);

  return container;
};

export const RouteLink = (...args) => {
  const { href, onclick } = fromArgs(args);

  const onclickLink = (e) => {
    e.preventDefault();

    onclick?.(e);

    let url;
    if (typeof href === "function") {
      url = href();
    } else {
      url = href;
    }

    if (isSameUrl(url)) {
      return;
    }

    url = formatUrl(url);

    window.history.pushState({}, "", url);
    setCurrentRoute(formatUrl(window.location.pathname));
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
  const outlet = new BaseComponent("fragment", [
    props({ name: `RouteOutlet-${Math.random()}` }),
  ]);
  outletCtx = outlet;
  return outlet;
};
RouteOutlet.type = $$RouteOutletSymbol;
