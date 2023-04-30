export default function formatBigNumber(n) {
  let suffix;
  let divisor;

  switch (true) {
    case n >= 1e12:
      suffix = 'T';
      divisor = 1e12;
      break;
    case n >= 1e9:
      suffix = 'B';
      divisor = 1e9;
      break;
    case n >= 1e6:
      suffix = 'M';
      divisor = 1e6;
      break;
    case n >= 1e3:
      suffix = 'K';
      divisor = 1e3;
      break;
    default:
      suffix = '';
      divisor = 1;
      break;
  }

  return (n / divisor).toFixed(1) + suffix;
}
