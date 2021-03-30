import React, { useEffect } from "react";
import Image from "gatsby-image";
import { useMediaQuery } from "beautiful-react-hooks";

import useScreenFocus from "../lib/hooks/use-screen-focus";
import useCurrentWindowSize from "../lib/hooks/use-current-window-size";

import s from "./ZoomedPhoto.module.scss";

const getRect = (aspectRatio, { width: windowWidth, height: windowHeight }) => {
  const windowRatio = windowWidth / windowHeight;

  const rect = {
    height: windowHeight,
    width: windowWidth,
    top: 0,
    left: 0,
  };

  if (windowRatio < aspectRatio) {
    // wrapper should be full height, so adjust width
    rect.width = windowHeight * aspectRatio;
    rect.left = -1 * ((rect.width - windowWidth) / 2);
  } else {
    // wrapper should be full width, so adjust height
    rect.height = windowWidth / aspectRatio;
    rect.top = -1 * ((rect.height - windowHeight) / 2);
  }

  return rect;
};

const ZoomedPhoto = ({ fluid, onClick }) => {
  const [windowWidth, windowHeight] = useCurrentWindowSize();
  const rect = getRect(fluid.aspectRatio, {
    width: windowWidth,
    height: windowHeight,
  });

  const isHover = useMediaQuery("(hover: hover)");
  const direction = isHover ? -1 : 1;

  const [bindFocus, [focusX, focusY]] = useScreenFocus();

  const translateMaxX = rect.width - windowWidth;
  const translateMaxY = rect.height - windowHeight;

  const x = focusX * (translateMaxX / 2) * direction;
  const y = focusY * (translateMaxY / 2) * direction;

  useEffect(() => {
    if (typeof document === "undefined") return;

    document.body.style = "height: 100vh; overflow-y: hidden;";

    return () => {
      document.body.style = null;
    };
  }, []);

  return (
    <button
      className={s.wrapper}
      style={{
        ...rect,
        transform: `translate3d(${x}px, ${y}px, 0)`,
      }}
      {...bindFocus()}
      onClick={onClick}
    >
      <Image fluid={fluid} className={s.photo} />
    </button>
  );
};

export default ZoomedPhoto;
