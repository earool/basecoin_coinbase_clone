import { useState, useCallback } from 'react';

const options = {
  headers: {
    'Content-Type': 'application/json',
    'x-access-token': import.meta.env.VITE_COINRANKING_API_KEY,
  },
};

// function transformData(data) {
//   const { data: fetchedData } = data;
//   const { coins } = fetchedData;
//   return coins;
// }

function useFetchCoinsData() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState('');

  const fetchCoins = useCallback(async (url, applyData) => {
    if (!url) {
      return;
    }

    try {
      setIsLoading(true);
      const response = await fetch(url, options);
      const data = await response.json();
      applyData(data);
      setIsSuccess(true);
    } catch (errorMessage) {
      setIsError(true);
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    isLoading,
    isSuccess,
    isError,
    error,
    fetchCoins,
  };
}

export default useFetchCoinsData;
