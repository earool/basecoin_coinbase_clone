import React from 'react';

import { TRANSACTION_ACTION_BUTTONS } from '../../../utils/constants';

function TransactionActionButtons({ onActionChange, activeAction }) {
  const buttonArr = TRANSACTION_ACTION_BUTTONS.map((action) => {
    const styleClass = `w-full text-lg hover:bg-gray-light py-3 ${
      activeAction === action
        ? 'border-t-my-blue border border-b-0'
        : 'border border-gray-border border'
    }`;

    return (
      <button
        key={action}
        className={styleClass}
        type="button"
        onClick={() => {
          onActionChange(action);
        }}
      >
        <h1>{action}</h1>
      </button>
    );
  });

  return <div className="flex justify-around">{buttonArr}</div>;
}

export default TransactionActionButtons;
