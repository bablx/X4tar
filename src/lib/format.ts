export function formatCurrency(value: number, currency = "USD") {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatCompact(value: number) {
  if (value < 1000) return `${value}`;
  const compact = value / 1000;
  return `${compact % 1 === 0 ? compact.toFixed(0) : compact.toFixed(1)}k`;
}
