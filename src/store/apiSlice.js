import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import {
  createAllAssetsFetchUrl,
  createWatchlistFetchUrl,
  createTrendingFetchUrl,
} from '../utils/createFetchUrl';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.coingecko.com/api/v3' }),
  endpoints: (builder) => ({
    getAllAssets: builder.query({
      query: () => createAllAssetsFetchUrl(),
    }),
    getWatchlistAssets: builder.query({
      query: (coinIds) => createWatchlistFetchUrl(coinIds),
    }),
    getTrendingAssets: builder.query({
      query: () => createTrendingFetchUrl(),
    }),
  }),
});

export const {
  useGetAllAssetsQuery,
  useGetWatchlistAssetsQuery,
  useGetTrendingAssetsQuery,
} = apiSlice;
