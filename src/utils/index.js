import * as THREE from 'three'
import * as Color from './color'
import * as Responsive from './responsive'

const createCamera = () => {
    const fov = 40
    const aspect = 2 // the canvas default
    const near = 0.1
    const far = 1000
    return new THREE.PerspectiveCamera(fov, aspect, near, far)
}

const createLight = () => {
    const color = 0xffffff
    const intensity = 1
    // const light = new THREE.DirectionalLight(color, intensity)
    const light = new THREE.PointLight(color, intensity)

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

export {
    Color,
    Responsive,
    createCamera,
    createLight,
    createRenderer,
    rotateRenderFunc,
}
