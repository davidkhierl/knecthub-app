import { Route } from 'routes';
import { lazy } from 'react';

const Login = lazy(() => import('pages/Login'));
const Register = lazy(() => import('pages/Register'));
const PasswordReset = lazy(() => import('pages/Password/PasswordReset'));
const LinkedInCallback = lazy(() => import('pages/LinkedIn/LinkedInCallback'));

const unauthenticatedOnlyRoutes: Route[] = [
  {
    component: Login,
    exact: true,
    pageTitle: 'Login',
    path: '/login'
  },
  {
    component: Register,
    exact: true,
    pageTitle: 'Register',
    path: '/register'
  },
  {
    component: LinkedInCallback,
    exact: true,
    path: '/auth/linkedin/callback'
  },
  {
    component: PasswordReset,
    exact: true,
    pageTitle: 'Reset Password',
    path: '/password/reset'
  }
];

export default unauthenticatedOnlyRoutes;
