import { flattenRoutePaths } from 'utils/routeUtils';
import { mapValues } from 'lodash';
import useAppStore from '../store/useAppStore';
import { useMemo } from 'react';

/**
 * A hook for routes to access array of path of every routes
 */
// TODO: convert to zustand store or make simple approach.
const useRoutesPaths = () => {
  const pages = useAppStore((state) => state.pages);

  const routesPaths = useMemo(() => mapValues(pages, (routes) => flattenRoutePaths(routes)), [
    pages
  ]);

  return routesPaths;
};

export default useRoutesPaths;
