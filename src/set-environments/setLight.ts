import { Scene, AmbientLight, DirectionalLight, HemisphereLight } from 'three';

export const setLight = (scene: Scene) => {
  const ambientLight = new AmbientLight(0xFFFFFF)
  scene.add(ambientLight)

  const directionalLight = new DirectionalLight(0xFFFFFF, 1);
  scene.add(directionalLight);

  const hemisphereLight = new HemisphereLight(0x888888, 0x0000FF, 1.0)
  scene.add(hemisphereLight)
}