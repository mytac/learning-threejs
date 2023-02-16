import * as THREE from 'three'
import GUI from 'lil-gui'
import {
    createCamera,
    createLight,
    createRenderer,
    rotateRenderFunc,
} from './utils/index.js'
import * as Demo from './course/4-camera'
import './style.css'

// const axesHelper = new THREE.AxesHelper(5)

const main = () => {
    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0xaaaaaa)

    const renderer = createRenderer()

    let cam = createCamera()
    cam.position.set(0, 0, 10)

    const light = createLight()
    light.position.set(0, 0, 0)
    scene.add(light)

    Demo.beforeRender()

    const {
        objects = [],
        camera = cam,
        afterRender = () => {},
        useDefaultRender = true,
    } = Demo.render(scene, cam, light)
    renderer.render(scene, camera)

    if (useDefaultRender) {
        const render = rotateRenderFunc(scene, camera, renderer, objects)
        requestAnimationFrame(render)
    } else {
        const renderFunc = afterRender(renderer)
        requestAnimationFrame(renderFunc)
    }
}

main()
