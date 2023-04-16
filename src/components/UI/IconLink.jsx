import React from 'react';
import { NavLink } from 'react-router-dom';

function IconLink({ children, path, name }) {
  return (
    <NavLink
      to={path}
      className={({ isActive }) =>
        isActive ? 'text-my-blue sm:bg-gray-light' : ''
      }
    >
      <div className="mx-auto bg-inherit flex items-center w-14 lg:w-[160px] py-3 px-4 lg:px-5 my-4 rounded-full sm:hover:bg-gray-light-hover">
        <div className="w-6">{children}</div>
        <p className="hidden lg:block lg:ml-3">{name}</p>
      </div>
    </NavLink>
  );
}

export default IconLink;
