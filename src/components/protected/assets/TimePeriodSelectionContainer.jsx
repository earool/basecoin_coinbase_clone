import React from 'react';
import { TIME_PERIOD_OPTIONS } from '../../../utils/constants';

function TimePeriodSelectionContainer({ onTimeChange }) {
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

  return <ul className="flex justify-around">{buttonArr}</ul>;
}

export default TimePeriodSelectionContainer;
