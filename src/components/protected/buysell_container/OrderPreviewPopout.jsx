import React from 'react';

import Button from '../../UI/Button';
import { ReactComponent as DollarSign } from '../../../assets/icons/others/dollar.svg';
import formatPrice from '../../../utils/formatPrice';

const leftCells = {
  Buy: {
    div1: 'Pay with',
    div2: 'Price',
    div3: 'Purchase',
    button: 'Buy now',
  },
  Sell: { div1: 'Add to', div2: 'Price', div3: 'Sale', button: 'Sell now' },
  Convert: {
    div1: 'Pay with',
    div2: 'Exchange rate',
    div3: 'Total',
    button: 'Convert now',
  },
};

const buttonText = {
  Buy: 'Buy now',
  Sell: 'Sell now',
  Convert: 'Convert now',
};

function OrderPreviewPopout({ data }) {
  const { options, transactionAction, value } = data;
  const { option1, option2 } = options;

  const buttonHandler = () => {
    console.log(transactionAction);
  };

  const headerAmount = formatPrice(
    transactionAction === 'Convert'
      ? value / option2.price
      : value / option1.price
  );

  const headerSymbol =
    transactionAction === 'Convert' ? option2.symbol : option1.symbol;

  const rightCell1Icon =
    transactionAction === 'Convert' ? (
      <>
        <img src={option1.iconUrl} alt="logo" className="w-6 h-6" />
        <p className="ml-2">{option1.symbol}</p>
      </>
    ) : (
      <>
        <DollarSign className="w-6 h-6 text-my-blue" />
        <p className="ml-1">{option2.name}</p>
      </>
    );

  const rightCell2Span =
    transactionAction === 'Convert' ? (
      <span className="text-right text-xs">
        {`1 ${option1.symbol} =`}
        <br />
        {`${option1.price / option2.price} ${option2.symbol}`}
      </span>
    ) : (
      <span>{`${option1.price} / ${option1.symbol}`}</span>
    );

  const rightCell3Text =
    transactionAction === 'Convert' ? (
      <span className="text-right">
        {`${formatPrice(value / option1.price)} ${option1.symbol}`}
        <br />
        {`USD ${value.toFixed(2)}`}
      </span>
    ) : (
      <span>{`$${value.toFixed(2)}`}</span>
    );

  return (
    <>
      <div className="flex justify-center mb-6 ">
        <h2 className="text-my-blue text-2xl">
          {headerAmount} {headerSymbol}
        </h2>
      </div>
      <div className="[&>div]:flex [&>div]:justify-between [&>div]:mb-4 [&>div]:items-center text-sm mb-11">
        <div>
          <span className="text-gray-400">
            {leftCells[transactionAction].div1}
          </span>
          <div className="flex items-center">{rightCell1Icon}</div>
        </div>
        <div>
          <span className="text-gray-400">
            {leftCells[transactionAction].div2}
          </span>
          {rightCell2Span}
        </div>
        <div>
          <span className="text-gray-400">
            {leftCells[transactionAction].div3}
          </span>
          {rightCell3Text}
        </div>
      </div>
      <Button color="blue" ifFull onClick={buttonHandler}>
        {buttonText[transactionAction]}
      </Button>
    </>
  );
}

export default OrderPreviewPopout;
