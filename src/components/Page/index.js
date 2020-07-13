import React from 'react';
import tw from "twin.macro"

const Page = ({ title, content, footerContent }) => {
  const Body = tw.div`text-base flex justify-center`;

  return (
      <>
        {title && (
          <>
            <h1 tw="m-4 text-2xl font-bold text-center">{title}</h1>
            <hr tw="my-8 mx-auto w-1/5 border-gray-700"/>
          </>
        )}

        <Body>
          {content}
        </Body>
        <div>
          {footerContent}
        </div>
      </>
  );
};

export default Page;
