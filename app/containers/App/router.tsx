import LoginContainer, { AuthRedirectLoadable } from '@containers/Auth/Loadable';
import Login from '@containers/Auth/Login/Loadable';
import { Logout } from '@containers/Auth/Logout';
import UserProfile from '@containers/Profile';
import { createBrowserRouter } from 'react-router-dom';
import RootErrorPage from './RootErrorPage';
import RootLayout from './RootLayout';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <RootErrorPage />,
    children: [
      {
        lazy: LoginContainer,
        children: [
          {
            path: 'login',
            lazy: Login,
          },
        ],
      },
      {
        lazy: AuthRedirectLoadable,
        children: [
          {
            path: 'logout',
            element: <Logout />,
          },
          {
            path: '/home',
            element: <UserProfile />,
          },
        ],
      },
    ],
  },
]);

export default router;
