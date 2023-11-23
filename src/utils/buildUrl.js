import store from '../store/store';

// Constans
const BASE_URL = 'https://api.coinranking.com/v2/coins';
const SCOPE_LIMIT = 125; // Trade page
const LIMIT = 25;
export const MAX_PAGE_NUMBER = 125 / LIMIT;

function buildUrl(params, baseUrl = BASE_URL) {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([k, v]) => {
    searchParams.append(k, v);
  });

  const queryString = searchParams.toString();

  return queryString ? `${baseUrl}?${queryString}` : '';
}

function createUuidsString(coinIdsArray) {
  return coinIdsArray?.map((uuid) => `uuids[]=${uuid}`).join('&');
}

function createWatchlistUrl(
  timePeriod = '24h',
  orderBy = 'marketCap',
  orderDirection = 'desc'
) {
  // getting watchlistIds this way might be incorrect
  const state = store.getState();
  const { watchlist: coinIdsArray } = state.user;

  if (!coinIdsArray || !coinIdsArray.length) {
    return '';
  }

  const paramsString = buildUrl({
    timePeriod,
    orderBy,
    orderDirection,
  });

  const uuidsString = createUuidsString(coinIdsArray);

  return `${paramsString}&${uuidsString}`;
}

export function createHomeUrl(option) {
  if (option === 'Watchlist') {
    return createWatchlistUrl();
  }

  const homeParams = {
    scopeLimit: '10',
    orderBy: option === 'Trending' ? '24hVolume' : 'marketCap',
  };

  return buildUrl(homeParams);
}

export function createTradeUrl(
  option,
  timePeriod,
  orderBy,
  orderDirection,
  page
) {
  const offset = LIMIT * (page - 1);

  if (option === 'Watchlist') {
    return createWatchlistUrl(timePeriod, orderBy, orderDirection);
  }

  const tradeParams = {
    orderBy,
    orderDirection,
    timePeriod,
    offset,
    limit: LIMIT,
    scopeLimit: SCOPE_LIMIT,
  };

  return buildUrl(tradeParams);
}

export function createAssetsUrl(assetsIds) {
  if (!assetsIds || !assetsIds.length) {
    return '';
  }

  const uuidsString = createUuidsString(assetsIds);

  return `${BASE_URL}?${uuidsString}`;
}
