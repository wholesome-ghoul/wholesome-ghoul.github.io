import useDarkMode from "./use-dark-mode";
import usePrefersDarkMode from "./use-prefers-dark-mode";
import useLocalStorage from "./use-local-storage";
import useEventListener from "./use-event-listener";
import useResizeObserver from "./use-resize-observer";

const hooks = {
  usePrefersDarkMode,
  useLocalStorage,
  useEventListener,
  useDarkMode,
  useResizeObserver,
};

export default hooks;
export {
  usePrefersDarkMode,
  useLocalStorage,
  useEventListener,
  useDarkMode,
  useResizeObserver,
};
