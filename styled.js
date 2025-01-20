const styled = (tag) => {
  return () => {};
};

const AlgumComponent = styled("div")({
  display: "flex",

  ["&:div > algo"]: {},
});