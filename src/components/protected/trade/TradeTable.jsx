import React, { useState, useMemo, useEffect } from 'react';

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
import { useGetDataQuery } from '../../../store/apiSlice';

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
  const [allAssetsItems, setAllAssetsItems] = useState([]);
  const [sortCriteria, setSortCriteria] = useState('market_cap');
  const [sortDirection, setSortDirection] = useState('desc');

  const isAllAssets = optionDropdown === 'All assets';
  const optionLogic =
    optionDropdown === 'Top gainers' || optionDropdown === 'Top losers'
      ? 'Top movers'
      : optionDropdown;

  const allAssetsResult = useGetDataQuery(
    {
      option: 'All assets',
      ifCharts: false,
      allAssetsParam: `${sortCriteria}_${sortDirection}`,
      pageNumber: currentPage,
    },
    { skip: !isAllAssets }
  );

  const specificAssetsResult = useGetDataQuery(
    {
      option: optionLogic,
      ifCharts: false,
    },
    { skip: isAllAssets }
  );

  const {
    data = [],
    isLoading,
    isSuccess,
    isFetching,
    isError,
    error,
  } = isAllAssets ? allAssetsResult : specificAssetsResult;

  useEffect(() => {
    setAllAssetsItems([]);
  }, [sortCriteria, sortDirection]);

  useEffect(() => {
    if (isAllAssets && !isFetching && data) {
      setAllAssetsItems((prevs) => [...prevs, ...data]);
    }
  }, [isAllAssets, isFetching, data]);

  const handleSort = (criteria) => {
    if (criteria === sortCriteria) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortCriteria(criteria);
      setSortDirection('desc');
    }
  };

  const sortedSpecificAssetsItems = useMemo(() => {
    if (isAllAssets) {
      return [];
    }

    const sortingCriteria = {
      price: 'current_price',
      change: timeBasedChange[timeDropdown],
      market_cap: 'market_cup',
    };

    const sortedData = data.slice();
    if (sortCriteria === 'id') {
      sortedData.sort((a, b) => b.id.localeCompare(a.id));
    } else {
      sortedData.sort(
        (a, b) =>
          b[sortingCriteria[sortCriteria]] - a[sortingCriteria[sortCriteria]]
      );
    }

    if (sortDirection === 'asc') {
      sortedData.reverse();
    }

    return sortedData;
  }, [data, sortCriteria, timeDropdown, sortDirection, isAllAssets]);

  const items = isAllAssets ? allAssetsItems : sortedSpecificAssetsItems;

  const headerRow = (
    <HeaderRow
      sortCriteria={sortCriteria}
      sortDirection={sortDirection}
      handleSort={handleSort}
      isAllAssets={isAllAssets}
    />
  );

  const dataRows = items.map((item) => (
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
    }

    if (option === 'Top losers') {
      setSortCriteria('change');
      setSortDirection('asc');
    }

    if (option === 'All assets') {
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
