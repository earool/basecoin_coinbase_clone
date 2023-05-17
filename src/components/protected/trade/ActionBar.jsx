import React from 'react';

import DropdownMenu from '../../UI/DropdownMenu';
import { ReactComponent as SearchIcon } from '../../../assets/icons/others/magnifying_glass.svg';
import { TRADE_OPTIONS } from '../../../utils/constants';

function ActionBar({
  onOptionChange,
  onTimeChange,
  optionDropdown,
  timeDropdown,
}) {
  return (
    <div className="p-3">
      <div className="flex items-center justify-between">
        <div className="max-w-none flex-1 c6:max-w-[50%] flex items-center text-sm px-3 h-dropdown-trade border-2 border-gray-border rounded-lg">
          <div className="text-gray-400 w-5 mr-4 ">
            <SearchIcon />
          </div>
          <input
            className="outline-none w-3/4"
            type="text"
            placeholder="Search all assets"
          />
        </div>
        <div className="flex">
          <div className="mx-2">
            <DropdownMenu
              dropdownType="tradeTime"
              onOptionChange={onTimeChange}
              parentOption={timeDropdown}
            />
          </div>
          <div className="hidden c6:flex">
            <DropdownMenu
              dropdownType="trade"
              onOptionChange={onOptionChange}
              parentOption={optionDropdown}
            />
          </div>
        </div>
      </div>
      <div className="flex c6:hidden justify-between mt-4 px-2 text-sm font-medium">
        {TRADE_OPTIONS.map((option) => (
          <p className="px-3" key={option}>
            {option}
          </p>
        ))}
      </div>
    </div>
  );
}

export default ActionBar;
