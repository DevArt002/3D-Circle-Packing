import * as THREE from 'three'

// Set vertices' gradient colors along axis
const setGradient = (geometry, colors, axis) => {
  geometry.computeBoundingBox()

  const bbox = geometry.boundingBox
  const size = new THREE.Vector3().subVectors(bbox.max, bbox.min)

  const vertexIndices = ['a', 'b', 'c']
  let face
  let vertex
  const normalized = new THREE.Vector3()
  let normalizedAxis = 0

  for (let c = 0; c < colors.length - 1; c++) {
    const colorDiff = colors[c + 1].stop - colors[c].stop

    for (let i = 0; i < geometry.faces.length; i++) {
      face = geometry.faces[i]
      for (let v = 0; v < 3; v++) {
        vertex = geometry.vertices[face[vertexIndices[v]]]
        normalizedAxis = normalized.subVectors(vertex, bbox.min).divide(size)[axis]

        if (normalizedAxis >= colors[c].stop && normalizedAxis <= colors[c + 1].stop) {
          const localNormalizedAxis = (normalizedAxis - colors[c].stop) / colorDiff
          face.vertexColors[v] = colors[c].color
            .clone()
            .lerp(colors[c + 1].color, localNormalizedAxis)
        }
      }
    }
  }
}

// Lathe ring
const ringLathe = (R, r, h) => {
  const halfH = h * 0.5
  const points = [
    new THREE.Vector2(r, -halfH),
    new THREE.Vector2(R, -halfH),
    new THREE.Vector2(R, halfH),
    new THREE.Vector2(r, halfH),
    new THREE.Vector2(r, -halfH),
  ]
  const g = new THREE.LatheBufferGeometry(points, 72)
  return g
}

export { ringLathe, setGradient }
