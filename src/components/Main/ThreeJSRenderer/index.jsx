import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
// Import utils
import { pickHex, ringLathe, setGradient, getGradientWeight, getLayer, getSigma } from 'Utils/'

class ThreeJSRenderer {
  constructor(container, data, settings, onObjSelected) {
    this.container = container // Parent node of canvas
    this.settings = settings // Settings for cylinder chart visualization
    this.data = data // Data for cylinder chart visualization
    this.onObjSelected = onObjSelected // Callback when any object(cylinder&ring) picked
    this.width = container.offsetWidth // Container width
    this.height = container.offsetHeight // Container height
    this.aspect = this.width / this.height // Camera aspect
    this.ratio = window.devicePixelRatio // Display ratio
    this.raycaster = new THREE.Raycaster() // Raycaster obj
    this.mouse = new THREE.Vector2() // Vector2 for mouse
    this.mouseXY = { x: 0, y: 0 } // Mouse position for tooltip
    this.disposed = false // Flag for disposal. If true stop rendering and remove all scene element
    this.ringOutRadius = 110 // Ring outer radius
    this.ringInRadius = 100 // Ring inner radius
    this.ringHeight = 10 // Ring height
    this.gradientColor1 = new THREE.Color(0, 1, 0) // Start gradient color (green)
    this.gradientColor2 = new THREE.Color(1, 0, 0) // End gradient color (red)
    this.axisSize = 150 // Axis size
    this.gridSize = 250 // Grid size
    this.gridDivision = 30 // Grid division
  }

  /**
   * Initialize all setups
   */
  init = () => {
    this.rendererSetup()
    this.sceneSetup()
    this.cameraSetup()
    this.lightSetup()
    this.meshSetup()
    this.axesSetup()
    this.gridSetup()
    this.eventSetup()
    this.tick()
  }

  /**
   * Setup renderer and append to dom
   */
  rendererSetup = () => {
    this.renderer = new THREE.WebGLRenderer({ antialias: true })
    this.renderer.setPixelRatio(this.ratio)
    this.renderer.setSize(this.width, this.height)
    this.renderer.outputEncoding = THREE.sRGBEncoding
    this.container.appendChild(this.renderer.domElement)
  }

  /**
   * Setup scene
   */
  sceneSetup = () => {
    this.scene = new THREE.Scene()
    this.scene.background = new THREE.Color(0x000000)
  }

  /**
   * Setup camera, add controls
   */
  cameraSetup = () => {
    this.camera = new THREE.PerspectiveCamera(75, this.aspect, 0.1, 1000)
    this.camera.position.set(0, 150, 150)

    this.controls = new OrbitControls(this.camera, this.renderer.domElement)
  }

  /**
   * Setup all lights
   */
  lightSetup = () => {
    const ambLight = new THREE.AmbientLight(0x808080)
    this.scene.add(ambLight)

    const dirLight1 = new THREE.DirectionalLight(0xffffff, 1.35)
    dirLight1.position.set(1, 1, 1)
    dirLight1.castShadow = true
    this.scene.add(dirLight1)

    const dirLight2 = new THREE.DirectionalLight(0xffffff, 0.5)
    dirLight2.position.set(-1, -1, 0)
    this.scene.add(dirLight2)
  }

  /**
   * Setup all meshes, models
   */
  meshSetup = () => {
    // Add data cylinders
    this.cylindersSetup()

    // Add ring
    const ringGeo = ringLathe(this.ringOutRadius, this.ringInRadius, this.ringHeight)
    const ringColor = pickHex(
      this.gradientColor1,
      this.gradientColor2,
      getGradientWeight(this.data.totalVal, this.data.minVal, this.data.maxVal)
    )
    const rignMat = new THREE.MeshPhongMaterial({ color: ringColor, flatShading: true })
    const ringMesh = new THREE.Mesh(ringGeo, rignMat)
    ringMesh.name = 'pickable'
    ringMesh.value = this.data.totalVal
    this.scene.add(ringMesh)
  }

