export default function createWatchlistFetchUrl(coinsIds) {
  const string = coinsIds.join('%2C');

  return `/coins/markets?vs_currency=usd&ids=${string}&order=market_cap_desc&page=1&sparkline=true&price_change_percentage=24h&locale=en`;
}
