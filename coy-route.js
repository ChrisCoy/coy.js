

const [currentRoute, setCurrentRoute] = signal(window.location.pathname);

const RoutesProvider = ({ routesMap = {}, fallBack }) => {
  return ShowMap({
    key: currentRoute,
    map: routesMap,
    fallBack: fallBack,
  });
};

const CoyLink = (...args) => {
  const {href, ...pp} = fromArgs(args);

  const onclick = (e) => {
    e.preventDefault();

    console.log("lol", e.href);

    window.history.pushState({}, "", href);

    setCurrentRoute(href);
  };

  return A(
    ...args,
    props({
      ...pp,
      onclick,
    })
  );
};
