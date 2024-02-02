import React from 'react';

import { FEE } from '../../../utils/constants';

function WalletMessage({ action, value, cash }) {
  const belowLimit = value < FEE;
  const noFunds = !cash;
  const hasInsufficientFunds = value > cash;
  const hasSufficientFundsAfterFee = value > cash + FEE;

  let message = <p />;

  if (value === '') {
    // No message when value is empty
  } else {
    switch (action) {
      case 'Add cash':
        message = belowLimit && (
          <p>
            The minimum add cash amount <br />
            is ${FEE + 0.01}.
          </p>
        );
        break;
      case 'Cash out':
        if (noFunds) {
          message = (
            <p>
              You do not have any funds available to
              <br />
              cash out right now.
            </p>
          );
        } else if (belowLimit) {
          message = (
            <p>
              The minimum cash out amount <br />
              is ${FEE + 0.01}.
            </p>
          );
        } else if (hasSufficientFundsAfterFee) {
          message = (
            <p>
              You need to have ${value + FEE} to cash
              <br />
              out because the fee is ${FEE}.
              <br />
              You only have ${cash}.
            </p>
          );
        } else if (hasInsufficientFunds) {
          message = (
            <p>
              You only have ${cash} available to cash
              <br />
              out right now.
            </p>
          );
        }
        break;
      default:
        break;
    }
  }

  return message;
}

export default WalletMessage;
