import * as THREE from 'three'
import { PerspectiveCamera, Scene, WebGLRenderer } from 'three'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'
import { Sky } from 'three/examples/jsm/objects/Sky'

window.addEventListener('load', () => {
  init()
})

let scene: Scene, camera: PerspectiveCamera, renderer: WebGLRenderer
let count = 0

const music = new Audio();

music.preload = 'auto';
music.src = './assets/sound/hit.mp3';
music.load();

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

  setLight()
  setSky()
  setUsu()
  setMochi()
  setKine()
  setTiger()
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

const setTiger = () => {
  const loader = new FBXLoader()

  loader.load('tiger_run.fbx', (object) => {
    object.name = 'tiger'
    object.scale.set(2, 2, 2)
    object.rotateZ(90)
    object.position.set(-200, 0, -200)

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
  count++
  document.querySelector('#count')?.textContent = count.toString()
  music.currentTime = 0;
  music.play();
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
  document.querySelector('#count')?.textContent = count.toString()
  document.querySelector('#timer')?.textContent = 10

  document.querySelector('#end-view')?.setAttribute('style', 'display: none;')
  document.querySelector('#tap-target')?.setAttribute('style', 'display: block;')

  start()
}

const start = () => {
  let remainingTime = 10
  const id = setInterval(() => {
    remainingTime--
    document.querySelector('#timer')?.textContent = remainingTime
    if (remainingTime <= 0) {
      clearInterval(id)
      const text = getText(count)
      document.querySelector('#tap-target')?.setAttribute('style', 'display: none;')

      document.querySelector('#result')?.textContent = text
      const url = 'https://mochitsuki.online'
      const hashtags = '餅つきオンライン'
      document.querySelector('#tweet-button')?.setAttribute('href', `https://twitter.com/intent/tweet?text=${encodeURIComponent(text + ' ' + url)}&hashtags=${encodeURIComponent(hashtags)}`)
      document.querySelector('#end-view')?.setAttribute('style', 'display: flex;')
    }
  }, 1000)
}

const getText = (count: number) => {
  let text = `餅を${count}回つきました`

  if (count < 10) {
    text = `餅を${count}回つきました。あなたは餅の雑魚です。`
  } else if (count < 20) {
    text = `餅を${count}回つきました。あなたは餅の素人です。`
  } else if (count < 30) {
    text = `餅を${count}回つきました。あなたは餅の一般人です。`
  } else if (count < 40) {
    text = `餅を${count}回つきました。あなたは餅の旦那です。`
  } else if (count < 50) {
    text = `餅を${count}回つきました。あなたは餅の達人です。`
  } else if (count < 60) {
    text = `餅を${count}回つきました。あなたは餅の大王です。`
  } else if (count < 70) {
    text = `餅を${count}回つきました。あなたは餅の魔神です。`
  } else if (count < 80) {
    text = `餅を${count}回つきました。あなたは餅の廃人です。`
  } else if (count < 90) {
    text = `餅を${count}回つきました。あなたは餅の狂人です。`
  } else if (count < 100) {
    text = `餅を${count}回つきました。あなたは餅の神です。`
  } else {
    text = `餅を${count}回つきました。あなたは餅の帝王です。`
  }

  return text
}