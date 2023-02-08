import * as THREE from 'three'
import GUI from 'lil-gui'
import {
    createCamera,
    createLight,
    createRenderer,
    rotateRenderFunc,
} from './utils/index.js'
import runDemo from './course/3-scene'
import './style.css'

// const axesHelper = new THREE.AxesHelper(5)

const main = () => {
    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0xaaaaaa)

    const renderer = createRenderer()

    const camera = createCamera()
    camera.position.set(0, 50, 0)
    camera.up.set(0, 0, 1)
    camera.lookAt(0, 0, 0)

    const light = createLight()
    // light.position.set(-1, 2, 4)
    scene.add(light)

    const { objects } = runDemo(scene, camera)
    renderer.render(scene, camera)

    const render = rotateRenderFunc(scene, camera, renderer, objects)

    requestAnimationFrame(render)
}

main()
