import tw from "twin.macro";
import React from "react";
import { Link } from 'gatsby';

export const HR = tw.hr`my-4 mx-auto w-1/5 border-gray-700`;
export const TITLE_H1 = tw.h1`text-2xl text-center font-bold`;
export const TITLE_H2 = tw.h2`text-xl text-center font-bold`;
export const TITLE_H3 = tw.h3`text-base text-center font-bold`;
export const TEXT_GATSBY_LINK_H1 = ({ to, children }) =>
    <div tw="text-center">
      <Link tw="text-2xl font-bold text-gray-700 hover:underline" to={to}>{children}</Link>
    </div>;
export const TEXT_GATSBY_LINK_H3 = ({ to, children }) =>
    <div tw="text-center">
      <Link tw="text-base font-bold text-gray-700 hover:underline" to={to}>{children}</Link>
    </div>;
export const TEXT_BASE = tw.div`text-gray-700 text-base`;
export const TEXT_BASE_CENTER = tw.div`text-gray-700 text-base text-center`;
export const TEXT_GATSBY_LINK = ({ to, children }) =>
    <div tw="text-center">
      <Link tw="text-base text-blue-700 hover:underline" to={to}>{children}</Link>
    </div>;

export const BUTTON_CENTER = ({ to, children }) =>
    <div tw="p-4 text-center">
      <Link tw="bg-transparent hover:underline font-semibold py-2 px-4 border rounded" to={to}>{children}</Link>
    </div>;

export const CARD = ({ mb = false, children}) => {
  const Inner = mb ? tw.div`mb-0` : tw.div`mb-10`;
  const Card = mb ? tw.div`bg-white rounded-tr rounded-tl shadow-md` : tw.div`bg-white rounded shadow-md`;
  return (
      <Inner>
        <Card>{children}</Card>
      </Inner>
  )
};

export const SPACER_MINI = tw.div`px-3 py-2`;
export const SPACER = tw.div`px-6 py-4`;
export const CENTER_PHOTO = ({ photo, name }) => {
  const ImgWrap = tw.span`flex justify-between`;
  const AuthorImg = tw.img`p-0 m-0 w-12 h-12 rounded-full`;
  return (
      <ImgWrap>
        <div/><AuthorImg src={photo} alt={name} /><div/>
      </ImgWrap>
  )
};