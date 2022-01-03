import { Scene } from 'three'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'

export const setTiger = (scene: Scene) => {
  const loader = new FBXLoader()

  loader.load('./assets/fbx/tiger_run.fbx', (object) => {
    object.name = 'tiger'
    object.scale.set(2, 2, 2)
    object.rotateZ(90)
    object.position.set(-200, 0, -200)

    scene.add(object)
  })
}