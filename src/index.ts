import * as THREE from 'three'
import { PerspectiveCamera, Scene, WebGLRenderer } from 'three'
import { getResultText } from './getResultText'
import { setEnvironments } from './set-environments'
import { setObjects } from './set-objects'

let scene: Scene,
    camera: PerspectiveCamera,
    renderer: WebGLRenderer,
    soundEffect: HTMLAudioElement
let count = 0

window.addEventListener('load', () => {
  init()
})

const init = () => {
  // シーンを生成
  scene = new THREE.Scene();

  // カメラを生成
  camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 100, 2000000)
  camera.position.set(0, 600, 500)
  camera.lookAt(new THREE.Vector3(0, 0, 0))
  scene.add(camera)

  // レンダラーを生成
  renderer = new THREE.WebGLRenderer({antialias:true})
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.outputEncoding = THREE.sRGBEncoding
  renderer.toneMapping = THREE.ACESFilmicToneMapping
  renderer.toneMappingExposure = 0.5

  // Canvasを作成
  document.body.appendChild(renderer.domElement)

  // SEを生成
  soundEffect = new Audio()
  soundEffect.preload = 'auto'
  soundEffect.src = './assets/sound/hit.mp3'
  soundEffect.load()

  //ウィンドウのリサイズに対応
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
  }, false)

  setEnvironments(scene)
  setObjects(scene)
  rendering()

  document.querySelector('#tap-target')?.addEventListener('pointerdown', () => {
    handlePointerDownTapTarget()
  })

  document.querySelector('#tap-target')?.addEventListener('pointerup', () => {
    handlePointerUpTapTarget()
  })

  document.querySelector('#start-button')?.addEventListener('click', (event) => {
    handleClickStartButton(event)
  })

  document.querySelector('#restart-button')?.addEventListener('click', (event) => {
    handleClickRestartButton(event)
  })
}

const rendering = () => {
  requestAnimationFrame(rendering)
  renderer.render(scene, camera)
}

const handlePointerDownTapTarget = () => {
  const kine = scene.getObjectByName('kine')
  kine?.position.set(0, 0, 0)
  soundEffect.currentTime = 0;
  soundEffect.play();
}

const handlePointerUpTapTarget = () => {
  const kine = scene.getObjectByName('kine')
  kine?.position.set(0, 100, 0)
  count++
  document.querySelector('#count')!.textContent = count.toString()
}

const handleClickStartButton = (event: Event) => {
  event.preventDefault()
  document.querySelector('#start-view')?.setAttribute('style', 'display: none;')
  document.querySelector('#tap-target')?.setAttribute('style', 'display: block;')

  start()
}

const handleClickRestartButton = (event: Event) => {
  event.preventDefault()
  count = 0
  document.querySelector('#count')!.textContent = count.toString()
  document.querySelector('#timer')!.textContent = '10'

  document.querySelector('#end-view')?.setAttribute('style', 'display: none;')
  document.querySelector('#tap-target')?.setAttribute('style', 'display: block;')

  start()
}

const start = () => {
  let remainingTime = 10
  const id = setInterval(() => {
    remainingTime--
    document.querySelector('#timer')!.textContent = remainingTime.toString()
    if (remainingTime <= 0) {
      clearInterval(id)
      const text = getResultText(count)
      document.querySelector('#tap-target')?.setAttribute('style', 'display: none;')

      document.querySelector('#result')!.textContent = text
      const url = 'http://mochituki.online'
      const hashtags = '餅つきオンライン'
      document.querySelector('#tweet-button')?.setAttribute('href', `https://twitter.com/intent/tweet?text=${encodeURIComponent(text + ' ' + url)}&hashtags=${encodeURIComponent(hashtags)}`)
      document.querySelector('#end-view')?.setAttribute('style', 'display: flex;')
    }
  }, 1000)
}