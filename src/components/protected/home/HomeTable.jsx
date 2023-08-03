import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import DropdownMenu from '../../UI/DropdownMenu';
import LineChart from '../LineChart';
import LogoAndName from '../table_components/LogoAndName';
import MobilePriceAndPercChangeTd, {
  PercentageChangePara,
  CurrentPricePara,
} from '../table_components/ProcentChangeAndPrice';
import MarketCapPara from '../table_components/MarketCapPara';
import WatchButton from '../table_components/WatchButton';
import Spinner from '../../UI/Spinner';
import useViewport from '../../../hooks/useViewport';
import {
  useGetAllAssetsQuery,
  useGetWatchlistAssetsQuery,
  useGetTrendingAssetsQuery,
} from '../../../store/apiSlice';
import getEvery10thElement from '../../../utils/get10thElement';
import { MAX_MOBILE_WIDTH } from '../../../utils/constants';

function HomeTable() {
  const { width } = useViewport();
  const [option, setOption] = useState('Watchlist');
  const [seeAllItems, setSeeAllItems] = useState(false);

  const watchlistIds = useSelector((state) => state.user.watchlist);

  const optionChangeHandler = (newOption) => {
    setOption(newOption);
  };

  const seeAllItemsHandler = () => {
    setSeeAllItems((prevs) => !prevs);
  };

  const allAssetsResult = useGetAllAssetsQuery(undefined, {
    skip: option !== 'Top assets',
  });

  const watchlistAssetsResult = useGetWatchlistAssetsQuery(watchlistIds, {
    skip:
      option !== 'Watchlist' || watchlistIds === null || !watchlistIds.length,
  });

  const trendingAssetsResult = useGetTrendingAssetsQuery(undefined, {
    skip: option !== 'Trending',
  });

  const optionCriteria = {
    'Top assets': allAssetsResult,
    Watchlist: watchlistAssetsResult,
    Trending: trendingAssetsResult,
  };

  const { data, isLoading, isSuccess, isError, error } = optionCriteria[option];

  const slicedData =
    seeAllItems || data?.length < 6 ? data.slice(0, 10) : data?.slice(0, 5);

  let content;

  if (isLoading || watchlistIds === null) {
    content = (
      <div className="w-full h-full flex justify-center items-center">
        <Spinner />
      </div>
    );
  } else if (isSuccess) {
    content = (
      <>
        <div className="m-3 ml-5 sm:mr-4 flex items-center justify-between font-medium">
          <h3 className="text-xl font-medium">Prices</h3>
          <div className="flex">
            <DropdownMenu
              dropdownType="home"
              parentOption={option}
              onOptionChange={optionChangeHandler}
            />
            <button
              type="button"
              onClick={seeAllItemsHandler}
              className="ml-5 text-my-blue hover:text-my-blue-darker"
            >
              {data.length > 5 && (seeAllItems ? 'See less' : 'See all')}
            </button>
          </div>
        </div>
        <table className="w-full">
          <tbody>
            {slicedData.map((item) => {
              const { price } = item.sparkline_in_7d;
              const { labels, formattedData } = getEvery10thElement(price);
              const isWatched = watchlistIds.includes(item.id);

              return width < MAX_MOBILE_WIDTH ? (
                <tr
                  className="px-3 [&>td]:my-2 hover:bg-gray-border flex items-center justify-between"
                  key={item.id}
                >
                  <td className="min-w-[128px]">
                    <LogoAndName
                      symbol={item.symbol}
                      id={item.id}
                      image={item.image}
                    />
                  </td>
                  <td>
                    <LineChart
                      data={formattedData}
                      containerClass="flex items-center w-28"
                      labels={labels}
                    />
                  </td>
                  <MobilePriceAndPercChangeTd
                    currentPrice={item.current_price}
                    precentChangeValue={item.price_change_percentage_24h}
                  />
                </tr>
              ) : (
                <tr
                  className="px-2 [&>td]:my-2 [&>td]:mx-3 hover:bg-gray-border flex items-center"
                  key={item.id}
                >
                  <td className="min-w-[128px] max-w-[35%] flex-1">
                    <LogoAndName
                      symbol={item.symbol}
                      id={item.id}
                      image={item.image}
                    />
                  </td>
                  <td className="w-[128px]">
                    <CurrentPricePara currentPrice={item.current_price} />
                  </td>
                  <td>
                    <LineChart
                      data={formattedData}
                      containerClass="w-24 min-w-[128px]"
                      labels={labels}
                    />
                  </td>
                  <td className="min-w-fit flex-1">
                    <PercentageChangePara
                      precentChangeValue={item.price_change_percentage_24h}
                    />
                  </td>
                  <td className="w-[128px]">
                    <MarketCapPara marketCap={item.market_cap} />
                  </td>
                  <td className="font-medium text-my-blue hover:text-my-blue-darker">
                    <button type="button">Buy</button>
                  </td>
                  <td>
                    <WatchButton coinId={item.id} isWatched={isWatched} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </>
    );
  } else if (!watchlistIds.length) {
    content = <div>Start building your watchlist</div>;
  } else if (isError) {
    content = <p>{error.toString()}</p>;
  }

  return <section>{content}</section>;
}

export default HomeTable;
