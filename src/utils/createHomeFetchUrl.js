export default function createHomeFetchUrl(option, coinsIds = []) {
  if (option === 'Watchlist') {
    const string = coinsIds.join('%2C');
    return `/coins/markets?vs_currency=usd&ids=${string}&order=market_cap_desc&page=1&sparkline=true&price_change_percentage=24h&locale=en`;
  }

  if (option === 'Top assets') {
    return 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=true&price_change_percentage=24h&locale=en';
  }

  if (option === 'Trending') {
    return 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=volume_desc&per_page=10&page=1&sparkline=true&price_change_percentage=24h&locale=en';
  }

  if (option === 'Top movers') {
    return 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=false&price_change_percentage=24h&locale=en';
  }

  return null;
}
