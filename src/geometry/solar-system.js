import * as THREE from 'three'

const createGeometry = () => {
    const radius = 1
    const widthSegments = 6
    const heightSegments = 6
    const geo = new THREE.SphereGeometry(radius, widthSegments, heightSegments)
    return geo
}

const createSun = () => {
    const geo = createGeometry()
    const material = new THREE.MeshPhongMaterial({ emissive: 0xffff00 })
    const mesh = new THREE.Mesh(geo, material)
    return mesh
}

const createEarth = () => {
    const geo = createGeometry()

    const earthMaterial = new THREE.MeshPhongMaterial({
        color: 0x2233ff,
        emissive: 0x112244,
    })
    const earthMesh = new THREE.Mesh(geo, earthMaterial)
    return earthMesh
}

const createMoon = () => {
    const geo = createGeometry()

    const material = new THREE.MeshPhongMaterial({
        color: 0x888888,
        emissive: 0x222222,
    })
    const mesh = new THREE.Mesh(geo, material)
    return mesh
}

export { createSun, createEarth, createMoon }
