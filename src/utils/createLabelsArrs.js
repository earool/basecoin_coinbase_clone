import { MONTHS } from './constants';

export function getHourLabels(date) {
  let hours = date.getHours();
  let minutes = date.getMinutes();

  const ampm = hours >= 12 ? 'PM' : 'AM';

  hours %= 12;
  hours = hours || 12;
  minutes = minutes < 10 ? `0${minutes}` : minutes;

  return `${hours}:${minutes} ${ampm}`;
}
function getMonthsLabels(date) {
  const month = date.getMonth();
  const day = date.getDate();

  return `${MONTHS[month]} ${day}`;
}

function getYearsLabels(date) {
  const month = date.getMonth();
  const year = date.getFullYear();

  return `${MONTHS[month]} ${year}`;
}

export default function createLabelsArrs(timeArr, arrLength, timePeriod) {
  const half = Math.floor(arrLength / 2);
  const quarter = Math.floor(arrLength / 4);
  const indexes = [0, half - quarter, half, half + quarter, arrLength - 1];
  const wideWidthLabels = [];

  indexes.forEach((index) => {
    const date = new Date(timeArr[index]);
    if (timePeriod === '1H' || timePeriod === '1D') {
      wideWidthLabels.push(getHourLabels(date));
    } else if (timePeriod === '1Y') {
      wideWidthLabels.push(getYearsLabels(date));
    } else {
      wideWidthLabels.push(getMonthsLabels(date));
    }
  });

  const mobileLabels = [
    wideWidthLabels[0],
    wideWidthLabels[2],
    wideWidthLabels[4],
  ];

  return { mobileLabels, wideWidthLabels };
}
