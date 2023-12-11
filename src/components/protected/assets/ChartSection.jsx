import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import Spinner from '../../UI/Spinner';
import LineChart from '../LineChart';
import TimePeriodSelectionContainer from './TimePeriodSelectionContainer';
import useFetchCoinsData from '../../../hooks/useFetchCoins';
import { createAssetsUrl } from '../../../utils/buildUrl';
import prepareAssetsChartData from '../../../utils/prepareAssetsChartData';
import {
  titleCallback,
  labelCallback,
  afterLabelCallback,
} from '../../../utils/tooltipCallback';

const options = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    y: {
      display: false,
    },
    x: {
      display: false,
    },
  },
  elements: {
    point: {
      radius: 1,
    },
  },
  plugins: {
    tooltip: {
      displayColors: false,
      enabled: true,
      backgroundColor: '#253f4b',
      yAlign: 'top',
      padding: 12,
      caretPadding: 12,
      titleFont: { size: 14, weight: 'bold' },
      bodyAlign: 'center',
      bodyColor: 'grey',
      bodyFont: { size: 10 },
      callbacks: {
        title: titleCallback,
        label: labelCallback,
        afterLabel: afterLabelCallback,
      },
    },
  },
};

function ChartSection() {
  const [coins, setCoins] = useState([]);
  const [timeOption, setTimeOption] = useState('1D');
  const { isLoading, isSuccess, error, fetchCoins } = useFetchCoinsData();
  const { transactions, assetsIds } = useSelector(
    (state) => state.user.userAssets
  );
  const isMobile = useSelector((state) => state.deviceWidth.isMobile);
  const url = createAssetsUrl(assetsIds, timeOption);

  useEffect(() => {
    const transformCoins = (coinsObj) => {
      // exclude useless properties
      const { coins: loadedCoins } = coinsObj.data;
      setCoins(loadedCoins);
    };
    fetchCoins(url, transformCoins);
  }, [fetchCoins, url]);

  const timeChangeHandler = (option) => {
    setTimeOption(option);
  };

  let content;

  if (isLoading) {
    content = <Spinner />;
  } else if (isSuccess) {
    const { xAxis, yAxis, labels } = prepareAssetsChartData(
      coins,
      timeOption,
      transactions
    );
    const selectedLabels = isMobile
      ? labels.mobileLabels
      : labels.wideWidthLabels;

    content = (
      <>
        <LineChart
          data={yAxis}
          labels={xAxis}
          containerClass="w-full mb-4"
          color="blue"
          options={options}
        />
        <div className="flex items-center justify-between text-xs text-gray-500 border-t-2 p-4">
          {selectedLabels.map((label) => (
            <span key={label}>{label}</span>
          ))}
        </div>
      </>
    );
  } else {
    content = <div>{error}</div>;
  }

  return (
    <div className="sm:main-container flex flex-col">
      <div className="flex justify-between p-4">
        <div>
          <h6 className="text-xs text-gray-500 font-semibold">My balance</h6>
          <h2 className="text-3xl font-medium">USD 40.40</h2>
        </div>
        <TimePeriodSelectionContainer
          onTimeChange={timeChangeHandler}
          timeOption={timeOption}
          isMobile={isMobile}
        />
      </div>
      {content}
    </div>
  );
}

export default ChartSection;
