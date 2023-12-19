import React from 'react';
import { useLocation } from 'react-router-dom';

import { ReactComponent as UserIcon } from '../../assets/icons/headerbar/user.svg';

function Header({ onShowUserMenu }) {
  const location = useLocation();
  const { pathname } = location;
  const formattedName = pathname.slice(1);

  // sm:w-(calc(100vw-80px)) lg:w-(calc(100vw-200px))
  return (
    <div className="sm:ml-[80px] lg:ml-[200px] fixed top-0 left-0 right-0 border-b-2 h-16 bg-white border-gray-light">
      <div className="flex justify-between items-center px-6 h-full">
        <h3 className="font-medium text-xl">{formattedName}</h3>
        <UserIcon
          onClick={onShowUserMenu}
          className="w-8 h-8 hover:text-gray-600 cursor-pointer"
        />
      </div>
    </div>
  );
}
export default Header;
