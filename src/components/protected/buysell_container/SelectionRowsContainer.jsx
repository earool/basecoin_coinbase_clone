import React from 'react';

import SelectionRow from './SelectionRow';

// Buy: assets -> fiat
// Sell: ownAssets -> fiat
// Convert: ownAssets -> assets

function SelectionRowsContainer({ transactionAction, options, onToggle }) {
  const { option1, option2 } = options;

  const rowContent = {
    Buy: {
      title: ['Buy', 'Pay with'],
      upperPara: [option1.price, option2.amount],
      downPara: ['Price', 'Available'],
      button: `Buy ${option1.name}`,
      type: ['asset', 'fiat'],
    },
    Sell: {
      title: ['Sell', 'Add to'],
      upperPara: [option1.price * option1.amount, option2.amount],
      downPara: ['Available', 'Balance'],
      button: `Sell ${option1.name}`,
      type: ['own', 'fiat'],
    },
    Convert: {
      title: ['From', 'To'],
      upperPara: [option1.price * option1.amount, option2.price], // option1 should be amount
      downPara: ['Available', 'Price'],
      button: `Convert ${option1.name}`,
      type: ['own', 'asset'],
    },
  };

  const optionChangeHandler = (e) => {
    const { type, position, option } = e.currentTarget.dataset;
    onToggle(type, position, option);
  };

  return (
    <div className="pt-5 px-5">
      <button
        type="button"
        className="w-full"
        onClick={optionChangeHandler}
        data-option={option1.uuid}
        data-type={rowContent[transactionAction].type[0]}
        data-position="1"
      >
        <SelectionRow
          iconUrl={option1.iconUrl}
          name={option1.name}
          upperPara={rowContent[transactionAction].upperPara[0]}
          downPara={rowContent[transactionAction].downPara[0]}
          title={rowContent[transactionAction].title[0]}
          data-position="2"
        />
      </button>
      <button
        type="button"
        className="w-full"
        onClick={optionChangeHandler}
        data-option={option2.uuid}
        data-type={rowContent[transactionAction].type[1]}
      >
        <SelectionRow
          uuid={option2.uuid}
          iconUrl={option2.iconUrl}
          name={option2.name}
          upperPara={rowContent[transactionAction].upperPara[1]}
          downPara={rowContent[transactionAction].downPara[1]}
          title={rowContent[transactionAction].title[1]}
          type={rowContent[transactionAction].type[1]}
        />
      </button>
    </div>
  );
}

export default SelectionRowsContainer;
