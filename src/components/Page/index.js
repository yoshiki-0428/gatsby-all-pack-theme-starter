import React from 'react';
import tw from "twin.macro"
import {HR, TITLE_H1} from "../Tailwind";

const Page = ({ title, content, footerContent }) => {
  const Body = tw.div`text-base flex justify-center`;

  return (
      <>
        {title && (
          <>
            <TITLE_H1>{title}</TITLE_H1>
            <HR/>
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
