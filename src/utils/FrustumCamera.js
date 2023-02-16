import * as THREE from 'three'
class FrustumCamera {
    constructor(camera, scene) {
        this.camera = camera
        this.scene = scene
        this.createElement()
    }
    createElement() {
        // const wrapper = document.createElement('div')
        const div1 = document.createElement('div')
        const div2 = document.createElement('div')
        div1.setAttribute('id', 'left')
        div2.setAttribute('id', 'right')
        document.body.append(div1)
        document.body.append(div2)

        this.div1 = div1
        this.div2 = div2
    }

    createFrustum() {
        const helper = new THREE.CameraHelper(this.camera)
        this.scene.add(helper)
    }
}

/**
 * 计算所渲染的画布和显示再某个ele上的宽高比
 * @param {*} canvas
 * @param {*} elem
 * @param {*} renderer
 * @returns
 */
function setScissorForElement(canvas, elem, renderer) {
    const canvasRect = canvas.getBoundingClientRect()
    const elemRect = elem.getBoundingClientRect()

    // 计算canvas的尺寸
    const right = Math.min(elemRect.right, canvasRect.right) - canvasRect.left
    const left = Math.max(0, elemRect.left - canvasRect.left)
    const bottom = Math.min(elemRect.bottom, canvasRect.bottom) - canvasRect.top
    const top = Math.max(0, elemRect.top - canvasRect.top)

    const width = Math.min(canvasRect.width, right - left)
    const height = Math.min(canvasRect.height, bottom - top)

    // 设置剪函数以仅渲染一部分场景
    const positiveYUpBottom = canvasRect.height - bottom
    renderer.setScissor(left, positiveYUpBottom, width, height)
    renderer.setViewport(left, positiveYUpBottom, width, height)

    // 返回aspect
    return width / height
}

export { setScissorForElement }
