const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min)
}

const getGradientWeight = (val, min, max) => {
  return (val + Math.abs(min)) / (Math.abs(max) + Math.abs(min))
}

const getLayer = (endAcc, mp) => {
  let accumulator = 0
  let layerID = 0
  for (let i = 0; ; i++) {
    accumulator += mp * i
    if (accumulator >= endAcc) {
      layerID = i
      break
    }
  }
  return layerID
}

const getSigma = (endIndexInclusive, mp) => {
  let accumulator = 0
  for (let i = 0; i <= endIndexInclusive; ++i) {
    accumulator += mp * i
  }
  return accumulator
}

export { getRandomInt, getGradientWeight, getLayer, getSigma }
