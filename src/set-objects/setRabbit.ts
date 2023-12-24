import { Scene } from 'three'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'

export const setRabbit = (scene: Scene) => {
  const loader = new FBXLoader()

  loader.load('./assets/fbx/rabbit.fbx', (object) => {
    object.name = 'rabbit'
    object.scale.set(60, 60, 60)
    object.rotateY(-90)
    object.position.set(200, 0, -600)

    scene.add(object)
  })
}
