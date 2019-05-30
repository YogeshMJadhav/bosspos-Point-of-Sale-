const maxLen = 31

const getLabels = () => {
  let i = 0
  const labels = []
  while (i < maxLen) {
    i += 1
    labels.push(
      new Date(`December ${i}, 2018`).toLocaleDateString('en-GB', {
        month: 'short',
        day: '2-digit',
      }),
    )
  }
  return labels
}

const getDataset = () => {
  let i = 0
  const data = []
  while (i < maxLen) {
    i += 1
    data.push(Math.floor(Math.random() * (10000 - 3000) + 3000))
  }

  return data
}


export const barData = () => ({
  labels: getLabels(),
  datasets: [
    {
      backgroundColor: '#1665D8',
      label: 'Visitors',
      data: getDataset(),
    },
  ],
})

export const lineBlank = (borderColor, backgroundColor) => ({
  labels: getLabels(),
  datasets: [
    {
      borderColor,
      backgroundColor,
      label: 'Visitors',
      data: getDataset(),
    },
  ],
})
