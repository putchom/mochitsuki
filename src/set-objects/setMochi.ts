import { Scene } from 'three'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'

export const setMochi = (scene: Scene) => {
  const loader = new FBXLoader()

  loader.load('./assets/fbx/mochi.fbx', (object) => {
    object.name = 'mochi'
    object.scale.set(1, 1, 1)
    
    scene.add(object)
  })
}