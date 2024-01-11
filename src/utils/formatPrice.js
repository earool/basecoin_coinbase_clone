function getNumberOfCommas(len) {
  const remainder = len % 3;
  const numberOfCommas = remainder
    ? Math.floor(len / 3)
    : Math.floor(len / 3) - 1;

  const indexes = [];

  for (let i = 0; i < numberOfCommas; i += 1) {
    indexes.push((remainder % 3) + i * 3);
  }

  return indexes;
}

function getSignificantFigures(afterDecimal) {
  const arr = afterDecimal.split('');

  const sigFigs = [];

  for (let i = 0; i < arr.length; i += 1) {
    sigFigs.push(arr[i]);
    if (arr[i] !== '0') {
      sigFigs.push(arr[i + 1] || '');
      break;
    }
  }
  return sigFigs.join('');
}

function formatPrice(price) {
  const [beforeDecimal, afterDecimal] =
    typeof price === 'number' ? price.toString().split('.') : price.split('.');
  const { length } = beforeDecimal;

  const commaIndexes = getNumberOfCommas(length);
  const formattedBeforeDecimal = beforeDecimal.split('');

  commaIndexes.forEach((index) => {
    formattedBeforeDecimal[index] = `,${formattedBeforeDecimal[index]}`;
  });

  const formattedAfterDecimal =
    beforeDecimal === '0'
      ? getSignificantFigures(afterDecimal)
      : afterDecimal.slice(0, 2);

  return `${formattedBeforeDecimal.join('')}.${formattedAfterDecimal}`;
}

export default formatPrice;
