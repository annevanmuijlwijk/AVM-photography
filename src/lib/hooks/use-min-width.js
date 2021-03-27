import { useState, useEffect } from "react";
import debounce from "../utils/debounce";

const useMinWidth = (width) => {
  const [match, setMatch] = useState(
    typeof window === "undefined" ? false : window.innerWidth > width
  );

  useEffect(() => {
    if (typeof window === "undefined") return;

    const debouncedSetMatch = debounce(() => {
      setMatch(window.innerWidth > width);
    });

    setMatch(window.innerWidth > width);
    window.addEventListener("resize", debouncedSetMatch);

    return () => window.removeEventListener("resize", debouncedSetMatch);
  }, [width]);

  return match;
};

export default useMinWidth;
