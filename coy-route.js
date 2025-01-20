const [currentRoute, setCurrentRoute] = signal(window.location.pathname);

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
  const [component, setComponent] = signal(new BaseComponent("void"));
  let stack = [];

  const changeUrlEventCallback = (event) => {
    setCurrentRoute(window.location.pathname);
  };

  window.addEventListener("popstate", changeUrlEventCallback);

  const findRoutes = (routesArr, keys) => {
    const [curKey, ...restKeys] = keys;
    let newKey = curKey === "" ? "/" : curKey;
    let foundRoute = false;

    if (keys.length === 0) {
      newKey = "/";
    }

    for (let i = 0; i < routesArr.length; i++) {
      const curRoute = routesArr[i];

      if (curRoute.path === newKey || curRoute.path == "*") {
        foundRoute = true;
        if (curRoute.component) {
          stack.push(curRoute.component);
        }
        if (curRoute.children) {
          findRoutes(curRoute.children, restKeys);
        }
      }
    }

    if(!foundRoute){
      stack = [];
    }
  };

  const runComponent = (compArr, result) => {
    debugger;
    const [curComp, ...restComp] = compArr;

    result = curComp({ outlet: result });

    if (!restComp || restComp.length === 0) {
      return result;
    }

    const lastResult = runComponent(restComp, result);

    return lastResult;
  };

  effect(() => {
    debugger
    stack = [];
    const curRoute = currentRoute();
    if (curRoute === "/" || curRoute === "/index.html") {
      findRoutes(routes, [""]);
    }else if(curRoute.startsWith("/")){
      const [_, ...keys] = curRoute.split("/");
      findRoutes(routes, keys);
    } 
    else {
      const keys = curRoute.split();
      findRoutes(routes, keys);
    }

    console.log(stack);

    if (stack.length > 0) {
      const result = runComponent(stack.reverse(), undefined);

      if (result) {
        setComponent(result);
      }else {
        console.warn("Theres no component for route: ", curRoute);
        setComponent(new BaseComponent("void"));
      }
    }else {
      console.warn("Theres no component for route:", curRoute);
      setComponent(new BaseComponent("void"));
    }
    // const resultComponent = stack.
  });

  return ShowSignalComponent(component);
};

const CoyLink = (...args) => {
  const { href, onclick } = fromArgs(args);

  const onclickLink = (e) => {
    e.preventDefault();

    console.log("onclick", onclick, args);

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
