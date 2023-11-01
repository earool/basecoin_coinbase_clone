import store from '../store/store';

// Constans
const BASE_URL = 'https://api.coinranking.com/v2/coins';
const SCOPE_LIMIT = 125; // Trade page
const LIMIT = 25;

function buildUrl(params, baseUrl = BASE_URL) {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([k, v]) => {
    searchParams.append(k, v);
  });

  const queryString = searchParams.toString();

  return queryString ? `${baseUrl}?${queryString}` : '';
}

function createWatchlistUrl(
  timePeriod = '24h',
  orderBy = 'marketCap',
  orderDirection = 'desc'
) {
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

  const uuidsString = coinIdsArray.reduce((prev, curr, i) => {
    const string =
      i !== coinIdsArray.length - 1 ? `uuids[]=${curr}&` : `uuids[]=${curr}`;
    return prev.concat(string);
  }, '');

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
