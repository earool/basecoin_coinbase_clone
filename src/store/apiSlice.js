import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import createFetchUrl from '../utils/createFetchUrl';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.coingecko.com/api/v3' }),
  endpoints: (builder) => ({
    getData: builder.query({
      query: ({ watchlistIds: coinsIds, option, ifChart }) =>
        createFetchUrl({ option, ifChart, coinsIds }),
    }),
    searchCoins: builder.query({
      query: (searchQuery) => `search?query=${searchQuery}`,
    }),
  }),
});

export const { useGetDataQuery, useSearchCoinsQuery } = apiSlice;
