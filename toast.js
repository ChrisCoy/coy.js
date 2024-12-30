const genToastId = idGenerator();

const [toasts, setToasts] = signal([]);

// TODO: don't render in a proper way
// idea to fix: crete an effect function that accepts which signals it will listen to
const ToastProviderGlobal = () => {
  return Div(
    $props({
      className: "fixed top-0 right-0 p-4 w-[250px]",
    }),
    List({
      data: toasts,
      keyExtractor: (toast) => toast().id,
      render: (toastSignal) =>
        Div(
          $props({
            className: "bg-white border p-2 rounded-lg w-full text-center",
          }),
          text(() => toastSignal().text)
        ),
    })
  );
};

// TODO: don't allow to change value from signal
const useToast = () => {
  const show = (text, time = 2000) => {
    const newId = genToastId();
    const newToasts = [...toasts(), { id: newId, text }];
    setToasts(newToasts);

    setTimeout(() => {
      setToasts(newToasts.filter((t, i) => t.id !== newId));
    }, time);
  };

  return show;
};
