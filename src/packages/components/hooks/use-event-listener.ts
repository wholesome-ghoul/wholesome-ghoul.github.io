import React from "react";

// TODO: event type
const useEventListener = (
  eventName: string,
  eventHandler: (event: any) => void,
  element: Window | Element | MediaQueryList = window
) => {
  const handler = React.useRef((_event: any) => {});

  React.useEffect(() => {
    handler.current = eventHandler;
  }, [eventHandler]);

  React.useEffect(() => {
    const valid = element && element.addEventListener;
    if (!valid) return;

    const _handler = (event: any) => handler.current(event);

    element.addEventListener(eventName, _handler);

    return () => element.removeEventListener(eventName, _handler);
  }, [element, eventName]);
};

export default useEventListener;
