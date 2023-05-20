const priceChangePercentage =
  'price_change_percentage=1h%2C%2024h%2C7d%2C30d%2C1y';

export default function createFetchUrl({
  option,
  ifChart = false,
  perPage = 20,
  pageNumber = 1,
  allAssetsParam = 'market_cap_desc',
  coinsIds = [],
}) {
  if (option === 'Watchlist') {
    const string = coinsIds.join('%2C');
    return `/coins/markets?vs_currency=usd&ids=${string}&order=market_cap_desc&page=1&sparkline=${ifChart}&${priceChangePercentage}&locale=en`;
  }

  if (option === 'Top assets') {
    return `/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=60&page=1&sparkline=${ifChart}&price_change_percentage=24h&locale=en`;
  }

  if (option === 'Trending') {
    return `/coins/markets?vs_currency=usd&order=volume_desc&per_page=10&page=1&sparkline=${ifChart}&price_change_percentage=24h&locale=en`;
  }

  if (option === 'Top movers') {
    return `/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=${ifChart}&${priceChangePercentage}&locale=en`;
  }

  if (option === 'All assets') {
    return `/coins/markets?vs_currency=usd&order=${allAssetsParam}&per_page=${perPage}&page=${pageNumber}&sparkline=${ifChart}&${priceChangePercentage}&locale=en`;
  }

  return null;
}
