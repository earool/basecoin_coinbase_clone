import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import createHomeFetchUrl from '../utils/createHomeFetchUrl';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.coingecko.com/api/v3' }),
  endpoints: (builder) => ({
    getHomeData: builder.query({
      query: ({ watchlistIds: coinsIds, option }) =>
        createHomeFetchUrl(option, coinsIds),
    }),
  }),
});

export const { useGetHomeDataQuery } = apiSlice;
