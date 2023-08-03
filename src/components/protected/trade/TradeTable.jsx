/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useMemo, useRef, useCallback } from 'react';
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
import {
  useGetAllAssetsQuery,
  useGetWatchlistAssetsQuery,
} from '../../../store/apiSlice';
import resetSorting from '../../../utils/resetSorting';

const timeBasedChange = {
  '1D': 'price_change_percentage_24h',
  '1H': 'price_change_percentage_1h_in_currency',
  '1W': 'price_change_percentage_7d_in_currency',
  '1M': 'price_change_percentage_30d_in_currency',
  '1Y': 'price_change_percentage_1y_in_currency',
};

function TradeTable() {
  const [optionDropdown, setOptionDropdown] = useState('All assets');
  const [timeDropdown, setTimeDropdown] = useState('1D');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortCriteria, setSortCriteria] = useState('market_cap');
  const [sortDirection, setSortDirection] = useState('desc');
  const [isMobile, setIsMobile] = useState(false);

  const watchlistIds = useSelector((state) => state.user.watchlist);

  const specificAssetsResult = useGetAllAssetsQuery();
  const watchlistAssetsResult = useGetWatchlistAssetsQuery(watchlistIds, {
    skip: optionDropdown !== 'Watchlist' || !watchlistIds.length,
  });

  const {
    data = [],
    isLoading,
    isSuccess,
    isError,
    error,
  } = optionDropdown !== 'Watchlist'
    ? specificAssetsResult
    : watchlistAssetsResult;

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
            setCurrentPage((prevs) => prevs + 1);
          }
        },
        { threshold: 0 }
      );

      lastItemObserver.current.observe(node);
    }
  }, []);

  const sortedData = useMemo(() => {
    const sortingCriteria = {
      price: 'current_price',
      change: timeBasedChange[timeDropdown],
      market_cap: 'market_cup',
    };

    const arr = data.slice();
    if (sortCriteria === 'id') {
      arr.sort((a, b) => b.id.localeCompare(a.id));
    } else {
      arr.sort(
        (a, b) =>
          b[sortingCriteria[sortCriteria]] - a[sortingCriteria[sortCriteria]]
      );
    }

    if (sortDirection === 'asc') {
      arr.reverse();
    }

    return arr;
  }, [data, sortCriteria, timeDropdown, sortDirection]);

  const slicedData = isMobile
    ? sortedData.slice(0, 6 * currentPage)
    : sortedData.slice(0, 10 * currentPage);

  const dataRows = slicedData.map((item, index) => {
    const isWatched = watchlistIds.includes(item.id);

    if (isMobile) {
      return (
        <tr key={item.id}>
          <td>
            <LogoAndName image={item.image} symbol={item.symbol} id={item.id} />
          </td>
          <MobilePriceAndPercChangeTd
            precentChangeValue={item[timeBasedChange[timeDropdown]]}
            currentPrice={item.current_price}
          />
          <td>
            <WatchButton coinId={item.id} isWatched={isWatched} />
          </td>
        </tr>
      );
    }
    const rowContent = (
      <>
        <td>
          <LogoAndName image={item.image} symbol={item.symbol} id={item.id} />
        </td>
        <td>
          <CurrentPricePara currentPrice={item.current_price} />
        </td>
        <td>
          <PercentageChangePara
            precentChangeValue={item[timeBasedChange[timeDropdown]]}
          />
        </td>
        <td>
          <MarketCapPara marketCap={item.market_cap} />
        </td>
        <td>
          <Button aria-label="Buy" color="blue" ifFull={false}>
            Buy
          </Button>
        </td>
        <td>
          <WatchButton coinId={item.id} isWatched={isWatched} />
        </td>
      </>
    );

    if (slicedData.length === index + 1) {
      return (
        <tr key={item.id} ref={lastItemRef}>
          {rowContent}
        </tr>
      );
    }
    return <tr key={item.id}>{rowContent}</tr>;
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
    setOptionDropdown(option);
  };

  const timeChangeHandler = (option) => {
    setTimeDropdown(option);
  };

  const mobileButtonHandler = () => {
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
