import { Scene } from 'three'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'

export const setUsu = (scene: Scene) => {
  const loader = new FBXLoader()

  loader.load('./assets/fbx/usu.fbx', (object) => {
    object.name = 'usu'
    object.scale.set(1, 1, 1)

    scene.add(object)
  })
}
