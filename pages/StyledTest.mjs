import { Code, Div, H1, Pre } from "../components.mjs";
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
  overflow: "auto",
  padding: "2rem",
  margin: "auto",
  marginTop: "4rem",
  backgroundColor: () => "#f3f3f3",
  ["h1"]: {
    fontSize: "2rem",
    fontWeight: "bold",
  },
  ["& pre"]: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "white",
    transition: "200ms",
    width: "100%",
    padding: "2rem 4rem",
    backgroundColor: "#222",
    ["&:hover"]: {
      backgroundColor: "#d3d3d3",
      color: "#222",
    },
  },
  ["p"]: {
    color: "red",
    animation: "Teste 2s infinite alternate",

    ["@keyframes Teste"]: {
      0: {
        transform: "translateY(0px)",
      },
      100: {
        transform: "translateY(100px)",
      },
    },
  },

  ["@media(max-width: 1000px)"]: {
    backgroundColor: "purple",
    ["& div"]: {
      backgroundColor: "blue",
      [":hover"]: {
        backgroundColor: "pink",
      },
    },
  },
});

const Another = styled("p")({
  backgroundColor: "blue",
});

// const sx = (...a) => {};

const StyledTestComponent = () => {
  const [pageContent, setPageContent] = signal(undefined);

  const content = () => {
    const pc = pageContent();
    return pc === undefined ? "loading content..." : pc;
  };

  const makeRequest = async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    fetch("/pages/StyledTest.mjs")
      .then((r) => r.text())
      .then((c) => {
        setPageContent(c);
      });
  };
  makeRequest();

  return StyledTestStyle(
    // sx("bg-red-500", "text-white", "p-4", "rounded"),
    H1("This page script content: "),
    Another("Texto"),
    Div(Pre(Code(react(content))))
  );
};

export { StyledTestComponent };
