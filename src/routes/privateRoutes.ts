import { Route } from 'routes';
import { lazy } from 'react';

const Account = lazy(() => import('pages/Account'));
const Home = lazy(() => import('pages/Home'));
const Profile = lazy(() => import('pages/Profile/ProfileMe'));
const NotFound = lazy(() => import('pages/NotFound'));

const privateRoutes: Route[] = [
  {
    component: Account,
    pageTitle: 'Account Settings',
    path: '/settings'
  },
  {
    component: Profile,
    exact: true,
    pageTitle: 'Profile',
    path: '/profile/me',
    childRoute: [
      {
        component: NotFound,
        pageTitle: 'Page not found',
        path: '/*'
      }
    ]
  },
  {
    component: Home,
    exact: true,
    path: '/'
  },
  {
    component: NotFound,
    pageTitle: 'Page not found',
    path: '*'
  }
];

export default privateRoutes;
