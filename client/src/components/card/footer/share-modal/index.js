import React from 'react'
import {
  EmailShareButton,
  FacebookShareButton,
  TwitterShareButton,
  ViberShareButton,
  EmailIcon,
  FacebookIcon,
  TwitterIcon,
  ViberIcon,
} from 'react-share'

const ShareModal = ({ url }) => {
  return (
    <div className="">
      <EmailShareButton url={url} className="my-1 mr-1">
        <EmailIcon size={29} round />
      </EmailShareButton>
      <FacebookShareButton url={url} className="m-1">
        <FacebookIcon size={29} round />
      </FacebookShareButton>
      <TwitterShareButton url={url} className="m-1">
        <TwitterIcon size={29} round />
      </TwitterShareButton>
      <ViberShareButton url={url} className="m-1">
        <ViberIcon size={29} round />
      </ViberShareButton>
    </div>
  )
}

export default ShareModal
