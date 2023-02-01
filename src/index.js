import './style.css'
import { responsive } from './utils/responsive.js'
import * as THREE from 'three'

const axesHelper = new THREE.AxesHelper(5)

const createRenderer = () => {
    const canvas = document.querySelector('#c')
    const renderer = new THREE.WebGLRenderer({ canvas })
    return renderer
}

const createCamera = () => {
    const fov = 40
    const aspect = 2 // the canvas default
    const near = 0.1
    const far = 1000
    return new THREE.PerspectiveCamera(fov, aspect, near, far)
}

const setRandomColor = (material) => {
    const hue = Math.random()
    const saturation = 1
    const luminance = 0.5
    material.color.setHSL(hue, saturation, luminance)

    return material
}

const createRandomMaterial = () => {
    const material = new THREE.MeshPhongMaterial({
        side: THREE.DoubleSide,
    })

    const hue = Math.random()
    const saturation = 1
    const luminance = 0.5
    material.color.setHSL(hue, saturation, luminance)

    return material
}

const getImageMaterial = (url) => {
    const loader = new THREE.TextureLoader()
    const texture = loader.load(url)
    texture.wrapS = THREE.MirroredRepeatWrapping
    texture.wrapT = THREE.MirroredRepeatWrapping
    texture.repeat.x = 4
    texture.repeat.y = 4
    const material = new THREE.MeshBasicMaterial({
        map: texture,
    })
    return material
}

const createMesh = (color = 0x44aa88, x = 0) => {
    const geometry = new THREE.BoxGeometry(7, 12, 19)
    const img = require('./static/flowers.jpg')
    const material = getImageMaterial(img)
    // setRandomColor(material)
    // const material = createRandomMaterial()
    const mesh = new THREE.Mesh(geometry, material)

    return mesh
}

const createLight = () => {
    const color = 0xffffff
    const intensity = 1
    const light = new THREE.DirectionalLight(color, intensity)
    return light
}

const main = () => {
    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0xaaaaaa)

    // 添加平行光
    const light = createLight()
    light.position.set(-1, 2, 4)
    scene.add(light)

    const mesh = createMesh()
    scene.add(mesh)
    scene.add(axesHelper)

    const renderer = createRenderer()
    const camera = createCamera()

    camera.position.z = 30

    renderer.render(scene, camera)

    function render(time) {
        time *= 0.0001 // 将时间单位变为秒

        const speed = 1 + 1 * 0.1
        const rot = time * speed
        mesh.rotation.x = rot
        mesh.rotation.y = rot

        renderer.render(scene, camera)
        responsive(renderer, camera)
        requestAnimationFrame(render)
    }

    requestAnimationFrame(render)
}

main()
