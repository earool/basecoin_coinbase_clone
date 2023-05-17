import React, { useState } from 'react';

import Table from '../table_components/Table';
import ActionBar from './ActionBar';
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

  const { data, isLoading, isSuccess, isError, error } = useGetDataQuery({
    option: optionDropdown,
    ifCharts: false,
  });

  const headerRow = (
    <tr>
      <th>Name</th>
      <th>Price</th>
      <th>Change</th>
      <th>Market cap</th>
      <th aria-label="buy column" />
      <th>
        <p className="text-center">Watch</p>
      </th>
    </tr>
  );

  const dataRows = data?.map((item) => (
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

  const optionChangeHandler = (option) => {
    setOptionDropdown(option);
  };

  const timeChangeHandler = (option) => {
    setTimeDropdown(option);
  };

  return (
    <Table
      headerRow={headerRow}
      dataRows={dataRows}
      placeholderRows={placeholderRows}
      isLoading={isLoading}
      isSuccess={isSuccess}
    >
      <ActionBar
        onOptionChange={optionChangeHandler}
        onTimeChange={timeChangeHandler}
        optionDropdown={optionDropdown}
        timeDropdown={timeDropdown}
      />
    </Table>
  );
}

export default TradeTable;
