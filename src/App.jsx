import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import Start from './pages/starting_pages/Start';
import Signup from './pages/starting_pages/Signup';
import Signin from './pages/starting_pages/Signin';
import Root from './pages/protected_pages/Root';
import HomePage from './pages/protected_pages/HomePage';
import TradePage from './pages/protected_pages/TradePage';
import WalletPage from './pages/protected_pages/WalletPage';
import AssetsPage from './pages/protected_pages/AssetsPage';
import useAuth from './hooks/useAuth';
import useMobileCheck from './hooks/useMobileCheck';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Start />,
  },
  {
    path: 'signin',
    element: <Signin />,
  },
  {
    path: 'signup',
    element: <Signup />,
  },
  {
    path: '',
    element: <Root />,
    children: [
      {
        path: 'home',
        element: <HomePage />,
      },
      { path: 'trade', element: <TradePage /> },
      { path: 'assets', element: <AssetsPage /> },
      { path: 'wallet', element: <WalletPage /> },
    ],
  },
]);

function App() {
  const TargetElement = useMobileCheck();
  useAuth();

  return (
    <>
      <RouterProvider router={router} />
      {TargetElement}
    </>
  );
}

export default App;
