import { Scene } from 'three'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'

export const setKine = (scene: Scene) => {
  const loader = new FBXLoader()

  loader.load('./assets/fbx/kine.fbx', (object) => {
    object.name = 'kine'
    object.scale.set(1, 1, 1)
    object.rotateY(-90)
    object.position.set(0, 100, 0)

    scene.add(object)
  })
}
