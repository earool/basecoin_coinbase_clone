import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import Start from './pages/starting_pages/Start';
import Signup from './pages/starting_pages/Signup';
import Signin from './pages/starting_pages/Signin';
import Root from './pages/protected_pages/Root';
import Home from './pages/protected_pages/Home';
import useAuth from './hooks/useAuth';

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
        element: <Home />,
      },
    ],
  },
]);

function App() {
  useAuth();

  return <RouterProvider router={router} />;
}

export default App;
