export default function prepareSparklineData(data) {
  const labels = data.map((_, i) => i);
  return { data, labels };
}
