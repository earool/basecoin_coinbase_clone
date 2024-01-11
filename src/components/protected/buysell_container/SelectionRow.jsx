import React from 'react';

import { LogoAndNameBS } from '../table_components/LogoAndName';
import { ReactComponent as RightCaret } from '../../../assets/icons/others/right_caret.svg';
import formatPrice from '../../../utils/formatPrice';

function SelectionRow({ iconUrl, name, title, downPara, upperPara }) {
  return (
    <div className="flex justify-between hover:bg-gray-50 p-2 border-0 rounded-lg">
      <LogoAndNameBS image={iconUrl} name={name} title={title} />
      <div className="flex items-center">
        <div className="flex flex-col text-right text-sm">
          <span>${formatPrice(upperPara)}</span>
          <span className="text-gray-border-darker">{downPara}</span>
        </div>
        <div>
          <RightCaret className="w-4 h-4 ml-2 text-gray-900" />
        </div>
      </div>
    </div>
  );
}

export default SelectionRow;
