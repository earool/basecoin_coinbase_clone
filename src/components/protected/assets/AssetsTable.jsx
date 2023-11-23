import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import Table from '../table_components/Table';
import HeaderRow from './HeaderRow';
import LogoAndName, {
  LogoAndNamePlaceholder,
} from '../table_components/LogoAndName';
import BalanceDiv from '../table_components/BalanceDiv';
import { PriceAndPercChangeTd } from '../table_components/ProcentChangeAndPrice';
import AllocationDiv from '../table_components/AllocationDiv';
import Placeholder from '../table_components/Placeholder';

import useFetchCoinsData from '../../../hooks/useFetchCoins';
import { createAssetsUrl } from '../../../utils/buildUrl';

function AssetsTable() {
  const [coins, setCoins] = useState([]);
  // const [isMobile, setIsMobile] = useState(false);
  const isMobile = false;
  // transactions missing
  const { balance, assets, assetsIds } = useSelector(
    (state) => state.user.userAssets
  );
  const { isLoading, isError, isSuccess, error, fetchCoins } =
    useFetchCoinsData();

  const url = createAssetsUrl(assetsIds);

  useEffect(() => {
    const transformCoins = (coinsObj) => {
      const { coins: loadedCoins } = coinsObj.data;
      setCoins(loadedCoins);
    };
    fetchCoins(url, transformCoins);
  }, [fetchCoins, url]);

  const headerRow = <HeaderRow />;

  const dataRows = coins.map((item) => {
    const amount = assets ? assets[item.uuid] : 0;
    const singleCoinValue = (item.price * amount).toFixed(2);
    const allocation = (balance / singleCoinValue).toFixed(2);

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
          <td>
            <BalanceDiv
              singleCoinValue={singleCoinValue}
              symbol={item.symbol}
              amount={amount}
            />
          </td>
        </tr>
      );
    }

    return (
      <tr key={item.uuid}>
        <td>
          <LogoAndName
            image={item.iconUrl}
            symbol={item.symbol}
            name={item.name}
          />
        </td>
        <td>
          <BalanceDiv
            singleCoinValue={singleCoinValue}
            symbol={item.symbol}
            amount={amount}
          />
        </td>
        <PriceAndPercChangeTd
          precentChangeValue={item.change}
          currentPrice={item.price}
        />
        <td>
          <AllocationDiv allocation={allocation} />
        </td>
      </tr>
    );
  });

  const placeholderRows = isMobile
    ? Array.from({ length: 6 }, (_, i) => (
        <tr key={i}>
          <td>
            <LogoAndNamePlaceholder />
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
        </tr>
      ));

  const emptyAssetsListDiv = <div>No assets!</div>;

  const errorPara = <p>{JSON.stringify(error)}</p>;

  return (
    <div className="sm:main-container min-h-screen">
      <h2 className="px-4 py-4 text-xl font-medium">Your assets</h2>
      {!assetsIds || assetsIds.length === 0 ? (
        emptyAssetsListDiv
      ) : (
        <Table
          headerRow={headerRow}
          dataRows={dataRows}
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

export default AssetsTable;
