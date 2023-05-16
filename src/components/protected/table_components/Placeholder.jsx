import React from 'react';

function Placeholder({ ifBigger }) {
  return (
    <div
      className={
        ifBigger
          ? 'w-14 h-5 bg-gray-placeholder animate-pulse'
          : 'w-10 h-4 mx-auto bg-gray-placeholder animate-pulse'
      }
    />
  );
}

export default Placeholder;
