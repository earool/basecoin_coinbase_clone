import React from 'react';
import capitalizeWord from '../../../utils/capitalizeWord';

function LogoAndName({ image, symbol, id }) {
  return (
    <div className="flex items-center">
      <img src={image} alt="logo" className="w-9" />
      <div className="ml-2">
        <h6 className="font-medium">{capitalizeWord(id)}</h6>
        <p className="text-sm text-gray-border-darker">
          {symbol.toUpperCase()}
        </p>
      </div>
    </div>
  );
}

export default LogoAndName;
