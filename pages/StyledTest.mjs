import { Div, H1 } from "../components.mjs";
import { react, signal } from "../signal.mjs";
import { styled } from "../styled.mjs";

const StyledTestStyle = styled("div")({
  display: "flex",
  gap: "1rem",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  width: "100%",
  maxWidth: "1000px",
  height: "500px",
  overflow: "auto",
  margin: "auto",
  marginTop: "4rem",
  backgroundColor: "#f3f3f3",
  ["h1"]: {
    fontSize: "2rem",
    fontWeight: "bold"
  },
  ["& div"]: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "white",
    transition: "200ms",
    width: "100%",
    maxWidth: "800px",
    backgroundColor: "#222",
    ["&:hover"]: {
      backgroundColor: "#d3d3d3",
      color: "#222",
    },
  },

  ["@media(max-width: 1000px)"]: {
    backgroundColor: "purple",
    ["& div"]: {
      backgroundColor: "blue",
    },
  },
});

const StyledTestComponent = () => {
  const [pageContent, setPageContent] = signal(undefined);

  const content = () => {
    const pc = pageContent();
    return pc === undefined ? "loading content..." : pc;
  };

  const makeRequest = async () => {
    await new Promise((resolve) => setTimeout(resolve, 2000));

    fetch("/pages/StyledTest.mjs")
      .then((r) => r.text())
      .then((c) => setPageContent(c));
  };
  makeRequest()

  return StyledTestStyle(H1("This page script content: "), Div(react(content)));
};

export { StyledTestComponent };
