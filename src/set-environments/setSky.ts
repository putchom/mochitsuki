import { MathUtils, Vector3 } from 'three'
import { Scene } from 'three';
import { Sky } from 'three/examples/jsm/objects/Sky'

export const setSky = (scene: Scene) => {
  const sky = new Sky();
  sky.scale.setScalar(450000);
  scene.add(sky);

  const sun = new Vector3()

  const uniforms = sky.material.uniforms
  uniforms.turbidity.value = 10
  uniforms.rayleigh.value = 3
  uniforms.mieCoefficient.value = 0.005
  uniforms.mieDirectionalG.value = 0.7
  
  const phi = MathUtils.degToRad(90 - 2)
  const theta = MathUtils.degToRad(180)

  sun.setFromSphericalCoords(1, phi, theta)

  uniforms.sunPosition.value.copy(sun)
}