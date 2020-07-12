import Contacts from "../Contacts";
import Menu from "../Menu";
import React from "react";
import {useSiteMetadata} from "../../hooks";
import tw from "twin.macro";

const Author = () => {
  const { author, menu } = useSiteMetadata();
  const Card = tw.div`p-4 bg-white rounded-b shadow-md`;
  const ImgWrap = tw.span`flex justify-between`;
  const AuthorImg = tw.img`p-0 m-0 w-12 h-12 rounded-full`;
  const AuthorText = tw.p`p-2 text-base`;

  return (
      <Card>
        <ImgWrap>
          <div/><AuthorImg src={author.photo} alt={author.name} /><div/>
        </ImgWrap>
        <AuthorText>{author.bio}</AuthorText>
        <Contacts contacts={author.contacts} />
        <Menu items={menu}/>
      </Card>
  )
};

export default Author;
