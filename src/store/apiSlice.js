import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import createWatchlistFetchUrl from '../utils/createWatchlistFetchUrl';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.coingecko.com/api/v3' }),
  endpoints: (builder) => ({
    getHomeData: builder.query({
      query: (coinsIds) => createWatchlistFetchUrl(coinsIds),
    }),
  }),
});

export const { useGetHomeDataQuery } = apiSlice;
