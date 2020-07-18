import React from 'react';
import "twin.macro";
import tw from "twin.macro"
import Image from "./Image";

const ImageWrap = ({ item, size }) => {
  const Div = size === 'normal' ?
      tw.div`relative h-64` :
      tw.div`relative h-40`;

  return (
      <Div>
        <Image
          resolutions="small"
          alt={item.alt}
          src={item.socialImage}
        />
      </Div>
  )
};

export default ImageWrap;
