import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Root() {
  const navigate = useNavigate();
  const loginStatus = useSelector((state) => state.auth.loginStatus);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    if (!loginStatus) {
      navigate('/login');
    }
    setIsLoading(false);
  }, [loginStatus, navigate]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <p>Protected routes</p>
      <Outlet />
    </>
  );
}

export default Root;
