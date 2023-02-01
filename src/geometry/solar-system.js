import * as THREE from 'three'

const createSun = () => {
    const radius = 1
    const widthSegments = 6
    const heightSegments = 6
    const geo = new THREE.SphereGeometry(radius, widthSegments, heightSegments)
    const material = new THREE.MeshPhongMaterial({ emissive: 0xffff00 })
    const mesh = new THREE.Mesh(geo, material)
    return mesh
}

export { createSun }
