import { matchPath, useLocation } from 'react-router-dom';

import { combineRoutes } from 'utils/routeUtils';
import { find } from 'lodash';
import routes from 'routes';
import { useMemo } from 'react';

/**
 * A hook to access the current route object being used based on current url path.
 * @param currentPath Current URL path
 */
function useCurrentRoute(currentPath?: string) {
  const location = useLocation();

  const route = useMemo(
    () =>
      find(
        combineRoutes(routes, { sort: 'desc' }),
        ({ path, exact, strict }) =>
          matchPath(currentPath ? currentPath : location.pathname, {
            path,
            exact,
            strict
          }) !== null
      ),

    [currentPath, location.pathname]
  );

  return route;
}

export default useCurrentRoute;
