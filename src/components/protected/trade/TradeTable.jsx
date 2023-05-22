import React, { useState, useMemo } from 'react';
import { useSelector } from 'react-redux';

import Table from '../table_components/Table';
import ActionBar from './ActionBar';
import HeaderRow from './HeaderRow';
import LogoAndName, {
  LogoAndNamePlaceholder,
} from '../table_components/LogoAndName';
import {
  CurrentPricePara,
  PercentageChangePara,
} from '../table_components/procentChangeAndPrice';
import MarketCapPara from '../table_components/MarketCapPara';
import WatchButton from '../table_components/WatchButton';
import Placeholder from '../table_components/Placeholder';
import Button from '../../UI/Button';
import {
  useGetAllAssetsQuery,
  useGetWatchlistAssetsQuery,
} from '../../../store/apiSlice';

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

  const watchlistIds = useSelector((state) => state.user.watchlist);

  const specificAssetsResult = useGetAllAssetsQuery();
  const watchlistAssetsResult = useGetWatchlistAssetsQuery(watchlistIds);

  const {
    data = [],
    isLoading,
    isSuccess,
    isFetching,
    isError,
    error,
  } = optionDropdown === 'Watchlist'
    ? watchlistAssetsResult
    : specificAssetsResult;

  const handleSort = (criteria) => {
    if (criteria === sortCriteria) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortCriteria(criteria);
    }
  };

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

  const slicedData = sortedData.slice(0, 10 * currentPage);

  const dataRows = slicedData.map((item) => (
    <tr key={item.id}>
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
        <Button
          aria-label="Buy"
          color="blue"
          ifFull={false}
          // onClick={buyHandler}
        >
          Buy
        </Button>
      </td>
      <td>
        <WatchButton />
      </td>
    </tr>
  ));

  const headerRow = (
    <HeaderRow
      sortCriteria={sortCriteria}
      sortDirection={sortDirection}
      handleSort={handleSort}
    />
  );

  const placeholderRows = Array.from({ length: 10 }, (_, i) => (
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

  const placeholderFetchingRows = placeholderRows.slice(0, 2);

  const errorPara = <p>{JSON.stringify(error)}</p>;

  const optionChangeHandler = (option) => {
    if (option === 'Top gainers') {
      setSortDirection('desc');
      setSortCriteria('change');
    } else if (option === 'Top losers') {
      setSortCriteria('change');
      setSortDirection('asc');
    } else {
      setSortCriteria('market_cap');
      setSortDirection('desc');
    }

    setOptionDropdown(option);
  };

  const timeChangeHandler = (option) => {
    setTimeDropdown(option);
  };

  const addItem = () => {
    setCurrentPage((prevs) => prevs + 1);
  };

  return (
    <>
      <Table
        headerRow={headerRow}
        dataRows={dataRows}
        placeholderRows={placeholderRows}
        placeholderFetchingRows={placeholderFetchingRows}
        errorPara={errorPara}
        isLoading={isLoading}
        isSuccess={isSuccess}
        isFetching={isFetching}
        isError={isError}
      >
        <ActionBar
          onOptionChange={optionChangeHandler}
          onTimeChange={timeChangeHandler}
          optionDropdown={optionDropdown}
          timeDropdown={timeDropdown}
        />
      </Table>
      <button type="button" onClick={addItem}>
        addItems!
      </button>
    </>
  );
}

export default TradeTable;
