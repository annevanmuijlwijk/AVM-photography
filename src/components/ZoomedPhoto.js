import React from "react";
import Image from "gatsby-image";

import useCurrentWindowSize from "../lib/hooks/use-current-window-size";

import s from "./ZoomedPhoto.module.scss";

const ZoomedPhoto = ({ fluid, onClick }) => {
  const [windowWidth, windowHeight] = useCurrentWindowSize();
  const windowRatio = windowWidth / windowHeight;

  const rect = {
    height: windowHeight,
    width: windowWidth,
    top: 0,
    left: 0,
  };

  console.log(windowRatio, fluid.aspectRatio);

  if (windowRatio < fluid.aspectRatio) {
    // wrapper should be full height, so adjust width
    rect.width = windowHeight * fluid.aspectRatio;
    rect.left = -1 * ((rect.width - windowWidth) / 2);
  } else {
    // wrapper should be full width, so adjust height
    rect.height = windowWidth / fluid.aspectRatio;
    rect.top = -1 * ((rect.height - windowHeight) / 2);
  }

  return (
    <button className={s.wrapper} style={rect} onClick={onClick}>
      <Image fluid={fluid} className={s.photo} />
    </button>
  );
};

export default ZoomedPhoto;
