export default function resetSorting(option, setCriteria, setDirection) {
  if (option === 'Top gainers') {
    setDirection('desc');
    setCriteria('change');
  } else if (option === 'Top losers') {
    setDirection('asc');
    setCriteria('change');
  } else {
    setDirection('desc');
    setCriteria('market_cap');
  }
}
