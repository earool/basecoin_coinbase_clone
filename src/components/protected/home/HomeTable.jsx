import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
} from 'chart.js';

import DropdownMenu from '../../UI/DropdownMenu';
import { ReactComponent as Star } from '../../../assets/icons/others/star.svg';
import useViewport from '../../../hooks/useViewport';
import getEvery10thElement from '../../../utils/get10thElement';
import capitalizeWord from '../../../utils/capitalizeWord';
import formatBigNumber from '../../../utils/formatBigNumber';
import { MAX_MOBILE_WIDTH } from '../../../utils/constants';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement);

const options = {
  scales: {
    x: {
      display: false,
    },
    y: {
      display: false,
    },
  },
  elements: {
    point: {
      radius: 0,
    },
  },
};

function HomeTable({ data }) {
  const { width } = useViewport();

  return (
    <>
      <div className="m-3 ml-5 sm:mr-10 flex items-center justify-between font-medium">
        <h3 className="text-xl font-medium">Prices</h3>
        <DropdownMenu myStyle="home" />
      </div>
      <table className="w-full overflow-x-auto">
        <tbody className="">
          {data.map((item) => {
            const { price } = item.sparkline_in_7d;
            const { labels, formattedData } = getEvery10thElement(price);
            const chartData = {
              labels,
              datasets: [
                {
                  label: '',
                  data: formattedData,
                  fill: false,
                  borderColor: 'blue',
                  borderWidth: 1,
                  responsive: true,
                },
              ],
            };

            const ifPositive = item.price_change_percentage_24h > 0;

            const logoAndNameCol = (
              <div className="flex items-center">
                <img src={item.image} alt="logo" className="w-9" />
                <div className="ml-2">
                  <h6 className="font-medium">{capitalizeWord(item.id)}</h6>
                  <p className="text-sm text-gray-border-darker">
                    {item.symbol.toUpperCase()}
                  </p>
                </div>
              </div>
            );

            const currentPricePara = (
              <p>USD {item.current_price.toLocaleString()}</p>
            );

            const percentageChange = (
              <p className={ifPositive ? 'text-green-600' : ' text-red-500'}>
                {ifPositive ? '➚  ' : '➘ '}
                {item.price_change_percentage_24h.toFixed(2)}%
              </p>
            );

            const marketCapPara = <p>USD {formatBigNumber(item.market_cap)}</p>;

            return width < MAX_MOBILE_WIDTH ? (
              <tr
                className="px-3 [&>td]:my-2 hover:bg-gray-border flex items-center justify-between"
                key={item.id}
              >
                <td className="min-w-[128px]">{logoAndNameCol}</td>
                <td>
                  <div className="flex items-center w-28">
                    <Line data={chartData} options={options} />
                  </div>
                </td>
                <td className="flex flex-col items-end min-w-fit pl-2">
                  {currentPricePara}
                  {percentageChange}
                </td>
              </tr>
            ) : (
              <tr
                className="px-2 [&>td]:my-2 [&>td]:mx-3 hover:bg-gray-border flex items-center"
                key={item.id}
              >
                <td className="min-w-[128px] max-w-[35%] flex-1">
                  {logoAndNameCol}
                </td>
                <td className="w-[128px]">{currentPricePara}</td>
                <td>
                  <div className="w-24 min-w-[128px]">
                    <Line data={chartData} options={options} />
                  </div>
                </td>
                <td className="min-w-fit flex-1">{percentageChange}</td>
                <td className="w-[128px]">{marketCapPara}</td>
                <td className="font-medium text-my-blue hover:text-my-blue-darker">
                  <button type="button">Buy</button>
                </td>
                <td className="">
                  <button
                    className="text-white w-5 cursor-pointer flex items-center"
                    type="button"
                  >
                    <Star className="stroke-gray-border-darker hover:stroke-my-blue hover:text-my-blue" />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

export default HomeTable;
