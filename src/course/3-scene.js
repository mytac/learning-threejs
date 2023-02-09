import * as THREE from 'three'
import { GUI } from 'lil-gui'
import { makeAxisGrid } from '../utils'
import { createSun, createEarth, createMoon } from '../geometry/solar-system'

const render = (scene, camera, light) => {
    camera.position.set(0, 50, 0)
    camera.up.set(0, 0, 1)
    camera.lookAt(0, 0, 0)

    const gui = new GUI()

    scene.background = new THREE.Color('#000')
    camera.position.set(0, 50, 0)

    light.position.set(0, 0, 0)
    scene.add(light)

    const objects = []
    const solarSystem = new THREE.Object3D()

    scene.add(solarSystem)
    objects.push(solarSystem)
    objects.push(scene)

    const sun = createSun()
    sun.scale.set(5, 5, 5)
    // objects.push(sun)
    solarSystem.add(sun)

    const earth = createEarth()

    const earthOrbit = new THREE.Object3D('#000')
    earthOrbit.add(earth)
    earthOrbit.position.x = 10

    objects.push(earthOrbit)
    solarSystem.add(earthOrbit)

    const moon = createMoon()
    moon.scale.set(0.5, 0.5, 0.5)
    moon.position.x = 2

    earthOrbit.add(moon)

    objects.push(moon)
    objects.push(earthOrbit)

    // 为每个节点添加一个AxesHelper
    // objects.forEach((node) => {
    //     const axes = new THREE.AxesHelper()
    //     axes.material.depthTest = false // 不会检查其是否在其他东西后面进行绘制
    //     axes.renderOrder = 1 // 轴在所有球体之后被绘制
    //     node.add(axes)

    //     const size = 10 // 坐标格尺寸. 默认为 10.
    //     const divisions = 10 // 坐标格细分次数. 默认为 10.
    //     const grid = new THREE.GridHelper(size, divisions)
    //     node.add(grid)
    // })

    // 建立GUI
    makeAxisGrid(gui, solarSystem, 'solarSystem', 25)
    makeAxisGrid(gui, sun, 'sunMesh')
    makeAxisGrid(gui, earthOrbit, 'earthOrbit')
    makeAxisGrid(gui, earth, 'earthMesh')
    makeAxisGrid(gui, moon, 'moon')

    return { objects }
}

export default render
