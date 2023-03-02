import { RefObject, useEffect } from "react";

const useOutsideClick = (
  ref: RefObject<HTMLElement>,
  handler: (e: MouseEvent) => void
) => {
  useEffect(() => {
    const listener = (event: any) => {
      if (!event.target || ref.current?.contains(event.target)) {
        return;
      }
      handler(event);
    };

    document.addEventListener("mousedown", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
    };
  }, [ref, handler]);
};

export default useOutsideClick;
