import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

const scene1 = new THREE.Scene()

const camera1 = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
camera1.position.z = 2


const canvas = document.getElementById("heroVisual") as HTMLCanvasElement
const renderer = new THREE.WebGLRenderer({canvas:canvas})
renderer.setSize(1200, 1200)
document.body.appendChild(renderer.domElement)

new OrbitControls(camera1, renderer.domElement)

const geometry = new THREE.BoxGeometry()
const material = new THREE.MeshBasicMaterial({
    color: 0x00ff00,
    wireframe: true,
})

const cube = new THREE.Mesh(geometry, material)
scene1.add(cube)

window.addEventListener('resize', onWindowResize, false)
function onWindowResize() {
    camera1.aspect = window.innerWidth / window.innerHeight
    camera1.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
    render()
}

function animate() {
    requestAnimationFrame(animate)

    cube.rotation.x += 0.01
    cube.rotation.y += 0.01

    // controls.update()

    render()
}

function render() {
    renderer.render(scene1, camera1)
}
animate()
