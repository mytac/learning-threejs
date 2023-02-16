import * as THREE from 'three'
import * as Color from './color'
import * as Responsive from './responsive'
import AxisGridHelper from './AxisGridHelper'
import { setScissorForElement } from './FrustumCamera'

const createCamera = (fov = 40, aspect = 2, near = 0.1, far = 1000) => {
    return new THREE.PerspectiveCamera(fov, aspect, near, far)
}

const createLight = (type = 'point') => {
    const color = 0xffffff
    const intensity = 1
    if (type === 'point') {
        return new THREE.PointLight(color, intensity)
    }
    return new THREE.DirectionalLight(color, intensity)

    return light
}

const createRenderer = () => {
    const canvas = document.querySelector('#c')
    const renderer = new THREE.WebGLRenderer({ canvas })
    return renderer
}

// 使用时：requestAnimationFrame(rotateRender)
const rotateRenderFunc = (scene, camera, renderer, meshes = []) => {
    const render = (time) => {
        time *= 0.001 // 将时间单位变为秒

        if (Responsive.resizeRendererToDisplaySize(renderer)) {
            const canvas = renderer.domElement
            camera.aspect = canvas.clientWidth / canvas.clientHeight
            camera.updateProjectionMatrix()
        }

        const speed = 1 + 1 * 0.1
        const rot = time * speed

        meshes.forEach((mesh) => {
            mesh.rotation.y = rot
        })

        renderer.render(scene, camera)
        Responsive.responsive(renderer, camera)
        requestAnimationFrame(render)
    }
    return render
}

function makeAxisGrid(gui, node, label, units) {
    const helper = new AxisGridHelper(node, units)
    gui.add(helper, 'visible').name(label)
}

/**
 * 用于更新相机 fov、aspect、near、far属性
 * @param {Camera} camera
 */
function updateCamera(camera) {
    camera.updateProjectionMatrix()
}

export {
    Color,
    Responsive,
    createCamera,
    createLight,
    createRenderer,
    rotateRenderFunc,
    makeAxisGrid,
    updateCamera,
    setScissorForElement,
}
