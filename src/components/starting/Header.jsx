import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function Header() {
  const { pathname } = useLocation();

  return (
    <header className=" gray-border border-b-2 h-16">
      <div className="max-w-5xl flex justify-between items-center p-4 h-full mx-auto my-0">
        <Link to="/">
          <p className="text-3xl h-full text-my-blue font-medium">BaseCoin</p>
        </Link>
        <div className="flex items-center">
          <Link to="/signin" className="mr-3 hover:text-my-blue">
            Sign in
          </Link>
          {pathname === '/signup' ? null : (
            <Link to="/signup" className="px-4 py-2 rounded-md custom-bg-btn">
              Get started
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
