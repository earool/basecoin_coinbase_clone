/* eslint-disable no-unused-vars */
import React, { useState } from 'react';

import TransactionActionButtons from './TransactionActionButtons';
import TransactionInputContainer from './TransactionInputContainer';
import SelectionRowsContainer from './SelectionRowsContainer';

function BuySellContainer() {
  const [transactionAction, setTransactionAction] = useState('Buy');

  const transactionActionChangeHandler = (action) => {
    setTransactionAction(action);
  };

  return (
    <div>
      <TransactionActionButtons
        onActionChange={transactionActionChangeHandler}
        activeAction={transactionAction}
      />
      <TransactionInputContainer />
      <SelectionRowsContainer />
    </div>
  );
}

export default BuySellContainer;