  /**
   * Setup cylinders
   */
  cylindersSetup = () => {
    // If cylinders were rendered already remove them
    if (this.cylinderGroup) {
      this.scene.remove(this.cylinderGroup)
    }

    this.cylinderGroup = new THREE.Object3D() // Top parent containing all cylinders
    const maxLayerID = getLayer(this.data.items.length - 1, this.settings.shape) // Get max layer ID
    let currentLayer = 0 // ID of layer where current item is on
    let prevLayer = -1 // Previous layer ID (currentLayer - 1)
    let prevObject = null // Object3D used for cloning for item on same layer
    let angleDivision = 0 // Angle division for each layer
    const expCylinderRadius = (this.ringInRadius - this.settings.padding * 2) / (maxLayerID * 2 + 1) // Expected cylinder radius
    const minCylinderRadius = expCylinderRadius * 0.1 // Minimum cylinder radius

    this.data.items.forEach((item, index) => {
      const itemID =
        this.settings.direction === 0 ? index : getSigma(maxLayerID, this.settings.shape) - index // If direction setting is false, reversed id
      const cylinderHeight = item.val !== 0 ? Math.abs(item.val) : 0.1 // Cylinder height
      const realCylinderRadius = expCylinderRadius - this.settings.space / 2 // Real cylinder radius
      currentLayer = getLayer(itemID, this.settings.shape) // Get ID of layer where current item is on
      let cylinderParent = null // Object3D that contains cylinder mesh. It is used for anchoring

      // Define material and geometry for current item/cylinder
      const cylinderGeo = new THREE.CylinderGeometry(
        realCylinderRadius >= minCylinderRadius ? realCylinderRadius : minCylinderRadius,
        realCylinderRadius >= minCylinderRadius ? realCylinderRadius : minCylinderRadius,
        cylinderHeight,
        32
      )
      const cylinderEndColor = pickHex(
        this.gradientColor1,
        this.gradientColor2,
        getGradientWeight(item.val, this.data.minVal, this.data.maxVal)
      )
      // If mapping style is single color, both middle and end color are same. If not different
      this.middleColor =
        this.settings.mapping === 0 ? new THREE.Color(0.5, 0.5, 0) : cylinderEndColor
      const cylinderGradientCols = [
        {
          stop: 0,
          color: item.val >= 0 ? this.middleColor : cylinderEndColor,
        },
        {
          stop: 1,
          color: item.val >= 0 ? cylinderEndColor : this.middleColor,
        },
      ]
      setGradient(cylinderGeo, cylinderGradientCols, 'y') // Geometry vertex gradient color
      const cylinderMat = new THREE.MeshPhongMaterial({
        vertexColors: THREE.VertexColors,
      })

      // Put item/cylinder on proper position
      // If current item is not on same layer of previous item, put its cylinder on next layer.If not, just rotate current cylinder.
      if (currentLayer !== prevLayer) {
        prevLayer = currentLayer // Save as previous layer
        angleDivision =
          currentLayer === 0 ? 0 : (2 * Math.PI) / (this.settings.shape * currentLayer) // Angle division update
        const cylinderMesh = new THREE.Mesh(cylinderGeo, cylinderMat)
        cylinderParent = new THREE.Object3D()
        cylinderParent.add(cylinderMesh)
        cylinderMesh.position.set(0, 0, currentLayer * expCylinderRadius * 2)
      } else {
        cylinderParent = prevObject.clone()
        cylinderParent.children[0].geometry = cylinderGeo
        cylinderParent.children[0].material = cylinderMat
        cylinderParent.rotateY(angleDivision)
      }

      // Y pos adjustment
      cylinderParent.children[0].position.set(
        cylinderParent.children[0].position.x,
        item.val / 2,
        cylinderParent.children[0].position.z
      )

      // Add detail to cylinder
      cylinderParent.children[0].name = 'pickable'
      cylinderParent.children[0].value = item.val

      this.cylinderGroup.add(cylinderParent) // Add to cylinder group
      prevObject = cylinderParent // Save as previous object
    })
    this.scene.add(this.cylinderGroup)
  }

  /**
   * Setup event listener
   */
  eventSetup = () => {
    window.addEventListener('resize', this.onWindowResize, false)
  }

  /**
   * Resize event listener
   */
  onWindowResize = () => {
    this.width = this.container.offsetWidth
    this.height = this.container.offsetHeight
    this.aspect = this.width / this.height

    this.renderer.setSize(this.width, this.height)
    this.camera.aspect = this.aspect

    this.camera.updateProjectionMatrix()
  }

  /**
   * Add/Remove axis helper
   */
  axesSetup = () => {
    // If axis setting is true, add axes. If not remove the existing axis
    if (this.settings.axis) {
      this.axesHelper = new THREE.AxesHelper(this.axisSize)
      this.scene.add(this.axesHelper)
    } else {
      this.scene.remove(this.axesHelper)
      this.axesHelper = null
    }
  }

  /**
   * Add/Remove grid helper
   */
  gridSetup = () => {
    // If grid setting is true, add grid. If not remove the existing grid
    if (this.settings.grid) {
      this.gridHelper = new THREE.GridHelper(this.gridSize, this.gridDivision)
      this.scene.add(this.gridHelper)
    } else {
      this.scene.remove(this.gridHelper)
      this.gridHelper = null
    }
  }

  /**
   * Set dispose flat as true
   */
  dispose = () => {
    this.disposed = true
  }

  /**
   * Update per frame
   */
  update = () => {
    // Update controls
    this.controls.update()
  }

  /**
   * Render per frame
   */
  render = () => {
    this.renderer.render(this.scene, this.camera)
  }

  /**
   * Tick
   */
  tick = () => {
    // If disposed, remove all event listeners and frame update
    if (this.disposed) {
      window.cancelAnimationFrame(this.requestID)
      window.removeEventListener('resize', this.onWindowResize)
      return
    }

    this.render()
    this.update()
    this.requestID = window.requestAnimationFrame(this.tick)
  }
}

export default ThreeJSRenderer
