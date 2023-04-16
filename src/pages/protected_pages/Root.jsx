import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import useViewport from '../../hooks/useViewport';
import Header from '../../components/protected/Header';
import NavBar from '../../components/protected/NavBar';

function Root() {
  const navigate = useNavigate();

  const { width } = useViewport();
  const breakpoint = 640;

  const loginStatus = useSelector((state) => state.auth.loginStatus);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    if (!loginStatus) {
      navigate('/signin');
    }
    setIsLoading(false);
  }, [loginStatus, navigate]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-smGrid lg:grid-cols-lgGrid">
      <NavBar />
      <Outlet />
      {width > breakpoint ? <Header /> : ''}
    </div>
  );
}

export default Root;
