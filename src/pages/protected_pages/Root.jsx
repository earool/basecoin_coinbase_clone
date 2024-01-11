import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Header from '../../components/protected/Header';
import NavBar from '../../components/protected/NavBar';
import UserMenu from '../../components/protected/UserMenu';
import Spinner from '../../components/UI/Spinner';

function Root() {
  const navigate = useNavigate();

  const isMobile = useSelector((state) => state.deviceWidth.isMobile);
  const loginStatus = useSelector((state) => state.auth.loginStatus);
  const isUserDataFetched = useSelector((state) => state.user.userId);
  const [userMenuIsShown, setUserMenuIsShown] = useState(false);

  useEffect(() => {
    if (!loginStatus) {
      navigate('/signin');
    }
  }, [loginStatus, navigate]);

  if (!isUserDataFetched) {
    return (
      <div className="absolute top-1/2 left-1/2">
        <Spinner />;
      </div>
    );
  }

  const showUserMenu = () => {
    setUserMenuIsShown(true);
  };

  const hideUserMenu = () => {
    setUserMenuIsShown(false);
  };

  return (
    <div className="flex flex-col">
      {userMenuIsShown && <UserMenu onClose={hideUserMenu} />}
      <NavBar onShowUserMenu={showUserMenu} />
      <div className="mb-[80px] sm:mb-0 sm:ml-[80px] lg:ml-[200px] sm:mt-[64px] flex">
        <Outlet />
      </div>
      {!isMobile ? <Header onShowUserMenu={showUserMenu} /> : ''}
    </div>
  );
}

export default Root;
