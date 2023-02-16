import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { GUI } from 'lil-gui'
import MinMaxGUIHelper from '../utils/MinMaxGUIHelper'
import { createLight, setScissorForElement, Responsive } from '../utils'
import { createCube, createSphere, createPlane } from '../geometry'
import './style/4-camera.css'

/**
 * render之前操作dom，用于处理一些样式
 */
const beforeRender = () => {
    const wrapper = document.createElement('div')
    const div1 = document.createElement('div')
    const div2 = document.createElement('div')
    wrapper.setAttribute('id', 'wrapper')
    div1.setAttribute('id', 'left')
    div2.setAttribute('id', 'right')

    wrapper.append(div1)
    wrapper.append(div2)

    document.body.append(wrapper)
}

const render = (scene, cam, light) => {
    scene.remove(cam)

    const canvas = document.querySelector('#c')
    const view1Elem = document.querySelector('#left')
    const view2Elem = document.querySelector('#right')

    const size = 1
    const near = 5
    const far = 50
    // const camera = createCamera(fov, aspect, near, far)
    const camera = new THREE.OrthographicCamera(
        -size,
        size,
        size,
        -size,
        near,
        far
    )
    camera.zoom = 0.2
    camera.position.set(0, 10, 20)

    const cameraHelper = new THREE.CameraHelper(camera)

    // scene.add(cameraHelper)
    // camera.updateProjectionMatrix()
    // scene.add(camera)

    // 设置GUI
    const gui = new GUI()
    gui.add(camera, 'zoom', 0.01, 1, 0.01).listen()

    const minMaxGUIHelper = new MinMaxGUIHelper(camera, 'near', 'far', 0.1)
    gui.add(minMaxGUIHelper, 'min', 0.1, 50, 0.1).name('near')
    gui.add(minMaxGUIHelper, 'max', 0.1, 50, 0.1).name('far')
    // 设置滚轮控制
    const controls = new OrbitControls(camera, view1Elem) // 只给第一个视窗中的摄像机分配OrbitControls：
    controls.target.set(0, 5, 0)
    controls.update()

    // 设置第二个camera和滚轮控制
    const camera2 = new THREE.PerspectiveCamera(
        60, // fov
        2, // aspect
        0.1, // near
        500 // far
    )
    // camera2.position.set(40, 10, 30)
    camera2.position.set(16, 28, 40)
    camera2.lookAt(0, 5, 0)

    const controls2 = new OrbitControls(camera2, view2Elem)
    controls2.target.set(0, 5, 0)
    controls2.update()

    scene.background = new THREE.Color('black')
    scene.add(cameraHelper)

    {
        // 设置灯光
        const newLight = createLight('direct')
        light = newLight
        light.position.set(0, 10, 0)
        light.target.position.set(-50, -10, 0)
        scene.add(light)
        scene.add(light.target)

        // 设置地面
        const plane = createPlane()
        plane.rotation.x = Math.PI * -0.5
        scene.add(plane)

        // 设置球体
        const sphereRadius = 3
        const sphere = createSphere('#9D86C3')
        sphere.position.set(0, 0, 0)
        sphere.position.set(-sphereRadius - 1, sphereRadius + 2, 0)
        scene.add(sphere)

        // 设置立方体
        const cubeSize = 4
        const cube = createCube(cubeSize, '#EFD769')
        cube.position.set(cubeSize + 1, cubeSize / 2, 0)
        scene.add(cube)
    }

    //
    const afterRender = (renderer) => {
        Responsive.resizeRendererToDisplaySize(renderer)
        // turn on the scissor
        renderer.setScissorTest(true)

        // 渲染主视野
        {
            const aspect = setScissorForElement(canvas, view1Elem, renderer)
            // 用计算出的aspect修改摄像机参数
            camera.left = -aspect
            camera.right = aspect
            camera.updateProjectionMatrix()
            cameraHelper.update()

            // 来原视野中不要绘制cameraHelper
            cameraHelper.visible = false
            scene.background = new THREE.Color(0x000000)

            // 渲染
            renderer.render(scene, camera)
        }

        // 渲染第二台摄像机
        {
            const aspect = setScissorForElement(canvas, view2Elem, renderer)

            // 调整aspect
            camera2.aspect = aspect
            camera2.updateProjectionMatrix()

            // 在第二台摄像机中绘制cameraHelper
            cameraHelper.visible = true

            scene.background = new THREE.Color(0x000040)

            renderer.render(scene, camera2)
        }
        const renderFunction = afterRender.bind(null, renderer)
        requestAnimationFrame(renderFunction)
        return renderFunction
    }

    return {
        objects: [],
        camera: camera,
        afterRender,
        useDefaultRender: false,
    }
}

export { beforeRender, render }
