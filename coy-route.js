

const [currentRoute, setCurrentRoute] = signal(window.location.pathname);

const RoutesProvider = ({ routesMap = {}, fallBack }) => {
  debugger;
  return ShowMap({
    key: currentRoute,
    map: routesMap,
    fallBack: fallBack,
  });
};

const CoyLink = Fn((...args) => {
  const {href, ...pp} = fromArgs(args);

  const onclick = (e) => {
    e.preventDefault(); // Prevent the default link navigation

    console.log("lol", e.href);

    // Update the browser's history
    window.history.pushState({}, "", href);

    // Update the current route
    setCurrentRoute(href);
  };

  return A(
    ...args,
    props({
      ...pp,
      onclick,
    })
  );
});
