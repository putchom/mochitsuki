import { Scene } from "three"
import { setKine } from "./setKine"
import { setMochi } from "./setMochi"
import { setTiger } from "./setTiger"
import { setUsu } from "./setUsu"

export const setObjects = (scene: Scene) => {
  setUsu(scene)
  setMochi(scene)
  setKine(scene)
  setTiger(scene)
}