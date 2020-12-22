import { useState } from 'react'
// Import utils
import { generateData } from 'Utils'
// Import constants
import { INITIAL_DATA_COUNT } from 'Constants'

const useData = () => {
  const [data, setData] = useState(generateData(INITIAL_DATA_COUNT))

  // Generate new data
  const onDataCountChange = (dataCount) => {
    setData(generateData(dataCount))
  }

  return {
    data,
    onDataCountChange,
  }
}

export default useData
