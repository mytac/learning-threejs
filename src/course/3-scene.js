import * as THREE from 'three'
import { createSun } from '../geometry/solar-system'

const render = (scene) => {
    scene.background = new THREE.Color(0xaaaaaa)

    const objects = []
    const sun = createSun()
    sun.scale.set(5, 5, 5)
    scene.add(sun)
    objects.push(sun)

    return { objects }
}

export default render
