import React, { useEffect, useState } from 'react';

import Button from '../../UI/Button';
import SelectionRow from './SelectionRow';
import BuySellPopOut from './BuySellPopOut';
import useFetchCoinsData from '../../../hooks/useFetchCoins';
import { createBuySellUrl } from '../../../utils/buildUrl';

function SelectionRowsContainer() {
  const [coins, setCoins] = useState([]);
  const [option, setOption] = useState(null);
  const [showPopOut, setShowPopout] = useState(false);

  // eslint-disable-next-line no-unused-vars
  const { fetchCoins, isLoading, isError, isSuccess, error } =
    useFetchCoinsData();

  const url = createBuySellUrl('Buy');

  useEffect(() => {
    const transforms = (coinsObj) => {
      const transformedCoins = coinsObj.data.coins.map(
        ({ name, price, iconUrl, uuid }) => ({
          name,
          price,
          iconUrl,
          uuid,
        })
      );
      setCoins(transformedCoins);
    };
    fetchCoins(url, transforms);
  }, [url, fetchCoins]);

  const togglePopoutHandler = () => {
    setShowPopout((prevs) => !prevs);
  };

  const selectOptionHandler = (e) => {
    setOption(e.target.dataset.option);
  };

  let content;
  const isCoin = option !== 'USD';

  if (isLoading) {
    content = <p>...loading</p>;
  } else if (isError) {
    content = <p>{error}</p>;
  } else if (isSuccess) {
    const {
      name,
      price,
      iconUrl,
      uuid: selectedUuid,
    } = option ? coins.find(({ uuid }) => uuid === option) : coins[0];
    content = (
      <>
        <SelectionRow
          iconUrl={iconUrl}
          uuid={selectedUuid}
          name={name}
          price={price}
          isAsset
        />
        <SelectionRow name="USD Wallet" price="2.56" uuid="USD" />
        <div className="my-4 mx-2">
          <Button color="blue" ifFull onClick={togglePopoutHandler}>
            Buy {name}
          </Button>
        </div>
      </>
    );
  }

  return (
    <div className="pt-5 px-5">
      {content}
      {showPopOut && (
        <BuySellPopOut
          isCoin={isCoin}
          onToggle={togglePopoutHandler}
          onSelect={selectOptionHandler}
          coins={coins}
        />
      )}
    </div>
  );
}

export default SelectionRowsContainer;
