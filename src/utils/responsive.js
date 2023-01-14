// 相机随着屏幕宽高自适应aspect
const cameraResponsive = (camera, renderer) => {
    const canvas = renderer.domElement
    camera.aspect = canvas.clientWidth / canvas.clientHeight
    camera.updateProjectionMatrix()
}

// 判断render是否需要 resize
const resizeRendererToDisplaySize = (renderer) => {
    const canvas = renderer.domElement
    const pixelRatio = window.devicePixelRatio
    const width = (canvas.clientWidth * pixelRatio) | 0
    const height = (canvas.clientHeight * pixelRatio) | 0
    const needResize = canvas.width !== width || canvas.height !== height
    if (needResize) {
        renderer.setSize(width, height, false)
    }
    return needResize
}

const responsive = (renderer, camera) => {
    if (resizeRendererToDisplaySize(renderer)) {
        cameraResponsive(camera, renderer)
    }
}

export { cameraResponsive, resizeRendererToDisplaySize, responsive }
