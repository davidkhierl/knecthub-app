import { Route } from 'routes';
import { lazy } from 'react';

const EmailVerify = lazy(() => import('pages/Email/EmailVerify'));

const publicRoutes: Route[] = [
  {
    component: EmailVerify,
    exact: true,
    pageTitle: 'Verify Email',
    path: '/email/verify'
  }
];

export default publicRoutes;
