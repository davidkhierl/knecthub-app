import * as queryString from 'query-string';

import React, { useEffect } from 'react';

import { Redirect } from 'react-router-dom';
import { useDispatch } from 'react-redux';

// import { loginViaLinkedIn, loginViaLinkedInFail } from 'redux/authSlice';

// import config from 'config';
// import { RootState } from 'redux/store';

const LinkedInCallback = () => {
  const dispatch = useDispatch();
  // const { errors } = useSelector((state: RootState) => state.auth);
  const errors = false;
  useEffect(() => {
    const parsed = queryString.parse(window.location.search);
    const { error_description } = parsed as {
      code: string;
      state?: string;
      error_description?: string;
    };

    if (error_description) {
      // dispatch(
      //   loginViaLinkedInFail([
      //     {
      //       message:
      //         error_description === 'The user cancelled LinkedIn login'
      //           ? 'Authentication cancelled'
      //           : error_description
      //     }
      //   ])
      // );
    } else {
      // dispatch(
      //   loginViaLinkedIn({
      //     code,
      //     state,
      //     callbackUrl: config.linkedInCallbackUrl
      //   })
      // );
    }
  }, [dispatch]);

  return errors ? <Redirect to='/login' /> : <div>Please wait...</div>;
};

export default LinkedInCallback;
