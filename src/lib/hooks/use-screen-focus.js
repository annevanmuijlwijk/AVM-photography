import { useMediaQuery } from "beautiful-react-hooks";
import { useState, useCallback } from "react";
import { useGesture } from "react-use-gesture";

import useCurrentWindowSize from "./use-current-window-size";

const createClientXToFocusX = (windowWidth) => (clientX) =>
  (clientX - windowWidth / 2) / (windowWidth / 2);

const createClientYToFocusY = (windowHeight) => (clientY) =>
  (clientY - windowHeight / 2) / (windowHeight / 2);

const cache = {
  x: 0,
  y: 0,
};

if (typeof window !== "undefined") {
  window.addEventListener("mousemove", (e) => {
    cache.x = e.clientX;
    cache.y = e.clientY;
  });
}

const useScreenFocus = () => {
  const [windowWidth, windowHeight] = useCurrentWindowSize();
  const isHover = useMediaQuery("(hover: hover)");

  const clientXToFocusX = useCallback(createClientXToFocusX(windowWidth), [
    windowWidth,
  ]);
  const clientYToFocusY = useCallback(createClientYToFocusY(windowHeight), [
    windowHeight,
  ]);

  const [focusX, setFocusX] = useState(clientXToFocusX(cache.x));
  const [focusY, setFocusY] = useState(clientYToFocusY(cache.y));

  const bindFocus = useGesture({
    onMove: ({ xy: [x, y] }) => {
      if (!isHover) return;

      setFocusX(clientXToFocusX(x));
      setFocusY(clientYToFocusY(y));
    },
  });

  const focusValues = [focusX, focusY];
  focusValues.x = focusX;
  focusValues.y = focusY;

  return [bindFocus, focusValues];
};

export default useScreenFocus;
