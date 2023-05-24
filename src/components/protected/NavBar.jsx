import React from 'react';

import useViewport from '../../hooks/useViewport';
import IconLink from '../UI/IconLink';
import { ReactComponent as Logo } from '../../assets/icons/headerbar/logo.svg';
import { ReactComponent as Hamburger } from '../../assets/icons/headerbar/hamburger_menu.svg';
import { ReactComponent as Assets } from '../../assets/icons/navbar/assets.svg';
import { ReactComponent as HomeIcon } from '../../assets/icons/navbar/homeIcon.svg';
import { ReactComponent as Pay } from '../../assets/icons/navbar/pay.svg';
import { ReactComponent as Trade } from '../../assets/icons/navbar/trade.svg';
import { MAX_MOBILE_WIDTH } from '../../utils/constants';

function NavBar({ onShowUserMenu }) {
  const { width } = useViewport();

  const navIcons = (
    <>
      <IconLink path="/home" name="Home">
        <HomeIcon />
      </IconLink>
      <IconLink path="/assets" name="Assets">
        <Assets />
      </IconLink>
      <IconLink path="/pay" name="Pay">
        <Pay />
      </IconLink>
      <IconLink path="/trade" name="Trade">
        <Trade />
      </IconLink>
    </>
  );

  return width < MAX_MOBILE_WIDTH ? (
    <>
      <nav className="flex justify-between items-center py-2 px-4 border-b-2 border-gray-light">
        <Logo className="text-my-blue cursor-pointer hover:text-my-blue-darker w-6" />
        <Hamburger onClick={onShowUserMenu} className="w-6 cursor-pointer" />
      </nav>
      <nav className="border-t-2 bg-white border-gray-light fixed left-0 bottom-0 w-full flex justify-around">
        {navIcons}
      </nav>
    </>
  ) : (
    <nav className="h-screen flex flex-col border-x-2 border-gray-light col-start-1 col-end-2 row-start-1 row-end-3">
      <div className="mt-5 mb-3 ">
        <div className="mx-auto w-[40px] lg:w-[136px]">
          <Logo className="text-my-blue cursor-pointer hover:text-my-blue-darker w-9" />
        </div>
      </div>
      <div>{navIcons}</div>
    </nav>
  );
}

export default NavBar;
