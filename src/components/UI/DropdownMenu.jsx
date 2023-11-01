/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react';

import { ReactComponent as DownCavet } from '../../assets/icons/others/down_cavet.svg';
import { ReactComponent as DoneIcon } from '../../assets/icons/others/done.svg';
import {
  TRADE_OPTIONS,
  HOME_OPTIONS,
  TRADE_TIME_OPTIONS,
} from '../../utils/constants';

function DropdownMenu({ dropdownType, onOptionChange, parentOption }) {
  const ifHome = dropdownType === 'home';

  const [showMenu, setShowMenu] = useState(false);

  const toggleDropdownMenuHandler = (e) => {
    e.stopPropagation();
    setShowMenu((prevs) => !prevs);
  };

  const setDropdownOptionHandler = (e) => {
    const optionData = e.target.dataset.option;
    onOptionChange(optionData);
  };

  const menuOptions = {
    home: HOME_OPTIONS,
    trade: TRADE_OPTIONS,
    tradeTime: TRADE_TIME_OPTIONS,
  };

  const classNames = {
    home: {
      toggleButton:
        'flex relative px-3 w-[128px] bg-gray-light hover:bg-gray-light-hover justify-between items-center rounded-3xl',
      downCavet: 'w-5',
      ul: 'absolute -bottom-[120px] left-0 z-20 w-[140px] bg-white text-start border border-gray-300 rounded-2xl',
      li: 'py-1.5 pl-3 [&>svg]:hidden hover:bg-gray-100 border border-transparent first:rounded-t-2xl last:rounded-b-2xl',
      activeLi:
        'py-1.5 pl-3 pr-1.5 flex justify-between bg-gray-light border border-transparent first:rounded-t-2xl last:rounded-b-2xl',
    },
    trade: {
      toggleButton:
        'flex relative pl-2 pr-1 h-dropdown-trade w-[130px] text-sm font-medium hover:bg-gray-light-hover border-2 border-gray-border rounded-md justify-between items-center',
      downCavet: 'w-4 text-gray-400',
      ul: 'ml-[-2px] absolute -bottom-[148px] w-[130px] left-0 z-20 bg-white text-start border-2 border-gray-border rounded-lg',
      li: 'py-1.5 pl-2 hover:bg-gray-100 border border-transparent first:rounded-t-md last:rounded-b-md',
      activeLi:
        'py-1.5 pl-2 bg-gray-light-hover border border-transparent first:rounded-t-md last:rounded-b-md',
    },
    tradeTime: {
      toggleButton:
        'flex relative pl-2 pr-1 h-dropdown-trade w-[58px] text-sm font-medium hover:bg-gray-light-hover border-2 border-gray-border rounded-md justify-between items-center',
      downCavet: 'w-4 text-gray-400',
      ul: 'ml-[-2px] absolute -bottom-[180px] w-[58px] left-0 z-20 bg-white text-start border-2 border-gray-border rounded-lg',
      li: 'py-1.5 pl-2 hover:bg-gray-100 border border-transparent first:rounded-t-md last:rounded-b-md',
      activeLi:
        'py-1.5 pl-2 bg-gray-light-hover border border-transparent first:rounded-t-md last:rounded-b-md',
    },
  };

  const extendedMenu = (
    <>
      <div
        className="z-10 fixed w-screen h-screen top-0 left-0 cursor-default"
        onClick={toggleDropdownMenuHandler}
        role="button"
        tabIndex="0"
        aria-label="close"
      />
      <ul className={classNames[dropdownType].ul}>
        {menuOptions[dropdownType].map((option) => (
          <li
            onClick={setDropdownOptionHandler}
            key={option}
            data-option={option}
            className={
              parentOption === option
                ? classNames[dropdownType].activeLi
                : classNames[dropdownType].li
            }
          >
            {option}
            {ifHome && <DoneIcon className="w-5 text-my-blue" />}
          </li>
        ))}
      </ul>
    </>
  );

  return (
    <button
      type="button"
      onClick={toggleDropdownMenuHandler}
      className={classNames[dropdownType].toggleButton}
    >
      <p>{parentOption}</p>
      <DownCavet className={classNames[dropdownType].downCavet} />
      {showMenu && extendedMenu}
    </button>
  );
}

export default DropdownMenu;
