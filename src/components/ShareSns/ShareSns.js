import * as React from 'react'
import FacebookShareButton from 'react-share/es/FacebookShareButton'
import FacebookIcon from 'react-share/es/FacebookIcon'
import LinkedinShareButton from 'react-share/es/LinkedinShareButton'
import LinkedinIcon from 'react-share/es/LinkedinIcon'
import TwitterShareButton from 'react-share/es/TwitterShareButton'
import TwitterIcon from 'react-share/es/TwitterIcon'
import LineShareButton from 'react-share/es/LineShareButton'
import LineIcon from 'react-share/es/LineIcon'
import "twin.macro";
import { useSiteMetadata } from "../../hooks";

export const ShareSns = ({ articleUrl, articleTitle }) => {
  const { author } = useSiteMetadata();

  return (
      <div tw="text-center">
        <div>
          <FacebookShareButton tw="m-2" url={articleUrl}>
            <FacebookIcon size={32} round />
          </FacebookShareButton>

          <LineShareButton tw="m-2" url={articleUrl}>
            <LineIcon size={32} round />
          </LineShareButton>

          <LinkedinShareButton tw="m-2" url={articleUrl}>
            <LinkedinIcon title={articleTitle} size={32} round />
          </LinkedinShareButton>

          <TwitterShareButton tw="m-2" title={articleTitle} via={author.contacts.twitter} url={articleUrl}>
            <TwitterIcon size={32} round />
          </TwitterShareButton>
        </div>
      </div>
  );
}

