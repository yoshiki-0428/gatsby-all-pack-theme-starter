import React, { useRef, useEffect } from 'react';
import tw from "twin.macro"

const Page = ({ title, children }) => {
  const pageRef = useRef();

  useEffect(() => {
    pageRef.current.scrollIntoView();
  });

  const Inner = tw.div`py-12`;
  const Body = tw.div`text-base`;

  return (
    <div ref={pageRef}>
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
