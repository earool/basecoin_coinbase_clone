import React from 'react';
import { useLocation } from 'react-router-dom';

function Header() {
  const location = useLocation();
  const { pathname } = location;
  const formattedName = pathname.slice(1);

  return (
    <div className="border-b-2 border-gray-light col-start-2 col-end-3 row-start-1 row-end-2">
      <h3 className="m-3 ml-5 font-medium text-xl">{formattedName}</h3>
    </div>
  );
}
export default Header;
