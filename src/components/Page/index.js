import React from 'react';
import tw from "twin.macro"

const Page = ({ title, children }) => {
  const Inner = tw.div``;
  const Body = tw.div`text-base flex justify-center`;

  return (
      <div>
        <Inner>
          { title && <h1>{title}</h1>}
          <Body>
            {children}
          </Body>
        </Inner>
      </div>
  );
};

export default Page;
