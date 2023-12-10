import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Header from '../../components/protected/Header';
import NavBar from '../../components/protected/NavBar';
import UserMenu from '../../components/protected/UserMenu';

function Root() {
  const navigate = useNavigate();

  const isMobile = useSelector((state) => state.deviceWidth.isMobile);
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
    <div className="grid grid-cols-1 sm:grid-rows-smGridHdr sm:grid-cols-smGrid lg:grid-cols-lgGrid">
      {userMenuIsShown && <UserMenu onClose={hideUserMenu} />}
      <NavBar onShowUserMenu={showUserMenu} />
      <div className="mb-[80px] sm:mb-0">
        <Outlet />
      </div>
      {!isMobile ? <Header onShowUserMenu={showUserMenu} /> : ''}
    </div>
  );
}

export default Root;
