import React from 'react';

import DropdownMenu from '../../UI/DropdownMenu';
import { TIME_PERIOD_OPTIONS } from '../../../utils/constants';

function TimePeriodSelectionContainer({ onTimeChange, timeOption, isMobile }) {
  if (isMobile) {
    return (
      <DropdownMenu
        dropdownType="time"
        onOptionChange={onTimeChange}
        parentOption={timeOption}
      />
    );
  }

  const buttonArr = TIME_PERIOD_OPTIONS.map((option) => {
    return (
      <li key={option}>
        <button
          data-option={option}
          onClick={(e) => onTimeChange(e.target.dataset.option)}
          type="button"
          className="hover:text-gray-700 transition duration-300"
        >
          {option}
        </button>
      </li>
    );
  });
  return (
    <div className="text-xs text-gray-500 font-semibold w-[180px]">
      <ul className="flex justify-around">{buttonArr}</ul>
    </div>
  );
}

export default TimePeriodSelectionContainer;
