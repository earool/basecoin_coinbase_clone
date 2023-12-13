/* eslint-disable no-unused-vars */
import React, { useState } from 'react';

import TransactionActionButtons from './TransactionActionButtons';
import TransactionInputContainer from './TransactionInputContainer';

function BuySellContainer() {
  const [transactionAction, setTransactionAction] = useState('Buy');

  const transactionActionChangeHandler = (action) => {
    setTransactionAction(action);
  };

  return (
    <div>
      <div>
        <TransactionActionButtons
          onActionChange={transactionActionChangeHandler}
          activeAction={transactionAction}
        />
        <TransactionInputContainer />
      </div>
      <div>Select assets</div>
    </div>
  );
}

export default BuySellContainer;
