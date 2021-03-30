import { useState } from "react";
import { useWindowResize, useDebouncedFn } from "beautiful-react-hooks";

const useCurrentWindowSize = () => {
  const [width, setWidth] = useState(
    typeof window === "undefined" ? 1 : window.innerWidth
  );
  const [height, setHeight] = useState(
    typeof window === "undefined" ? 1 : window.innerHeight
  );

  const handleWindowResize = useDebouncedFn(() => {
    if (typeof window === "undefined") return;

    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  }, 250);

  useWindowResize(handleWindowResize);

  const size = [width, height];
  size.width = width;
  size.height = height;

  return size;
};

export default useCurrentWindowSize;
