import store from '../store/store';

// Constans
const BASE_URL = 'https://api.coinranking.com/v2/coins';
const SCOPE_LIMIT = 125; // Trade page
const LIMIT = 25;
export const MAX_PAGE_NUMBER = 125 / LIMIT;
export const TIME_URL_CONVERTER = {
  '1D': '24h',
  '1H': '1h',
  '1W': '7d',
  '1M': '30d',
  '1Y': '1y',
};

function buildUrl(params, baseUrl = BASE_URL) {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([k, v]) => {
    if (k === 'timePeriod') {
      searchParams.append(k, TIME_URL_CONVERTER[v]);
    } else {
      searchParams.append(k, v);
    }
  });

  const queryString = searchParams.toString();

  return queryString ? `${baseUrl}?${queryString}` : '';
}

function createUuidsString(coinIdsArray) {
  return coinIdsArray?.map((uuid) => `uuids[]=${uuid}`).join('&');
}

function createWatchlistUrl(
  timePeriod = '1D',
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

export function createAssetsUrl(assetsIds, timePeriod = '1D') {
  if (!assetsIds || !assetsIds.length) {
    return '';
  }

  const paramsString = buildUrl({
    timePeriod,
  });
  const uuidsString = createUuidsString(assetsIds);

  return `${paramsString}&${uuidsString}`;
}

export function createBuySellUrl(type, assetsIds = []) {
  if (type === 'Buy') {
    return buildUrl({ limit: 30 });
  }

  if (type === 'Assets') {
    const uuidsString = createUuidsString(assetsIds);
    return `${BASE_URL}?${uuidsString}`;
  }

  return '';
}
