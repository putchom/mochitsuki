import { Scene } from 'three'
import { setLight } from './setLight'
import { setSky } from './setSky'

export const setEnvironments = (scene: Scene) => {
  setLight(scene)
  setSky(scene)
}
