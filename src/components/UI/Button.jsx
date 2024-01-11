import React from 'react';

function Button({ color, ifFull, onClick, children, disabled }) {
  const colorClass =
    color === 'blue'
      ? 'text-white bg-my-blue hover:bg-my-blue-darker'
      : 'bg-gray-light hover:bg-gray-light-hover';
  const widthClass = ifFull
    ? 'w-full rounded-full py-2 text-lg'
    : 'py-0.5 rounded-3xl';
  const defaultClass = 'px-8';
  const disabledClass = 'disabled:bg-my-blue-disabled';
  // eslint-disable-next-line prettier/prettier
  const classes = [colorClass, widthClass, disabledClass, defaultClass].join(" ");

  return (
    <button
      className={classes}
      onClick={onClick}
      type="button"
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export default Button;
