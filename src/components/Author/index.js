import Contacts from "../Contacts";
import Menu from "../Menu";
import React from "react";
import {useSiteMetadata} from "../../hooks";
import {CENTER_PHOTO, SPACER, SPACER_MINI, TEXT_BASE} from "../Tailwind";

const Author = () => {
  const { author, menu } = useSiteMetadata();

  return (
      <SPACER_MINI>
        <CENTER_PHOTO photo={author.photo} name={author.name} />
        <SPACER_MINI>
          <TEXT_BASE>{author.bio}</TEXT_BASE>
        </SPACER_MINI>
        <Contacts contacts={author.contacts} />
        <Menu items={menu}/>
      </SPACER_MINI>
  )
};

export default Author;
