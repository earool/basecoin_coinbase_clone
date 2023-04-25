import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Header from '../../components/protected/Header';
import NavBar from '../../components/protected/NavBar';
import UserMenu from '../../components/protected/UserMenu';
import useViewport from '../../hooks/useViewport';
import { MAX_MOBILE_WIDTH } from '../../utils/constants';

function Root() {
  const navigate = useNavigate();

  const { width } = useViewport();

  const loginStatus = useSelector((state) => state.auth.loginStatus);
  const [isLoading, setIsLoading] = useState(true);
  const [userMenuIsShown, setUserMenuIsShown] = useState(false);

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

  const showUserMenu = () => {
    setUserMenuIsShown(true);
  };

  const hideUserMenu = () => {
    setUserMenuIsShown(false);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-smGrid lg:grid-cols-lgGrid">
      {userMenuIsShown && <UserMenu onClose={hideUserMenu} />}
      <NavBar onShowUserMenu={showUserMenu} />
      <Outlet />
      {width > MAX_MOBILE_WIDTH ? <Header onShowUserMenu={showUserMenu} /> : ''}
    </div>
  );
}

export default Root;
