import { Scene } from 'three'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'

export const setDragon = (scene: Scene) => {
  const loader = new FBXLoader()

  loader.load('./assets/fbx/dragon.fbx', (object) => {
    object.name = 'dragon'
    object.scale.set(1.5, 1.5, 1.5)
    object.rotateY(1)
    object.position.set(-240, 100, 0)

    scene.add(object)
  })
}
