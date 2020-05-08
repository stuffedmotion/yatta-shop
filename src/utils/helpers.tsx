export const getPrice = (price: string) =>
  Intl.NumberFormat(undefined, {
    currency: `USD`,
    minimumFractionDigits: 0,
    style: `currency`,
  }).format(parseFloat(price || `0`))
