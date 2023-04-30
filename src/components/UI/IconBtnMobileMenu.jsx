import React from 'react';

function IconBtnMobileMenu({ children, name, myStyle }) {
  const defaultStyle = 'flex-col items-center w-16';
  return (
    <div className={defaultStyle.concat(' ', myStyle)}>
      <button
        type="button"
        className="mb-2 [&>svg]:w-5 [&>svg]:h-5 p-1 rounded-full text-white  bg-my-blue hover:bg-my-blue-darker"
      >
        {children}
      </button>
      <p className="text-sm text-gray-500">{name}</p>
    </div>
  );
}
export default IconBtnMobileMenu;
