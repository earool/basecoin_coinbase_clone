import React from 'react';

import PopoutHeader from './PopoutHeader';
import OrderPreviewPopout from './OrderPreviewPopout';
import SelectPopout from './SelectPopout';
import CashPopout from './CashPopout';

const popoutTitle = {
  preview: 'Order preview',
  fiat: 'Pay with',
  asset: 'Select asset',
  own: 'Select asset',
};

function BuySellPopout({ onClose, data, onOptionChange }) {
  const { popoutType } = data;
  let content;

  // data depends on popoutType
  if (popoutType === 'preview') {
    // preview -> data: {popoutType, options, transactionAction}
    content = <OrderPreviewPopout data={data} />;
  } else if (popoutType === 'fiat') {
    // fiat: {poputType, amount: cash, name: 'USD Wallet', uuid: 'USD'}
    content = <CashPopout data={data} />;
  } else {
    // own or asset: { popoutType, assetsData, selectedAssetUuid }
    content = <SelectPopout data={data} onOptionChange={onOptionChange} />;
  }

  return (
    <>
      <PopoutHeader title={popoutTitle[popoutType]} onClose={onClose} />
      {content}
    </>
  );
}

export default BuySellPopout;
