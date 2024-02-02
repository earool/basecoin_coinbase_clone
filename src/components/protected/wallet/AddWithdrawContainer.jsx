/* eslint-disable no-nested-ternary */
import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import WalletPopout from './WalletPopout';
import WalletMessage from './WalletMessage';
import FlexibleInput from '../buysell_container/FlexibleInput';
import Button from '../../UI/Button';
import useAnimatingPopout from '../../../hooks/useAnimatingPopout';
import { ADD_WITHDRAW_BUTTONS, FEE } from '../../../utils/constants';

function AddWithdrawContainer() {
  const [action, setAction] = useState('Cash out');
  const [inputValue, setInputValue] = useState('');
  const { cash } = useSelector((store) => store.user.userAssets);

  const {
    isShowed,
    isAnimating,
    togglePopout,
    ContentWrapper,
    DefaultViewWrapper,
    PopoutViewWrapper,
    placeholder,
  } = useAnimatingPopout(500);

  const parsedInputValue = parseFloat(inputValue);
  const isDisabled =
    !parseFloat(inputValue) ||
    (action === 'Cash out' &&
      (parsedInputValue > cash || parsedInputValue < FEE));

  // const cashoutAllHandler = () => {
  //   if (action !== 'Cash out') {
  //     return;
  //   }
  //   const allCashoutAmount = (cash - FEE).toFixed(2);
  //   setInputValue(allCashoutAmount);
  // };

  const buttonArr = ADD_WITHDRAW_BUTTONS.map((btnAction) => {
    const styleClass = `w-full text-lg hover:bg-gray-light py-3 rounded-t border-t-2 ${
      btnAction === action
        ? 'border-t-my-blue'
        : 'border-b-gray-light border-t-gray-light border-b-2'
    } ${btnAction === 'Add cash' ? 'border-r-2 border-r-gray-light' : ''}`;

    return (
      <button
        className={styleClass}
        onClick={() => {
          setAction(btnAction);
          setInputValue('');
        }}
        key={btnAction}
        type="button"
      >
        {btnAction}
      </button>
    );
  });

  let content;

  if (isAnimating) {
    content = placeholder;
  } else {
    content = !isShowed ? (
      <DefaultViewWrapper>
        <div className="flex text-center items-center text-lg [&>button]:h-full [&>button]:flex-1">
          {buttonArr}
        </div>
        <div className="flex  items-center flex-col mt-4 text-gray-700 px-4 h-[170px]">
          <div className="w-full flex justify-center text-[16px]">
            <FlexibleInput
              onInputChange={(value) => setInputValue(value)}
              value={inputValue}
            />
          </div>
          <div className="flex justify-center text-[10px] text-gray-700 text-center italic h-[30px]">
            <WalletMessage
              action={action}
              value={parsedInputValue}
              cash={cash}
            />
          </div>
          {action === 'Cash out' ? (
            <>
              <div className="flex justify-center">
                <Button
                // onClick={cashoutAllHandler}
                >
                  Cash out all
                </Button>
              </div>
              <div className="flex-1" />
            </>
          ) : (
            <span className="h-7" />
          )}
        </div>
        <div className="mb-6 px-4">
          <Button
            color="blue"
            ifFull
            onClick={togglePopout}
            disabled={isDisabled}
          >
            Continue
          </Button>
        </div>
      </DefaultViewWrapper>
    ) : (
      <PopoutViewWrapper>
        <WalletPopout
          onToggle={togglePopout}
          action={action}
          value={parsedInputValue}
          fee={FEE}
          resetInputValue={() => setInputValue('')}
        />
      </PopoutViewWrapper>
    );
  }

  return <ContentWrapper>{content}</ContentWrapper>;
}

export default AddWithdrawContainer;
