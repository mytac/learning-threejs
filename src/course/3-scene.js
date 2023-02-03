import * as THREE from 'three'
import { createSun, createEarth, createMoon } from '../geometry/solar-system'

const render = (scene, camera) => {
    scene.background = new THREE.Color(0xaaaaaa)
    camera.position.set(0, 50, 0)

    const objects = []
    const solarSystem = new THREE.Object3D()
    scene.add(solarSystem)
    objects.push(solarSystem)

    const sun = createSun()
    sun.scale.set(5, 5, 5)
    // objects.push(sun)
    solarSystem.add(sun)

    const earth = createEarth()

    const earthOribit = new THREE.Object3D(0xaaaaaa)
    earthOribit.add(earth)
    earthOribit.position.x = 10

    objects.push(earthOribit)

    solarSystem.add(earthOribit)

    const moon = createMoon()
    moon.scale.set(0.5, 0.5, 0.5)
    moon.position.x = 2

    earthOribit.add(moon)

    objects.push(earthOribit)

    return { objects }
}

export default render
