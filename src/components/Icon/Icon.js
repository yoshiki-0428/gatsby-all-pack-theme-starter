import React from 'react';
import "twin.macro";

const Icon = ({ name, icon }) => (
    <svg tw="inline-block w-4 h-4 stroke-0 stroke-current fill-current mx-1 text-center font-normal leading-4"
         viewBox={icon.viewBox}
         style={
           {
             fontStyle: "normal",
             fontWeight: "normal",
             speak: "none",
             fontVariant: "normal",
             textTransform: "none"
           }
         }
    >
    <title>{name}</title>
    <path d={icon.path} />
  </svg>
);

export default Icon;
