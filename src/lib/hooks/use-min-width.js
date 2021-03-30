import { useState } from "react";
import { useWindowResize, useDebouncedFn } from "beautiful-react-hooks";

const useMinWidth = (width) => {
  const [match, setMatch] = useState(
    typeof window === "undefined" ? false : window.innerWidth > width
  );

  const handleWindowResize = useDebouncedFn(() => {
    setMatch(window.innerWidth > width);
  });

  useWindowResize(handleWindowResize);

  return match;
};

export default useMinWidth;
