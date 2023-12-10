import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import Table from '../table_components/Table';
import ActionBar from './ActionBar';
import HeaderRow from './HeaderRow';
import LogoAndName, {
  LogoAndNamePlaceholder,
} from '../table_components/LogoAndName';
import MobilePriceAndPercChangeTd, {
  CurrentPricePara,
  PercentageChangePara,
} from '../table_components/ProcentChangeAndPrice';
import MarketCapPara from '../table_components/MarketCapPara';
import WatchButton from '../table_components/WatchButton';
import Placeholder from '../table_components/Placeholder';
import Button from '../../UI/Button';
import resetSorting from '../../../utils/resetSorting';
import useFetchCoinsData from '../../../hooks/useFetchCoins';
import useOnScreen from '../../../hooks/useOnScreen';
import { createTradeUrl, MAX_PAGE_NUMBER } from '../../../utils/buildUrl';

function TradeTable() {
  const [coins, setCoins] = useState([]);
  const [optionDropdown, setOptionDropdown] = useState('All assets');
  const [timeDropdown, setTimeDropdown] = useState('1D');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortCriteria, setSortCriteria] = useState('marketCap');
  const [sortDirection, setSortDirection] = useState('desc');

  const watchlistIds = useSelector((state) => state.user.watchlist);
  const isMobile = useSelector((state) => state.deviceWidth.isMobile);

  const { isLoading, isError, isSuccess, error, fetchCoins } =
    useFetchCoinsData();

  const url = createTradeUrl(
    optionDropdown,
    timeDropdown,
    sortCriteria,
    sortDirection,
    currentPage
  );

  useEffect(() => {
    const transformCoins = (coinsObj) => {
      const { coins: loadedCoins } = coinsObj.data;
      if (currentPage !== 1 && optionDropdown !== 'Watchlist') {
        setCoins((prevs) => [...prevs, ...loadedCoins]);
      } else {
        setCoins(loadedCoins);
      }
    };
    fetchCoins(url, transformCoins);
  }, [currentPage, fetchCoins, optionDropdown, url]);

  const lastElementCallback = (entries) => {
    if (entries[0].isIntersecting) {
      setCurrentPage((prevs) => (prevs < MAX_PAGE_NUMBER ? prevs + 1 : prevs));
    }
  };

  const lastElementRef = useOnScreen(lastElementCallback);

  const dataRows = coins.map((item, index) => {
    const isWatched = watchlistIds && watchlistIds.includes(item.uuid);

    if (isMobile) {
      return (
        <tr key={item.uuid}>
          <td>
            <LogoAndName
              image={item.iconUrl}
              symbol={item.symbol}
              name={item.name}
            />
          </td>
          <MobilePriceAndPercChangeTd
            precentChangeValue={item.change}
            currentPrice={item.price}
          />
          <td>
            <WatchButton coinId={item.uuid} isWatched={isWatched} />
          </td>
        </tr>
      );
    }
    const rowContent = (
      <>
        <td>
          <LogoAndName
            image={item.iconUrl}
            symbol={item.symbol}
            name={item.name}
          />
        </td>
        <td>
          <CurrentPricePara currentPrice={item.price} />
        </td>
        <td>
          <PercentageChangePara precentChangeValue={item.change} />
        </td>
        <td>
          <MarketCapPara marketCap={item.marketCap} />
        </td>
        <td>
          <Button aria-label="Buy" color="blue" ifFull={false}>
            Buy
          </Button>
        </td>
        <td>
          <WatchButton coinId={item.uuid} isWatched={isWatched} />
        </td>
      </>
    );

    if (coins.length === index + 1 && optionDropdown !== 'Watchlist') {
      return (
        <tr ref={lastElementRef} key={item.uuid} className="relative">
          {rowContent}
        </tr>
      );
    }
    return <tr key={item.uuid}>{rowContent}</tr>;
  });

  const emptyWatchlistDiv = (
    <div className="p-3 flex flex-col items-center pt-[10%] h-full">
      <p className="font-semibold">You&apos;re not watching any assets</p>
      <p className="italic text-sm">
        Star an asset to add it to your watchlist
      </p>
    </div>
  );

  const handleSort = (criteria) => {
    if (criteria === sortCriteria) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortCriteria(criteria);
    }
  };

  const optionChangeHandler = (option) => {
    resetSorting(option, setSortCriteria, setSortDirection);
    setCurrentPage(1);
    setOptionDropdown(option);
  };

  const timeChangeHandler = (option) => {
    setTimeDropdown(option);
  };

  const mobileButtonHandler = () => {
    // set limit
    setCurrentPage((prevs) => prevs + 1);
  };

  const headerRow = (
    <HeaderRow
      sortCriteria={sortCriteria}
      sortDirection={sortDirection}
      handleSort={handleSort}
    />
  );

  const mobileButton = (
    <div className="sm:hidden">
      <Button color="gray" ifFull onClick={mobileButtonHandler}>
        See more!
      </Button>
    </div>
  );

  const placeholderRows = isMobile
    ? Array.from({ length: 6 }, (_, i) => (
        <tr key={i}>
          <td>
            <LogoAndNamePlaceholder />
          </td>
          <td>
            <Placeholder />
          </td>
          <td>
            <Placeholder ifBigger={false} />
          </td>
        </tr>
      ))
    : Array.from({ length: 10 }, (_, i) => (
        <tr key={i}>
          <td>
            <LogoAndNamePlaceholder />
          </td>
          <td>
            <Placeholder />
          </td>
          <td>
            <Placeholder />
          </td>
          <td>
            <Placeholder />
          </td>
          <td>
            <Placeholder />
          </td>
          <td>
            <Placeholder ifBigger={false} />
          </td>
        </tr>
      ));

  const errorPara = <p>{JSON.stringify(error)}</p>;

  return (
    <div className="sm:main-container min-h-screen">
      <ActionBar
        onOptionChange={optionChangeHandler}
        onTimeChange={timeChangeHandler}
        optionDropdown={optionDropdown}
        timeDropdown={timeDropdown}
      />
      {optionDropdown === 'Watchlist' && !watchlistIds.length ? (
        emptyWatchlistDiv
      ) : (
        <Table
          headerRow={headerRow}
          dataRows={dataRows}
          lowerTableComponent={mobileButton}
          placeholderRows={placeholderRows}
          errorPara={errorPara}
          isLoading={isLoading}
          isSuccess={isSuccess}
          isError={isError}
        />
      )}
    </div>
  );
}

export default TradeTable;
