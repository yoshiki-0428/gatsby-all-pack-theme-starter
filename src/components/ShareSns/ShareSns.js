import * as React from 'react'
import FacebookShareButton from 'react-share/es/FacebookShareButton'
import FacebookIcon from 'react-share/es/FacebookIcon'
import LinkedinShareButton from 'react-share/es/LinkedinShareButton'
import LinkedinIcon from 'react-share/es/LinkedinIcon'
import TwitterShareButton from 'react-share/es/TwitterShareButton'
import TwitterIcon from 'react-share/es/TwitterIcon'
import LineShareButton from 'react-share/es/LineShareButton'
import LineIcon from 'react-share/es/LineIcon'
import "twin.macro"

export const ShareSns = ({ articleUrl, articleTitle }) => (
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

      {/*TODO env 他のアイコン*/}
      <TwitterShareButton tw="m-2" title={articleTitle} via="yoshiki__0428" url={articleUrl}>
        <TwitterIcon size={32} round />
      </TwitterShareButton>
    </div>
  </div>
);

