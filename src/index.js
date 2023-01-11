const THREE = window.THREE

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

const createMaterial = () => {
    const material = new THREE.MeshBasicMaterial({ color: 0x44aa88 })
    return material
}

const createMesh = () => {
    const geometry = createBoxG()
    const material = createMaterial()
    const cube = new THREE.Mesh(geometry, material)
    return cube
}

const createScene = () => {
    const scene = new THREE.Scene()
    const mesh = createMesh()
    scene.add(mesh)
    return scene
}
function main() {
    const renderer = createRenderer()
    const camera = createCamera()
    camera.position.z = 4
    const scene = createScene()
    renderer.render(scene, camera)
}

main()
