import { MONTHS } from './constants';
import { getHourLabels } from './createLabelsArrs';

export function titleCallback([tooltipItem]) {
  const balance = tooltipItem.parsed.y.toFixed(2);
  return `USD ${balance}`;
}

export function labelCallback(tooltipItem) {
  const timestamp = parseInt(tooltipItem.label, 10);
  const date = new Date(timestamp);

  const month = MONTHS[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear();

  return `${month} ${day}, ${year}`;
}

export function afterLabelCallback(tooltipItem) {
  const timestamp = parseInt(tooltipItem.label, 10);
  const date = new Date(timestamp);
  const time = getHourLabels(date);

  return `${time}`;
}
