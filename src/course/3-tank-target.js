import * as THREE from 'three'
import { GUI } from 'lil-gui'
import { createTank } from '../geometry/3-tank-take-aim'
import { makeAxisGrid } from '../utils/index'

const render = (scene, camera, light) => {
    camera.position.set(-2, 10, 40)
    camera.up.set(0, -1, 0)
    camera.lookAt(0, 0, 0)

    light.position.set(-20, 20, 40)
    scene.add(light)

    const gui = new GUI()
    scene.background = new THREE.Color('#D9E8F5')

    const tank = createTank()
    scene.add(tank)

    // 建立GUI
    makeAxisGrid(gui, tank, 'solarSystem', 25)
    // makeAxisGrid(gui, sun, 'sunMesh')
    // makeAxisGrid(gui, earthOrbit, 'earthOrbit')
    // makeAxisGrid(gui, earth, 'earthMesh')
    // makeAxisGrid(gui, moon, 'moon')
    return {}
}

export default render
