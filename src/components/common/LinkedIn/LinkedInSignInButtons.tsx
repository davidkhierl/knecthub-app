/* eslint-disable jsx-a11y/mouse-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */

import * as queryString from 'query-string';

import React, { useState } from 'react';

import config from 'config';
import linkedInButtonActive from 'assets/images/linkedin-signin-button/Non-Retina/Sign-in-Large---Active.png';
import linkedInButtonDefault from 'assets/images/linkedin-signin-button/Non-Retina/Sign-in-Large---Default.png';
import linkedInButtonHover from 'assets/images/linkedin-signin-button/Non-Retina/Sign-in-Large---Hover.png';
import linkedInButtonRetinaActive from 'assets/images/linkedin-signin-button/Retina/Sign-In-Large---Active.png';
import linkedInButtonRetinaDefault from 'assets/images/linkedin-signin-button/Retina/Sign-In-Large---Default.png';
import linkedInButtonRetinaHover from 'assets/images/linkedin-signin-button/Retina/Sign-In-Large---Hover.png';

// const LinkedInSignInLink = styled.a`
//   text-decoration: none;
//   display: inline-block;
//   img {
//     display: block;
//     width: 100%;
//     max-width: 215px;
//   }
// `;

const LinkedInSignInButtons = () => {
  const [imageSrc, setImageSrc] = useState(linkedInButtonDefault);

  const [imageSrcSet, setImageSrcSet] = useState(linkedInButtonRetinaDefault);

  const linkedInAuthLink = queryString.stringifyUrl({
    url: 'https://www.linkedin.com/oauth/v2/authorization',
    query: {
      response_type: 'code',
      client_id: config.linkedInClientId,
      redirect_uri: config.linkedInCallbackUrl,
      state: 'd71b2ca8',
      scope: 'r_liteprofile r_emailaddress'
    }
  });

  return (
    // eslint-disable-next-line jsx-a11y/tabindex-no-positive
    <a href={linkedInAuthLink} tabIndex={1}>
      <img
        alt='LinkedIn Signin Button'
        srcSet={imageSrcSet}
        src={imageSrc}
        onMouseOver={() => {
          setImageSrc(linkedInButtonHover);
          setImageSrcSet(linkedInButtonRetinaHover);
        }}
        onMouseLeave={() => {
          setImageSrc(linkedInButtonDefault);
          setImageSrcSet(linkedInButtonRetinaDefault);
        }}
        onBlur={() => {
          setImageSrc(linkedInButtonDefault);
          setImageSrcSet(linkedInButtonRetinaDefault);
        }}
        onMouseDown={() => {
          setImageSrc(linkedInButtonActive);
          setImageSrcSet(linkedInButtonRetinaActive);
        }}
      />
    </a>
  );
};

export default LinkedInSignInButtons;
