export const getPrice = (price: string) =>
  Intl.NumberFormat(`en-US`, {
    currency: `USD`,
    minimumFractionDigits: 0,
    style: `currency`,
  }).format(parseFloat(price || `0`))

export const formatCollectionTitle = (title: string) => {
  const split = title.split(`-`)

  const getSplitIndex = (i: number) =>
    typeof split[i] !== `undefined` ? split[i] : ``

  return {
    type: getSplitIndex(0),
    title: getSplitIndex(1),
    subtitle: getSplitIndex(2),
  }
}
