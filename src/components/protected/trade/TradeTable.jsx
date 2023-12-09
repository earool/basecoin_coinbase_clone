/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useRef, useCallback, useEffect } from 'react';
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
import { createTradeUrl, MAX_PAGE_NUMBER } from '../../../utils/buildUrl';

function TradeTable() {
  const [coins, setCoins] = useState([]);
  const [optionDropdown, setOptionDropdown] = useState('All assets');
  const [timeDropdown, setTimeDropdown] = useState('1D');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortCriteria, setSortCriteria] = useState('marketCap');
  const [sortDirection, setSortDirection] = useState('desc');
  const [isMobile, setIsMobile] = useState(false);

  const watchlistIds = useSelector((state) => state.user.watchlist);
  const url = createTradeUrl(
    optionDropdown,
    timeDropdown,
    sortCriteria,
    sortDirection,
    currentPage
  );

  const { isLoading, isError, isSuccess, error, fetchCoins } =
    useFetchCoinsData();

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
  }, [fetchCoins, url]);

  const spanObserver = useRef();
  const spanRef = useCallback((node) => {
    if (spanObserver.current) spanObserver.current.disconnect();

    if (node) {
      spanObserver.current = new IntersectionObserver((entries) => {
        const { isIntersecting } = entries[0];
        setIsMobile(isIntersecting);
        resetSorting(optionDropdown, setSortCriteria, setSortDirection);
        setCurrentPage(1);
      });

      spanObserver.current.observe(node);
    }
  }, []);

  const lastItemObserver = useRef();
  const lastItemRef = useCallback((node) => {
    if (lastItemObserver.current) lastItemObserver.current.disconnect();
    if (node) {
      lastItemObserver.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            setCurrentPage((prevs) =>
              prevs < MAX_PAGE_NUMBER ? prevs + 1 : prevs
            );
          }
        },
        { threshold: 0 }
      );

      lastItemObserver.current.observe(node);
    }
  }, []);

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

    if (coins.length === index + 1) {
      return (
        <tr key={item.uuid} ref={lastItemRef}>
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
      <span ref={spanRef} className="fixed sm:hidden left-0 bottom-1/2" />
    </div>
  );
}

export default TradeTable;
