import { Div, List, props } from "./components.mjs";
import { react, signal } from "./signal.mjs";
import { idGenerator } from "./utils.mjs";

const genToastId = idGenerator();

const [toasts, setToasts] = signal([]);

export const ToastProviderGlobal = () => {
  return Div(
    props({
      className: "fixed top-0 right-0 p-4 w-[250px] flex flex-col gap-2",
    }),
    List({
      data: toasts,
      keyExtractor: (toastSignal) => toastSignal().id,
      render: (toastSignal) =>
        Div(
          props({
            className: "bg-white border p-2 rounded-lg w-full text-center",
          }),
          react(() => toastSignal().text)
        ),
    })
  );
};

// TODO: don't allow to change value directly from signal
// TODO: add in the doc guiding to use arrow functions to change value that depends on older values
export const useToast = () => {
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
