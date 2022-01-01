import * as THREE from 'three'
import { PerspectiveCamera, Scene, WebGLRenderer } from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { Sky } from 'three/examples/jsm/objects/Sky'

window.addEventListener('load', () => {
  init()
})

let scene: Scene, camera: PerspectiveCamera, renderer: WebGLRenderer

const init = () => {
  //シーン、カメラ、レンダラーを生成
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 100, 2000000)
  camera.position.set(0, 100, 2000)
  scene.add(camera)
  renderer = new THREE.WebGLRenderer({antialias:true})
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.outputEncoding = THREE.sRGBEncoding
  renderer.toneMapping = THREE.ACESFilmicToneMapping
  renderer.toneMappingExposure = 0.5

  //OrbitControls
  document.addEventListener('touchmove', (event) => { event.preventDefault() }, { passive: false })
  const orbitControls = new OrbitControls(camera, renderer.domElement)

  //canvasを作成
  document.body.appendChild(renderer.domElement)

  //ウィンドウのリサイズに対応
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
  }, false)

  threeWorld()
  setLight()
  setSky()
  rendering()
}

const threeWorld = () => {
  const axes = new THREE.AxesHelper(1000)
  axes.position.set(0, 0, 0)
  scene.add(axes)

  const grid = new THREE.GridHelper(10000, 2, 0xffffff, 0xffffff)
  scene.add(grid)
}

const setLight = () => {
  const ambientLight = new THREE.AmbientLight(0xFFFFFF)
  scene.add(ambientLight)
}

const setSky = () => {
  const sky = new Sky();
  sky.scale.setScalar(450000);
  scene.add(sky);

  const sun = new THREE.Vector3()

  const uniforms = sky.material.uniforms
  console.log(uniforms)
  uniforms.turbidity.value = 10
  uniforms.rayleigh.value = 3
  uniforms.mieCoefficient.value = 0.005
  uniforms.mieDirectionalG.value = 0.7
  
  const phi = THREE.MathUtils.degToRad(90 - 2)
  const theta = THREE.MathUtils.degToRad(180)

  sun.setFromSphericalCoords(1, phi, theta)

  uniforms.sunPosition.value.copy(sun)
}

const rendering = () => {
  requestAnimationFrame(rendering)
  renderer.render(scene, camera)
}