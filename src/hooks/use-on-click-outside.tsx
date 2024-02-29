// Custom hooks from website that forgot its name

import { RefObject, useEffect } from "react";

type Event = MouseEvent | TouchEvent;

export const useOnClickOutside = <T extends HTMLElement = HTMLElement>(
  ref: RefObject<T>, // 1. passing ref from NavItems
  handler: (event: Event) => void 
) => {
  useEffect(() => {
    // if the element that we click isnt in the target then handler will be called in NavItems
    const listener = (event: Event) => {
      const el = ref?.current;
      if (!el || el.contains((event?.target as Node) || null)) { 
        return;
      }

      handler(event); // Call the handler only if the click is outside of the element passed.
      // () => setActiveIndex(null) is handler in NavItems
    };

    document.addEventListener("mousedown", listener); // 2. listening to dekstop or
    document.addEventListener("touchstart", listener); // listenig to  mobile

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler]); // Reload only if ref or handler changes
};