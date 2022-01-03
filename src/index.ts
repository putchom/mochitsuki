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
let id: NodeJS.Timer

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

  // ウィンドウのリサイズに対応
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
  }, false)

  setEnvironments(scene)
  setObjects(scene)
  rendering()
}

const rendering = () => {
  requestAnimationFrame(rendering)
  renderer.render(scene, camera)
}

const handlePointerDownTapTarget = () => {
  // 杵の位置をもとに戻す
  const kine = scene.getObjectByName('kine')
  kine?.position.set(0, 0, 0)

  // 打撃音を鳴らす
  soundEffect.currentTime = 0;
  soundEffect.play();
}

const handlePointerUpTapTarget = () => {
  // 杵を下げる
  const kine = scene.getObjectByName('kine')
  kine?.position.set(0, 100, 0)

  // カウントアップしてビューに反映
  count++
  document.querySelector('#count')!.textContent = count.toString()
}

const handleClickStartButton = (event: Event) => {
  event.preventDefault()

  // スタート画面を非表示にしてタップターゲットを表示
  document.querySelector('#start-view')?.classList.remove('--active')
  document.querySelector('#tap-target')?.classList.add('--active')

  // スタートを実行
  start()
}

const handleClickRestartButton = (event: Event) => {
  event.preventDefault()

  // カウントを0にしてビューに反映
  count = 0
  document.querySelector('#count')!.textContent = count.toString()

  // 時間の表示をリセット
  document.querySelector('#timer')!.textContent = '10'

  // 結果画面を非表示にしてタップターゲットを表示
  document.querySelector('#result-view')?.classList.remove('--active')
  document.querySelector('#tap-target')?.classList.add('--active')

  // スタートを実行
  start()
}

const start = () => {
  // 10秒間タイマーを更新したあとendを実行
  let remainingTime = 10

  id = setInterval(() => {
    remainingTime--
    document.querySelector('#timer')!.textContent = remainingTime.toString()
    if (remainingTime <= 0) {
      end()
    }
  }, 1000)
}

const end = () => {
  // タイマーをリセット
  clearInterval(id)

  // タップターゲットを非表示にする
  document.querySelector('#tap-target')?.classList.remove('--active')

  // 結果のテキストを取得
  const text = getResultText(count)

  // 結果画面に結果のテキストを挿入する
  document.querySelector('#result')!.textContent = text

  // ツイートボタンに結果のテキストを挿入する
  const url = 'http://mochituki.online'
  const hashtags = '餅つきオンライン'
  document.querySelector('#tweet-button')?.setAttribute('href', `https://twitter.com/intent/tweet?text=${encodeURIComponent(text + ' ' + url)}&hashtags=${encodeURIComponent(hashtags)}`)

  // 結果画面を表示する
  document.querySelector('#result-view')?.classList.add('--active')
}

window.addEventListener('load', () => {
  init()
})

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