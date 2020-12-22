import times from 'lodash/times'
// Import constants
import { MAX_VAL, MIN_VAL, MAX_DATA_COUNT, MIN_DATA_COUNT } from 'Constants'
// Import utils
import { getRandomInt } from 'Utils'

const generateData = (count = getRandomInt(MIN_DATA_COUNT, MAX_DATA_COUNT)) => {
  const data = {
    maxVal: MAX_VAL,
    minVal: MIN_VAL,
    totalVal: getRandomInt(MIN_VAL, MAX_VAL),
    items: [],
  }

  times(count, () => {
    data.items = [
      ...data.items,
      {
        val: getRandomInt(MIN_VAL, MAX_VAL),
      },
    ]
  })

  return data
}
export default generateData
