import * as THREE from 'three'
import { PerspectiveCamera, Scene, WebGLRenderer } from 'three'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'
import { Sky } from 'three/examples/jsm/objects/Sky'

window.addEventListener('load', () => {
  init()
})

let scene: Scene, camera: PerspectiveCamera, renderer: WebGLRenderer
let count: number = 0

const init = () => {
  //シーン、カメラ、レンダラーを生成
  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 100, 2000000)
  camera.position.set(0, 600, 500)
  camera.lookAt(new THREE.Vector3(0, 0, 0))
  scene.add(camera)

  renderer = new THREE.WebGLRenderer({antialias:true})
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.outputEncoding = THREE.sRGBEncoding
  renderer.toneMapping = THREE.ACESFilmicToneMapping
  renderer.toneMappingExposure = 0.5

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
  setUsu()
  setMochi()
  setKine()
  rendering()

  document.querySelector('#tap-target')?.addEventListener('pointerdown', () => {
    handlePointerDownTapTarget()
  })

  document.querySelector('#tap-target')?.addEventListener('pointerup', () => {
    handlePointerUpTapTarget()
  })
}

const threeWorld = () => {
  // const axes = new THREE.AxesHelper(1000)
  // axes.position.set(0, 0, 0)
  // scene.add(axes)

  // const grid = new THREE.GridHelper(10000, 2, 0xffffff, 0xffffff)
  // scene.add(grid)
}

const setLight = () => {
  const ambientLight = new THREE.AmbientLight(0xFFFFFF)
  scene.add(ambientLight)

  const directionalLight = new THREE.DirectionalLight(0xFFFFFF, 1);
  scene.add(directionalLight);

  const hemisphereLight = new THREE.HemisphereLight(0x888888, 0x0000FF, 1.0)
  scene.add(hemisphereLight)
}

const setSky = () => {
  const sky = new Sky();
  sky.scale.setScalar(450000);
  scene.add(sky);

  const sun = new THREE.Vector3()

  const uniforms = sky.material.uniforms
  uniforms.turbidity.value = 10
  uniforms.rayleigh.value = 3
  uniforms.mieCoefficient.value = 0.005
  uniforms.mieDirectionalG.value = 0.7
  
  const phi = THREE.MathUtils.degToRad(90 - 2)
  const theta = THREE.MathUtils.degToRad(180)

  sun.setFromSphericalCoords(1, phi, theta)

  uniforms.sunPosition.value.copy(sun)
}

const setUsu = () => {
  const loader = new FBXLoader()

  loader.load('usu.fbx', (object) => {
    object.name = 'usu'
    object.scale.set(1, 1, 1)

    scene.add(object)
  })
}

const setMochi = () => {
  const loader = new FBXLoader()

  loader.load('mochi.fbx', (object) => {
    object.name = 'mochi'
    object.scale.set(1, 1, 1)
    
    scene.add(object)
  })
}

const setKine = () => {
  const loader = new FBXLoader()

  loader.load('kine.fbx', (object) => {
    object.name = 'kine'
    object.scale.set(1, 1, 1)
    object.rotateY(-90)
    object.position.set(0, 100, 0)

    scene.add(object)
  })
}

const rendering = () => {
  requestAnimationFrame(rendering)
  renderer.render(scene, camera)
}

const handlePointerDownTapTarget = () => {
  const kine = scene.getObjectByName('kine')
  kine?.position.set(0, 0, 0)
}

const handlePointerUpTapTarget = () => {
  const kine = scene.getObjectByName('kine')
  kine?.position.set(0, 100, 0)
  count += 1
  document.querySelector('#count')?.textContent = count.toString()
}