import React, { useEffect, useState } from 'react';
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
import useFetchCoinsData from '../../../hooks/useFetchCoins';
import { createHomeUrl } from '../../../utils/buildUrl';
import prepareSparklineData from '../../../utils/prepareSparklineData';
import { HOME_OPTIONS } from '../../../utils/constants';

function HomeTable() {
  const [coins, setCoins] = useState([]);
  const [option, setOption] = useState(HOME_OPTIONS[0]);
  const [seeAllItems, setSeeAllItems] = useState(false);

  const watchlistIds = useSelector((state) => state.user.watchlist);
  const isMobile = useSelector((state) => state.deviceWidth.isMobile);
  const url = createHomeUrl(option);

  const { fetchCoins, isLoading, isSuccess, isError, error } =
    useFetchCoinsData(url);

  useEffect(() => {
    const transformCoins = (coinsObj) => {
      const { coins: loadedCoins } = coinsObj.data;

      setCoins(loadedCoins);
    };

    fetchCoins(url, transformCoins);
  }, [fetchCoins, url]);

  const optionChangeHandler = (newOption) => {
    setOption(newOption);
  };

  const seeAllItemsHandler = () => {
    setSeeAllItems((prevs) => !prevs);
  };

  const slicedCoins =
    seeAllItems || coins?.length < 6 ? coins.slice(0, 10) : coins?.slice(0, 5);

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
              {coins.length > 5 && (seeAllItems ? 'See less' : 'See all')}
            </button>
          </div>
        </div>
        <table className="w-full">
          <tbody>
            {slicedCoins.map((item) => {
              const { labels, data } = prepareSparklineData(item.sparkline);
              const isWatched = watchlistIds.includes(item.uuid);

              return isMobile ? (
                <tr
                  className="px-3 [&>td]:my-2 hover:bg-gray-border flex items-center justify-between"
                  key={item.uuid}
                >
                  <td className="min-w-[128px]">
                    <LogoAndName
                      symbol={item.symbol}
                      image={item.iconUrl}
                      name={item.name}
                    />
                  </td>
                  <td>
                    <LineChart
                      data={data}
                      containerClass="flex items-center w-28"
                      labels={labels}
                      color={item.color}
                    />
                  </td>
                  <MobilePriceAndPercChangeTd
                    currentPrice={item.price}
                    precentChangeValue={item.change}
                  />
                </tr>
              ) : (
                <tr
                  className="px-2 [&>td]:my-2 [&>td]:mx-3 hover:bg-gray-border flex items-center"
                  key={item.uuid}
                >
                  <td className="min-w-[128px] max-w-[35%] flex-1">
                    <LogoAndName
                      symbol={item.symbol}
                      image={item.iconUrl}
                      name={item.name}
                    />
                  </td>
                  <td className="w-[128px]">
                    <CurrentPricePara currentPrice={item.price} />
                  </td>
                  <td>
                    <LineChart
                      data={data}
                      containerClass="w-24 min-w-[128px]"
                      labels={labels}
                      color={item.color}
                    />
                  </td>
                  <td className="min-w-fit flex-1">
                    <PercentageChangePara precentChangeValue={item.change} />
                  </td>
                  <td className="w-[128px]">
                    <MarketCapPara marketCap={item.marketCap} />
                  </td>
                  <td className="font-medium text-my-blue hover:text-my-blue-darker">
                    <button type="button">Buy</button>
                  </td>
                  <td>
                    <WatchButton coinId={item.uuid} isWatched={isWatched} />
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
