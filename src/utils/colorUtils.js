import * as THREE from 'three'

const pickHex = (color1, color2, weight) => {
  const w1 = weight
  const w2 = 1 - w1
  const rgb = new THREE.Color(
    color1.r * w1 + color2.r * w2,
    color1.g * w1 + color2.g * w2,
    color1.b * w1 + color2.b * w2
  )
  return rgb
}

export default pickHex
