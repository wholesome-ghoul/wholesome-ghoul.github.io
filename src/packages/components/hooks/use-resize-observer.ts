import React from "react";

type Reaction = (entry: ResizeObserverEntry) => void;

const useResizeObserver = (elem: Element, reaction: Reaction) => {
  const reactionRef = React.useRef<Reaction | null>(null);
  const resizeObserverRef = React.useRef<ResizeObserver | null>(null);

  React.useEffect(() => {
    reactionRef.current = reaction;

    const resizeObserver = new ResizeObserver((entries) => {
      if (reactionRef.current) {
        for (const entry of entries) {
          reactionRef.current(entry);
        }
      }
    });

    resizeObserverRef.current = resizeObserver;
  }, [reaction]);

  React.useEffect(() => {
    if (resizeObserverRef.current) {
      resizeObserverRef.current.observe(elem);

      return () => {
        resizeObserverRef.current && resizeObserverRef.current.unobserve(elem);
      };
    }
  }, [elem]);
};

export default useResizeObserver;
