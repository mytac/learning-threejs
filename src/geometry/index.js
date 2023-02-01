import * as THREE from 'three'

const createBox = (opt = {}) => {
    const {
        width = 8,
        height = 8,
        depth = 8,
        widthSegments = 1,
        heightSegments = 1,
        depthSegments = 1,
    } = opt
    return new THREE.BoxGeometry(width, height, depth)
}

export { createBox }
