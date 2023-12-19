import React from 'react';

import { LogoAndNameBS } from '../table_components/LogoAndName';
import { ReactComponent as RightCaret } from '../../../assets/icons/others/right_caret.svg';
import formatPrice from '../../../utils/formatPrice';

function SelectionRow({ iconUrl, name, price, isAsset }) {
  const optionChangeHandler = (e) => {
    // ...
  };

  return (
    <button type="button" className="w-full" onClick={optionChangeHandler}>
      <div className="flex justify-between hover:bg-gray-50 p-2 border-0 rounded-lg">
        <LogoAndNameBS
          isCrypto={isAsset}
          image={iconUrl}
          name={name}
          header={isAsset ? 'Buy' : 'Pay with'}
        />
        <div className="flex items-center">
          <div className="flex flex-col text-right text-sm">
            <span>{isAsset ? `USD ${formatPrice(price)}` : `$${price}`}</span>
            <span className="text-gray-border-darker">
              {isAsset ? 'Price' : 'Available'}
            </span>
          </div>
          <div>
            <RightCaret className="w-4 h-4 ml-2 text-gray-900" />
          </div>
        </div>
      </div>
    </button>
  );
}

export default SelectionRow;
