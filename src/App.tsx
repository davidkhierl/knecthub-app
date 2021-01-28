import React, { Suspense, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { authFailed, reloadAuth } from 'redux/authSlice';

import AuthenticatedRoute from 'components/auth/AuthenticatedRoute';
import ErrorBoundary from 'components/common/ErrorBoundary';
import KnecthubSpinner from 'components/common/Loaders/KnecthubSpinner';
import MainLayout from 'layouts/MainLayout';
import UnauthenticatedRoute from 'components/auth/UnauthenticatedRoute';
import useAppStore from 'store/useAppStore';
import { useDispatch } from 'react-redux';
import useRoutesPaths from 'hooks/useRoutesPaths';

function App() {
  const dispatch = useDispatch();

  // load existing user
  useEffect(() => {
    window.localStorage.getItem('user') ? dispatch(reloadAuth()) : dispatch(authFailed());
  }, [dispatch]);

  const { unauthenticatedOnlyRoutes, privateRoutes, publicRoutes } = useAppStore(
    (state) => state.pages
  );

  const {
    unauthenticatedOnlyRoutes: unauthenticatedOnlyRoutePaths,
    privateRoutes: privateRoutePaths
  } = useRoutesPaths();

  const unauthenticatedOnlyPages = (
    <UnauthenticatedRoute path={unauthenticatedOnlyRoutePaths} redirectTo='/' exact>
      <Switch>
        {unauthenticatedOnlyRoutes.map((page, key) => (
          <Route key={key} {...page} />
        ))}
      </Switch>
    </UnauthenticatedRoute>
  );

  const privatePages = (
    <AuthenticatedRoute path={privateRoutePaths} redirectTo='/login'>
      <MainLayout>
        <Switch>
          {privateRoutes.map((page) => (
            <Route key={typeof page.path === 'string' ? page.path : undefined} {...page} />
          ))}
        </Switch>
      </MainLayout>
    </AuthenticatedRoute>
  );

  const publicPages = publicRoutes.map((page) => (
    <Route key={typeof page.path === 'string' ? page.path : undefined} {...page} />
  ));

  // TODO: Refactor to efficient routing.
  return (
    <Suspense fallback={<KnecthubSpinner className='h-full mx-auto' />}>
      <ErrorBoundary>
        <Switch>
          {publicPages}
          {unauthenticatedOnlyPages}
          {privatePages}
        </Switch>
      </ErrorBoundary>
    </Suspense>
  );
}

export default App;
