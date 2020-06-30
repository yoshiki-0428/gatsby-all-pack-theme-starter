import * as React from 'react'
import FacebookShareButton from 'react-share/es/FacebookShareButton'
import FacebookIcon from 'react-share/es/FacebookIcon'
import LinkedinShareButton from 'react-share/es/LinkedinShareButton'
import LinkedinIcon from 'react-share/es/LinkedinIcon'
import TwitterShareButton from 'react-share/es/TwitterShareButton'
import TwitterIcon from 'react-share/es/TwitterIcon'
import LineShareButton from 'react-share/es/LineShareButton'
import LineIcon from 'react-share/es/LineIcon'
import "./ShareSns.css"

export const ShareSns = ({ articleUrl, articleTitle }) => (
  <div className={'ShareSns'}>
    <div>
      <FacebookShareButton url={articleUrl}>
        <FacebookIcon size={32} round />
      </FacebookShareButton>

      <LineShareButton url={articleUrl}>
        <LineIcon size={32} round />
      </LineShareButton>

      <LinkedinShareButton url={articleUrl}>
        <LinkedinIcon title={articleTitle} size={32} round />
      </LinkedinShareButton>

      <TwitterShareButton title={articleTitle} via="yoshiki__0428" url={articleUrl}>
        <TwitterIcon size={32} round />
      </TwitterShareButton>
    </div>
  </div>
);

