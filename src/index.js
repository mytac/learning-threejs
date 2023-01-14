import { responsive } from './utils/responsive.js'
const THREE = window.THREE
const axesHelper = new THREE.AxesHelper(5)

const createRenderer = () => {
    const canvas = document.querySelector('#c')
    const renderer = new THREE.WebGLRenderer({ canvas })
    return renderer
}

const createCamera = () => {
    const fov = 75
    const aspect = 2 // the canvas default
    const near = 0.1
    const far = 5
    return new THREE.PerspectiveCamera(fov, aspect, near, far)
}

const createBoxG = () => {
    const boxWidth = 1
    const boxHeight = 1
    const boxDepth = 1
    const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth)
    return geometry
}

const createMaterial = (color = 0x44aa88) => {
    const material = new THREE.MeshPhongMaterial({ color })
    return material
}

const createMesh = (color = 0x44aa88, x = 0) => {
    const geometry = createBoxG()
    const material = createMaterial(color)
    const cube = new THREE.Mesh(geometry, material)
    cube.position.x = x
    return cube
}

const createLight = () => {
    const color = 0xffffff
    const intensity = 1
    const light = new THREE.DirectionalLight(color, intensity)
    return light
}

const main = () => {
    const scene = new THREE.Scene()

    // 添加平行光
    const light = createLight()
    light.position.set(-1, 2, 4)
    scene.add(light)

    const meshes = [
        createMesh(),
        createMesh(0x8844aa, -2),
        createMesh(0xaa8844, 2),
    ]

    meshes.forEach((mesh) => {
        scene.add(mesh)
    })

    scene.add(axesHelper)

    const renderer = createRenderer()
    const camera = createCamera()

    camera.position.z = 2

    renderer.render(scene, camera)

    function render(time) {
        time *= 0.001 // 将时间单位变为秒

        meshes.forEach((mesh, ndx) => {
            const speed = 1 + ndx * 0.1
            const rot = time * speed
            mesh.rotation.x = rot
            mesh.rotation.y = rot
        })

        renderer.render(scene, camera)
        responsive(renderer, camera)
        requestAnimationFrame(render)
    }

    requestAnimationFrame(render)
}

main()
