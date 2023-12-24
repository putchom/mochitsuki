import { Scene } from 'three'
import { setKine } from './setKine'
import { setMochi } from './setMochi'
import { setRabbit } from './setRabbit'
import { setTiger } from './setTiger'
import { setUsu } from './setUsu'
import { setDragon } from './setDragon'

export const setObjects = (scene: Scene) => {
  setUsu(scene)
  setMochi(scene)
  setKine(scene)
  setTiger(scene)
  setRabbit(scene)
  setDragon(scene)
}
