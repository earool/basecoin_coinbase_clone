import React from 'react';

function Button({ color, ifFull, onClick, children }) {
  const colorClass =
    color === 'blue'
      ? 'text-white bg-my-blue hover:bg-my-blue-darker'
      : 'bg-gray-light hover:bg-gray-light-hover';
  const widthClass = ifFull
    ? 'w-full rounded-full py-2 text-lg'
    : 'py-0.5 rounded-3xl';
  const defaultClass = 'px-8';
  const classes = [colorClass, widthClass, defaultClass].join(' ');

  return (
    <button className={classes} onClick={onClick} type="button">
      {children}
    </button>
  );
}

export default Button;
