import * as THREE from 'three'

const createCube = (cubeSize = 4, color = '#8AC') => {
    const geo = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize)
    const mat = new THREE.MeshPhongMaterial({ color })
    const mesh = new THREE.Mesh(geo, mat)
    return mesh
}

const createSphere = (
    color = '#CA8',
    options = { radius: 3, widthDvs: 32, heightDvs: 16 }
) => {
    const { radius, widthDvs, heightDvs } = options
    const geo = new THREE.SphereGeometry(radius, widthDvs, heightDvs)
    const mat = new THREE.MeshPhongMaterial({ color })
    const mesh = new THREE.Mesh(geo, mat)
    return mesh
}

const createGround = (planeSize = 40, color = '#CA8') => {
    const loader = new THREE.TextureLoader()
    const texture = loader.load(require('../static/checker.png'))
    texture.wrapS = THREE.RepeatWrapping
    texture.wrapT = THREE.RepeatWrapping
    texture.magFilter = THREE.NearestFilter
    const repeats = planeSize / 2
    texture.repeat.set(repeats, repeats)

    const geo = new THREE.PlaneGeometry(planeSize, planeSize)
    const mat = new THREE.MeshPhongMaterial({ color })
    const mesh = new THREE.Mesh(geo, mat)

    return mesh
}

export { createCube, createSphere, createGround }
