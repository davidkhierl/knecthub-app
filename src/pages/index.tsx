import { Route, Switch } from 'react-router-dom';

import AuthenticatedRoute from 'components/auth/AuthenticatedRoute';
import ErrorBoundary from 'components/common/ErrorBoundary';
import MainLayout from 'layouts/MainLayout';
import React from 'react';
import UnauthenticatedRoute from 'components/auth/UnauthenticatedRoute';
import useAppStore from 'store/useAppStore';
import useRoutesPaths from 'hooks/useRoutesPaths';

const Pages = () => {
  const { unauthenticatedOnlyRoutes, privateRoutes, publicRoutes } = useAppStore(
    (state) => state.pages
  );

  const {
    unauthenticatedOnlyRoutes: unauthenticatedOnlyRoutePaths,
    privateRoutes: privateRoutePaths
  } = useRoutesPaths();

  const unauthenticatedOnlyPages = (
    <UnauthenticatedRoute path={unauthenticatedOnlyRoutePaths} redirectTo='/home'>
      <ErrorBoundary>
        <Switch>
          {unauthenticatedOnlyRoutes.map((page, key) => (
            <Route key={key} {...page} />
          ))}
        </Switch>
      </ErrorBoundary>
    </UnauthenticatedRoute>
  );

  const privatePages = (
    <AuthenticatedRoute path={privateRoutePaths} redirectTo='login'>
      <MainLayout>
        <ErrorBoundary>
          <Switch>
            {privateRoutes.map((page) => (
              <Route key={typeof page.path === 'string' ? page.path : undefined} {...page} />
            ))}
          </Switch>
        </ErrorBoundary>
      </MainLayout>
    </AuthenticatedRoute>
  );

  const publicPages = publicRoutes.map((page) => (
    <Route key={typeof page.path === 'string' ? page.path : undefined} {...page} />
  ));

  return (
    <ErrorBoundary>
      <Switch>
        {unauthenticatedOnlyPages}
        {privatePages}
        {publicPages}
      </Switch>
    </ErrorBoundary>
  );
};

export default Pages;
