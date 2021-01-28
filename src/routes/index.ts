import { RouteProps } from 'react-router-dom';
import { mapRoutes } from 'utils/routeUtils';
import privateRoutes from 'routes/privateRoutes';
import publicRoutes from 'routes/publicRoutes';
import restrictedRoutes from 'routes/restrictedRoutes';
import unauthenticatedOnlyRoutes from 'routes/unauthenticatedOnlyRoutes';

export interface Route extends RouteProps {
  childRoute?: Route[];
  pageTitle?: string;
}

export type Routes = typeof routes;

const routes = mapRoutes({
  privateRoutes,
  publicRoutes,
  restrictedRoutes,
  unauthenticatedOnlyRoutes
});

export default routes;
