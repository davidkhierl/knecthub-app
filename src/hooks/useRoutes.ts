import { combineRoutes } from 'utils/routeUtils';
import useAppStore from '../store/useAppStore';
import { useMemo } from 'react';

/**
 * A hooks to access all routes in a single array
 */
function useRoutes(config?: { sort?: 'asc' | 'desc' }) {
  const pages = useAppStore((state) => state.pages);

  const combinedRoutes = useMemo(() => combineRoutes(pages, config), [config, pages]);

  return combinedRoutes;
}

export default useRoutes;
