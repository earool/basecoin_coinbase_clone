import React from 'react';

function MobilePriceAndPercChangeTd({ precentChangeValue, currentPrice }) {
  return (
    <td className="flex flex-col items-end min-w-fit pl-2">
      <PercentageChangePara precentChangeValue={precentChangeValue} />
      <CurrentPricePara currentPrice={currentPrice} />
    </td>
  );
}

export function PercentageChangePara({ precentChangeValue: v }) {
  return (
    <p className={v > 0 ? 'text-green-600' : ' text-red-500'}>
      {v > 0 ? '➚  ' : '➘ '}
      {v.toFixed(2)}%
    </p>
  );
}

export function CurrentPricePara({ currentPrice }) {
  return <p>USD {currentPrice.toLocaleString()}</p>;
}

export default MobilePriceAndPercChangeTd;
