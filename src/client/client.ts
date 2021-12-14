import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import Stats from 'three/examples/jsm/libs/stats.module'
import { Camera, TextureLoader } from 'three'


const animationOne = document.getElementById('animationOne') as HTMLCanvasElement

const sceneOne = new THREE.Scene()
sceneOne.background = new THREE.Color(0xffffff)

const light = new THREE.AmbientLight(0xffffff)
sceneOne.add(light)

const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000)
camera.position.z = 5


const renderer = new THREE.WebGLRenderer({canvas: animationOne})
renderer.setSize(window.innerWidth, window.innerHeight)
// document.body.appendChild(renderer.domElement)

const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true

// const geometry = new THREE.BoxGeometry()
// const material = new THREE.MeshBasicMaterial({
//     color: 0x00ff00,
//     wireframe: true,
// })

const texture = new TextureLoader().load('assets/noemi/phone/phones.png')
const geometry = new THREE.PlaneBufferGeometry(4, 3);
const material = new THREE.MeshBasicMaterial( { map: texture } );
const imageMesh = new THREE.Mesh( geometry, material );
sceneOne.add( imageMesh );

// const cube = new THREE.Mesh(geometry, material)
// sceneOne.add(cube)

window.addEventListener('resize', onWindowResize, false)
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
    render()
}

var scaleup =false
var scaleforzoom = 1
window.addEventListener('mousemove', e =>{

    var mouse = new THREE.Vector2();
    mouse.x = ( e.clientX / window.innerWidth ) * 2 - 1;
    mouse.y = - ( e.clientY / window.innerHeight ) * 2 + 1;

    var raycaster = new THREE.Raycaster();
    raycaster.setFromCamera( mouse, camera );
    var intersects = raycaster.intersectObject( imageMesh );

    if(intersects.length > 0) {
        if (scaleup == false && scaleforzoom==1){
            scaleup=true
        }
        else if (scaleup==true &&scaleforzoom>=1.2){
            scaleup=false
        }
    }

})

function animate() {
    requestAnimationFrame(animate)

    // cube.rotation.x += 0.01
    // cube.rotation.y += 0.01
    if (scaleup && scaleforzoom <1.2){
        scaleforzoom+=0.01
            imageMesh.scale.set(scaleforzoom,scaleforzoom, 1)
    }
    controls.update()

    render()
}

function render() {
    renderer.render(sceneOne, camera)
}

animate()
