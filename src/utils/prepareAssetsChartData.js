import createLabelsArrs from './createLabelsArrs';

function createtimeArr(timePeriod, length) {
  const hToMs = 60 * 60 * 1000;
  const timeInMilliseconds = {
    '1H': hToMs,
    '1D': 24 * hToMs,
    '1W': 7 * 24 * hToMs,
    '1M': 30 * 24 * hToMs,
    '1Y': 365 * 24 * hToMs,
  };

  const now = Date.now();
  const then = now - timeInMilliseconds[timePeriod];
  const timeInterval = (now - then) / length;

  const timeArr = Array.from({ length }, (_, i) => then + i * timeInterval);
  if (timePeriod === '1Y') timeArr.push(now); // there can be a case that latest transactions didnt get taken into account

  return timeArr;
}

function prepareAssetsChartData(coins, timePeriod, transactions) {
  const arrLength = coins[0].sparkline.length;

  const timeArr = createtimeArr(timePeriod, arrLength);
  const balanceArr = Array.from({ length: timeArr.length }, () => 0);
  coins.forEach((coin) => {
    const { sparkline, uuid, price: currentPrice } = coin;
    transactions[uuid].forEach(({ amount, date }) => {
      balanceArr.forEach((_, i) => {
        if (date <= timeArr[i]) {
          balanceArr[i] += amount * (sparkline[i] || parseFloat(currentPrice)); // sometimes last element is null
        }
      });
    });
  });

  const labels = createLabelsArrs(timeArr, arrLength, timePeriod);
  return { yAxis: balanceArr, xAxis: timeArr, labels };
}

export default prepareAssetsChartData;
