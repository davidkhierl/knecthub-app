import { Redirect, Route, RouteProps, useLocation } from 'react-router-dom';

import KnecthubSpinner from 'components/common/Loaders/KnecthubSpinner';
import React from 'react';
import { RootState } from 'redux/store';
import { useSelector } from 'react-redux';

const AuthenticatedRoute: React.FC<RouteProps & { redirectTo: string }> = ({
  redirectTo,
  ...props
}) => {
  const location = useLocation();

  const { isAuthenticated, loading } = useSelector((state: RootState) => state.auth);

  if (loading) return <KnecthubSpinner />;

  return isAuthenticated && !loading ? (
    <Route {...props} />
  ) : (
    <Redirect from={location.pathname} to={redirectTo} exact={props.exact} />
  );
};

export default AuthenticatedRoute;
