/* eslint-disable no-unused-vars */
const DATA = {
  status: 'success',
  data: {
    coins: [
      {
        uuid: 'Qwsogvtv82FCd',
        symbol: 'BTC',
        sparkline: [
          '17692.386339316545',
          '16956.53383822057',
          '20122.632580692836',
          '23322.489210018375',
          '25066.567104971662',
          '28965.94740028308',
          '27626.19994847011',
          '27692.261473295755',
          '30098.86914264737',
          '27961.943919693163',
          '26371.625474865472',
          '29633.24486966322',
        ],
      },
      {
        uuid: 'razxDUgYGNAdQ',
        symbol: 'ETH',
        sparkline: [
          '1307.6450979891326',
          '1237.948391729396',
          '1459.7195556993381',
          '1626.5201387941552',
          '1673.9349248942517',
          '1926.2363199001645',
          '1852.0553636101697',
          '1818.3170825321868',
          '1896.2453408369602',
          '1763.6051361658015',
          '1626.1309783826669',
          '1657.4969281586123',
        ],
        btcPrice: '0.05525772321578885',
      },
      {
        uuid: 'HIVsRcGKkPFtW',
        symbol: 'USDT',
        sparkline: [
          '1.0001985649005678',
          '1.0003554197668552',
          '1.0000945168518325',
          '1.001147208678186',
          '1.0024713537209071',
          '1.0053193783118368',
          '1.0061380873503112',
          '1.0002251230665573',
          '1.0005088267756408',
          '1.0019758509070822',
          '1.0029418469649416',
          '1.0005903888283052',
        ],
      },
    ],
  },
};

function prepareAssetsChartData(data) {}

function prepareTimeLabels(timePeriod, length) {
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

  return Array.from({ length }, (_, i) => then + i * timeInterval);
}

function getSparklineObj(data, timePeriod, transactions) {
  const { coins } = data.data;
  const arrLength = coins[0].sparkline.length;

  const timeLabels = prepareTimeLabels(timePeriod, arrLength);
  const sparklineObj = Array.from({ length: arrLength }, () => 0);

  coins.forEach((coin) => {
    const { sparkline } = coin;
    sparkline.forEach((point, i) => {
      const coinSparkline = [...]
    });
  });
  return sparklineObj;
}

function x(transactionsArr) {}

export default prepareAssetsChartData;
