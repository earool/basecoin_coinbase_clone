import React from 'react';

function MobilePriceAndPercChangeTd({ precentChangeValue, currentPrice }) {
  return (
    <td className="flex flex-col items-end min-w-fit pl-2">
      <PercentageChangePara precentChangeValue={precentChangeValue} />
      <CurrentPricePara currentPrice={currentPrice} />
    </td>
  );
}

export function PriceAndPercChangeTd({ precentChangeValue, currentPrice }) {
  return (
    <td className="flex flex-col min-w-fit pl-2">
      <PercentageChangePara precentChangeValue={precentChangeValue} />
      <CurrentPricePara currentPrice={currentPrice} />
    </td>
  );
}

export function PercentageChangePara({ precentChangeValue }) {
  if (!precentChangeValue) {
    return <p>Invalid value</p>;
  }

  const formattedValue = parseFloat(precentChangeValue).toFixed(2);
  const isPositive = parseFloat(precentChangeValue) > 0;

  return (
    <p className={isPositive ? 'text-green-600' : ' text-red-500'}>
      {isPositive ? '➚  ' : '➘ '}
      {formattedValue}%
    </p>
  );
}

export function CurrentPricePara({ currentPrice }) {
  if (!currentPrice) {
    return <p>Invalid value</p>;
  }

  const formattedPrice = parseFloat(currentPrice).toFixed(2);

  return <p>USD {formattedPrice}</p>;
}

export default MobilePriceAndPercChangeTd;
