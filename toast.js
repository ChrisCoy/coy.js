const genToastId = idGenerator();

const [toasts, setToasts] = signal([]);

const ToastProviderGlobal = () => {
  return List({
    data: toasts,
    keyExtractor: (toastSignal) => toastSignal().id,
    container: Div(
      props({
        className: "fixed top-0 right-0 p-4 w-[250px] flex flex-col gap-2",
      })
    ),
    render: (toastSignal) =>
      Div(
        props({
          className: "bg-white border p-2 rounded-lg w-full text-center",
        }),
        text(() => toastSignal().text)
      ),
  });
};

// TODO: don't allow to change value directly from signal
// TODO: add in the doc guiding to use arrow functions to change value that depends on older values
const useToast = () => {
  const show = (text, time = 2000) => {
    const newId = genToastId();
    const newToasts = [...toasts(), { id: newId, text }];
    setToasts(newToasts);

    setTimeout(() => {
      setToasts((t) => t.filter((t) => t.id !== newId));
    }, time);
  };

  return show;
};
