import { useEffect, useRef, MutableRefObject } from "react";

export const useClickOutside = <T extends HTMLElement>(
  func: () => void,
): MutableRefObject<T | null> => {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as HTMLElement)) {
        func();
      }
    };
    document.addEventListener("click", handleClick, true);

    return () => {
      document.removeEventListener("click", handleClick, true);
    };
  }, [func]);

  return ref;
};
