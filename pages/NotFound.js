const NotFound = () => {
  const { route } = useRouter();

  return Div(
    Div("Page ", B(route), " not found"),
    props({
      className:
        "-z-10 fixed inset-0 grid w-screen h-screen place-items-center",
    })
  );
};
