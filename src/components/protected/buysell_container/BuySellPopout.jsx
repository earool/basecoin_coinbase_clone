import React, { useEffect, useRef } from 'react';

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

function BuySellPopout({ onClose, data, onOptionChange, onHeightChange }) {
  const contentHeightRef = useRef(null);
  const { popoutType } = data;
  let content;

  useEffect(() => {
    if (contentHeightRef.current) {
      onHeightChange(contentHeightRef.current.offsetHeight);
    }
  }, [onHeightChange]);

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
    <div
      ref={contentHeightRef}
      className="z-20 absolute top-0 left-0 w-full bg-white pt-5 px-5 pb-7 flex flex-col border-gray-light rounded"
    >
      <PopoutHeader title={popoutTitle[popoutType]} onClose={onClose} />
      {content}
    </div>
  );
}

export default BuySellPopout;
