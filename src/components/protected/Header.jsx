import React from 'react';
import { useLocation } from 'react-router-dom';

import { ReactComponent as UserIcon } from '../../assets/icons/headerbar/user.svg';

function Header({ onShowUserMenu }) {
  const location = useLocation();
  const { pathname } = location;
  const formattedName = pathname.slice(1);

  return (
    <div className="border-b-2 h-16 border-gray-light col-start-2 col-end-3 row-start-1 row-end-2">
      <div className="mx-6 h-full flex justify-between items-center">
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
