import { useState, useEffect } from "react";

import debounce from "../utils/debounce";

const useCurrentWindowSize = () => {
  const [width, setWidth] = useState(
    typeof window === "undefined" ? 1 : window.innerWidth
  );
  const [height, setHeight] = useState(
    typeof window === "undefined" ? 1 : window.innerHeight
  );

  useEffect(() => {
    if (typeof window === "undefined") return;

    setWidth(window.innerWidth);
    setHeight(window.innerHeight);

    const debouncedSetSize = debounce(() => {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
    });

    window.addEventListener("resize", debouncedSetSize);
    return () => window.removeEventListener("resize", debouncedSetSize);
  }, []);

  const size = [width, height];
  size.width = width;
  size.height = height;

  return size;
};

export default useCurrentWindowSize;
