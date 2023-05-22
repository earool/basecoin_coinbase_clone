const priceChangePercentage =
  'price_change_percentage=1h%2C%2024h%2C7d%2C30d%2C1y';

export const createAllAssetsFetchUrl = () =>
  `/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=120&page=1&sparkline=true&${priceChangePercentage}&locale=en`;

export const createWatchlistFetchUrl = (coinIds) => {
  const string = coinIds.join('%2C');
  return `/coins/markets?vs_currency=usd&ids=${string}&order=market_cap_desc&page=1&sparkline=true&${priceChangePercentage}&locale=en`;
};

export const createTrendingFetchUrl = () =>
  `/coins/markets?vs_currency=usd&order=volume_desc&per_page=10&page=1&sparkline=true&price_change_percentage=24h&locale=en`;
