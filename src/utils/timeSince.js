export default function timeSince(dateString) {
  const date = new Date(dateString)
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000)

  const intervals = [
    [60, 'second'],
    [60, 'minute'],
    [24, 'hour'],
    [7, 'day'],
    [4.34524, 'week'],
    [12, 'month'],
    [Number.POSITIVE_INFINITY, 'year'],
  ]

  let value = seconds
  let unit = 'second'

  for (let i = 0; i < intervals.length; i++) {
    if (value < intervals[i][0]) {
      unit = intervals[i][1]
      break
    }
    value /= intervals[i][0]
  }

  value = Math.floor(value)
  return `${value} ${unit}${value !== 1 ? 's' : ''} ago`
}
