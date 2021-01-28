import { Redirect, Route, RouteProps, useLocation } from 'react-router-dom';

import React from 'react';
import { RootState } from 'redux/store';
import { useSelector } from 'react-redux';

const UnauthenticatedRoute: React.VFC<RouteProps & { redirectTo: string }> = ({
  redirectTo,
  ...props
}) => {
  const location = useLocation();

  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  return isAuthenticated ? (
    <Redirect from={location.pathname} to={redirectTo} exact={props.exact} />
  ) : (
    <Route {...props} />
  );
};

export default UnauthenticatedRoute;
