import * as THREE from 'three'
import { PerspectiveCamera, Scene, WebGLRenderer } from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

window.addEventListener('load', () => {
  init()
})

let scene: Scene, camera: PerspectiveCamera, renderer: WebGLRenderer

const init = () => {
  //シーン、カメラ、レンダラーを生成
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000)
  camera.position.set(0.1, 0, 0)
  scene.add(camera)
  renderer = new THREE.WebGLRenderer({antialias:true})
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.setSize(window.innerWidth, window.innerHeight)

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
  rendering()
}

const threeWorld = () => {
  const axes = new THREE.AxesHelper(1000)
  axes.position.set(0, 0, 0)
  scene.add(axes)

  const grid = new THREE.GridHelper(100, 100)
  scene.add(grid)
}

const setLight = () => {
  const ambientLight = new THREE.AmbientLight(0xFFFFFF)
  scene.add(ambientLight)
}

const rendering = () => {
  requestAnimationFrame(rendering)
  renderer.render(scene, camera)
}