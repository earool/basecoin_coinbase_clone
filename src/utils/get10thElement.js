export default function getEvery10thElement(data) {
  const formattedData = [];
  const labels = [];
  for (let i = 0; i < data.length; i += 10) {
    formattedData.push(data[i]);
    labels.push(i);
  }
  return { labels, formattedData };
}
