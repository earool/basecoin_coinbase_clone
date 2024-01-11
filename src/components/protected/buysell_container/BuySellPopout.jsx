/* eslint-disable no-unused-vars */
import React from 'react';
import ReactDOM from 'react-dom';

import PopoutHeader from './PopoutHeader';
import OrderPreviewPopout from './OrderPreviewPopout';
import SelectPopout from './SelectPopout';
import CashPopout from './CashPopout';
import { Backdrop } from '../../UI/Modal';

const portalElement = document.getElementById('overlays');
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
      {ReactDOM.createPortal(<Backdrop onClose={onClose} />, portalElement)}
      <div className="z-20 absolute top-0 left-0 w-full bg-white pt-5 px-5 pb-7 flex flex-col border-gray-light rounded">
        <PopoutHeader title={popoutTitle[popoutType]} onClose={onClose} />
        {content}
      </div>
    </>
  );
}

export default BuySellPopout;
