/**
 * 创建一个坦克mesh
 */

import * as THREE from 'three'

const createTank = () => {
    const objects = []
    const tank = new THREE.Object3D()

    const bodyWrapper = new THREE.Object3D()
    const body = new THREE.BoxGeometry(10, 2, 10)
    const bodyMaterial = new THREE.MeshPhongMaterial({
        color: '#27C8E3',
        emissive: 0x112244,
    })
    const bodyMesh = new THREE.Mesh(body, bodyMaterial)

    const barrel = new THREE.CylinderGeometry(1, 1, 6, 12)
    const barrelMaterial = new THREE.MeshPhongMaterial({
        color: '#9527E3',
        emissive: 0x112244,
    })
    const barrelMesh = new THREE.Mesh(barrel, barrelMaterial)
    barrelMesh.position.set(0, 2, 4)
    barrelMesh.rotation.set(-Math.PI / 1.5, 0, 0)

    bodyWrapper.add(barrelMesh)

    const wheelsPositions = [
        [4, -2, 2],
        [-4, -2, 2],
        [4, -2, -2],
        [-4, -2, -2],
    ]
    const wheels = new Array(4).fill(1).map((_, index) => {
        const meterial = new THREE.MeshPhongMaterial({
            color: '#B3B364',
            emissive: 0x112244,
        })
        const geo = new THREE.CylinderGeometry(2, 2, 1, 12)
        const mesh = new THREE.Mesh(geo, meterial)
        mesh.position.set(...wheelsPositions[index])
        mesh.rotation.set(0, 0, -Math.PI / 2)
        bodyWrapper.add(mesh)
        return mesh
    })

    tank.add(bodyMesh)
    tank.add(bodyWrapper)

    return tank
}

export { createTank }
