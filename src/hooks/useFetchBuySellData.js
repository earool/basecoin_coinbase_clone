/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useSelector } from 'react-redux';

import { createBuySellUrl } from '../utils/buildUrl';

function useFetchBuySellData() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSucces] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState(null);

  const [assetsData, setAssetsData] = useState([]);
  const [ownAssetsData, setOwnAssetsData] = useState([]);

  const { assetsIds, assets, cash } = useSelector(
    (state) => state.user.userAssets
  );

  const dollarOption = useMemo(
    () => ({
      amount: cash,
      name: 'USD Wallet',
      uuid: 'USD',
    }),
    [cash]
  );

  const fetchData = useCallback(async () => {
    const assetsUrl = createBuySellUrl('Buy');
    const ownAssetsUrl = createBuySellUrl('Assets', assetsIds);

    try {
      setIsLoading(true);
      const response1 = await fetch(assetsUrl);
      const response2 = await fetch(ownAssetsUrl);

      const { data: rawAssetsData } = await response1.json();
      const { data: rawOwnAssetsData } = await response2.json();

      const transformedAssetsData = rawAssetsData.coins.map(
        ({ name, price, iconUrl, uuid, symbol }) => ({
          name,
          price,
          iconUrl,
          uuid,
          symbol,
        })
      );

      const transformedOwnAssetsData = rawOwnAssetsData.coins.map(
        ({ name, price, iconUrl, uuid, symbol }) => ({
          name,
          price,
          iconUrl,
          uuid,
          symbol,
          amount: assets[uuid],
        })
      );

      setAssetsData(transformedAssetsData);
      setOwnAssetsData(transformedOwnAssetsData);

      setIsSucces(true);
    } catch (errorMessage) {
      setIsError(true);
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, [assetsIds, assets]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    assetsData,
    ownAssetsData,
    isError,
    isLoading,
    isSuccess,
    error,
    dollarOption,
  };
}

export default useFetchBuySellData;
