import {
  ListOfRecursiveArraysOrValues,
  flatMapDeep,
  flattenDeep,
  map,
  mapValues,
  reverse,
  sortBy
} from 'lodash';

import { Route } from 'routes';

/**
 * A function generator for flattening nested collection of Route
 * @param routes Array of Route object
 * @param pathPrefix Initial path prefix
 * @returns Route iterator
 */
export function* flattenRoutes(routes: Route[], pathPrefix = ''): Generator<Route> {
  for (const { path, childRoute, ...route } of routes) {
    const newPath = `${pathPrefix}${path}`;
    yield { ...route, path: newPath };
    if (childRoute) yield* flattenRoutes(childRoute, newPath);
  }
}

/**
 * A route utility for flattening Route collection and returning a single level array of paths string
 * @param routes Array of Route object
 * @returns Array of string paths from the Route collection
 */
export const flattenRoutePaths = (routes: Route[]) =>
  flattenDeep(
    [...flattenRoutes(routes)].map((x) => x.path) as
      | ListOfRecursiveArraysOrValues<string>
      | null
      | undefined
  );

/**
 * A route utility that accepts multiple Route as object property and return a flattened items respectively retaining the path object key
 * @param routes
 */
export const mapRoutes = <K extends string>(routes: Record<K, Route[]>) => ({
  ...mapValues(routes, (route) => [...flattenRoutes(route)])
});

/**
 * A route utility for combining all routes and returns in single level array of Routes
 * @param routes Array of routes
 * @param config Optional config for sorting the returned array, defaults to none
 */
export const combineRoutes = <K extends string>(
  routes: Record<K, Route[]>,
  config: { sort?: 'asc' | 'desc' } = {}
): Route[] => {
  const flattenedRoutes = [...flattenRoutes(flatMapDeep(map(routes)))];

  const sortedRoutes = sortBy(flattenedRoutes, (route) => route.path);

  switch (config.sort) {
    case 'asc':
      return sortedRoutes;

    case 'desc':
      return reverse(sortedRoutes);
    default:
      return flattenedRoutes;
  }
};
