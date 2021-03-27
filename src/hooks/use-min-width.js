import { useState, useEffect } from "react";

const useMinWidth = (width) => {
  const [match, setMatch] = useState(
    typeof window === "undefined" ? false : window.innerWidth > width
  );

  useEffect(() => {
    if (typeof window === "undefined") return;

    const checkMatch = () => {
      setMatch(window.innerWidth > width);
    };

    checkMatch();
    window.addEventListener("resize", checkMatch);

    return () => window.removeEventListener("resize", checkMatch);
  }, [width]);

  return match;
};

export default useMinWidth;
