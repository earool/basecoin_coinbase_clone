import React, { useEffect, useState } from 'react';

import LogoAndName from '../table_components/LogoAndName';
import { ReactComponent as RightCaret } from '../../../assets/icons/others/right_caret.svg';
import useFetchCoinsData from '../../../hooks/useFetchCoins';
import { createBuySellUrl } from '../../../utils/buildUrl';

function SelectionRowsContainer() {
  const [coins, setCoins] = useState([]);

  // eslint-disable-next-line no-unused-vars
  const { fetchCoins, isLoading, isError, isSuccess, error } =
    useFetchCoinsData();

  const url = createBuySellUrl('Buy');

  useEffect(() => {
    const transforms = (coinsObj) => {
      const transformedCoins = coinsObj.data.coins.map(
        ({ symbol, name, price, iconUrl }) => ({
          symbol,
          name,
          price,
          iconUrl,
        })
      );
      setCoins(transformedCoins);
    };
    fetchCoins(url, transforms);
  }, [url, fetchCoins]);

  let content;

  console.log(isSuccess, isLoading, isError);
  console.log(coins[0]);

  if (isLoading) {
    content = <p>...loading</p>;
  } else if (isError) {
    content = <p>{error}</p>;
  } else if (isSuccess) {
    const { symbol, name, price, iconUrl } = coins[0];
    content = (
      <div className="flex justify-between">
        <LogoAndName image={iconUrl} symbol={symbol} name={name} />
        <div className="flex">
          <div className="flex flex-col">
            <span>USD {price}</span>
            <span>Price</span>
          </div>
          <div>
            <RightCaret className="w-4 h-4" />
          </div>
        </div>
      </div>
    );
  }

  return <div className="pt-5 px-5">{content}</div>;
}

export default SelectionRowsContainer;
