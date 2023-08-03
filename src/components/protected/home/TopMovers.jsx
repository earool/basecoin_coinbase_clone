import React, { useState, useMemo } from 'react';

import LogoAndName from '../table_components/LogoAndName';
import { PercentageChangePara } from '../table_components/ProcentChangeAndPrice';
import { useGetAllAssetsQuery } from '../../../store/apiSlice';

function TopMovers() {
  const { data = [], isSuccess } = useGetAllAssetsQuery();
  const [seeAllItems, setSeeAllItems] = useState(false);

  const sortedCoins = useMemo(() => {
    const sortedData = data.slice();
    sortedData.sort(
      (a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h
    );
    return sortedData;
  }, [data]);

  const seeAllItemsHandler = () => {
    setSeeAllItems((prevs) => !prevs);
  };

  let items = <p>Loading ...</p>;

  if (isSuccess) {
    const slicedCoins = seeAllItems
      ? sortedCoins.slice(0, 10)
      : sortedCoins.slice(0, 5);

    items = slicedCoins.map((item) => (
      <div key={item.id} className="flex justify-between pb-3 ">
        <LogoAndName symbol={item.symbol} image={item.image} id={item.id} />
        <div>
          <p>USD {item.current_price.toLocaleString()}</p>
          <div className="text-end">
            <PercentageChangePara
              precentChangeValue={item.price_change_percentage_24h}
            />
          </div>
        </div>
      </div>
    ));
  }

  return (
    <div className="w-[360px] border-b border-gray-light">
      <div className="flex py-4 px-6 justify-between">
        <h3 className="text-lg font-medium">Top Movers</h3>
        <button
          onClick={seeAllItemsHandler}
          type="button"
          className="text-my-blue hover:text-my-blue-darker font-medium"
        >
          See all
        </button>
      </div>
      <div className="pb-6 px-6 flex flex-col">{items}</div>
    </div>
  );
}

export default TopMovers;
