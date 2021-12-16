import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import Stats from 'three/examples/jsm/libs/stats.module'
import { Camera, TextureLoader } from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import gsap from 'gsap'
import { GUI } from 'dat.gui'

function log(message: string){
    console.log(message)
}

const animationOne = document.getElementById('animationOne') as HTMLCanvasElement

const sceneOne = new THREE.Scene()
sceneOne.background = new THREE.Color(0x750319)

let tl = gsap.timeline()

const ambiLight = new THREE.AmbientLight(0xffffff, 1)
const lightLeft = new THREE.PointLight(0xffffff, 1, 100)
lightLeft.position.set( 35, 25, 50 );
const lightRight = new THREE.PointLight(0xffffff, 1, 100)
lightRight.position.set( 65, 75, 50 );
sceneOne.add(ambiLight)
sceneOne.add(lightLeft)
sceneOne.add(lightRight)


const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000)
camera.position.z = 4


const renderer = new THREE.WebGLRenderer({canvas: animationOne, alpha: true})
renderer.setPixelRatio(window.devicePixelRatio); 
renderer.outputEncoding = THREE.sRGBEncoding
renderer.setSize(window.innerWidth, window.innerHeight)

// const controls = new OrbitControls(camera, renderer.domElement)
// controls.enableDamping = true

    const loader = new GLTFLoader()

    var phoneVar2 = new THREE.Object3D()
    
    loader.load('assets/noemi/phone/phone_v4.gltf', (gltf) => {
        gltf.scene.position.set(-4,0.4,0)
        gltf.scene.scale.set(0.4,0.4,0.4)
        gltf.scene.traverse((child) => {
            if (child instanceof THREE.Mesh){
                console.log(child)
                if (child.material.name == "phone_color"){
                    child.material.color = new THREE.Color(0xFFD700)
                }
            }
        })

         phoneVar2 = gltf.scene
        // sceneOne.add(gltf.scene)
    })

    var phoneBlack = new THREE.Object3D ()
    // function loadBlackPhone(){

    loader.load('assets/noemi/phone/phone_v3-2.gltf', (gltf) => {
        gltf.scene.position.set(-1.2,-3,0)
        gltf.scene.scale.set(0.2,0.2,0.2)
        gltf.scene.traverse((child) => {
            if (child instanceof THREE.Mesh){
                if (child.material.name == "phone_color"){
                    child.material.color = new THREE.Color(0x000000)
                    child.material.metalness = 0.8
                }
            }
        // tl.to(gltf.scene.position, { y:0.4, duration: 3})
        // tl.to(gltf.scene.rotation, {y: 2.6, duration: 3}, "-=3")
        // tl.to(gltf.scene.scale, {x: 0.25, y:0.25, z:0.25, duration:3}, "-=3")
        // tl.to(gltf.scene.position, {x:1.5, duration:2})
        // tl.to(gltf.scene.rotation, { y: 2.6, duration: 2}, "-=2")
        })
       
        phoneBlack = gltf.scene
        sceneOne.add(gltf.scene)

        const gui = new GUI()
        const phoneFolder = gui.addFolder('Phone')
        const phoneRotationFolder = phoneFolder.addFolder('Rotation')
        phoneRotationFolder.add(gltf.scene.rotation, 'x', 0, Math.PI * 2, 0.01)
        phoneRotationFolder.add(gltf.scene.rotation, 'y', 0, Math.PI * 2, 0.01)
        phoneRotationFolder.add(gltf.scene.rotation, 'z', 0, Math.PI * 2, 0.01)
        const phonePositionFolder = phoneFolder.addFolder('Position')
        phonePositionFolder.add(gltf.scene.position, 'x', -10, 10)
        phonePositionFolder.add(gltf.scene.position, 'y', -10, 10)
        phonePositionFolder.add(gltf.scene.position, 'z', -10, 10)
        const lightFolder = gui.addFolder('Lights')
        const LightLeftFolder = lightFolder.addFolder('Light Left')
        LightLeftFolder.add(lightLeft.position, 'x', -10, 10)
        LightLeftFolder.add(lightLeft.position, 'y', -10, 10)
        LightLeftFolder.add(lightLeft.position, 'z', -10, 10)
        const LightRightFolder = lightFolder.addFolder('Light Right')
        LightRightFolder.add(lightRight.position, 'x', -10, 10)
        LightRightFolder.add(lightRight.position, 'y', -10, 10)
        LightRightFolder.add(lightRight.position, 'z', -10, 10)
        phoneFolder.open()

        // tl.to(gltf.scene.rotation, { y: 3.2, duration: 3})
        // tl.to(gltf.scene.scale, {x: 0.25, y:0.25, z:0.25, duration:3}, "-=3")
        // tl.to(gltf.scene.position, {x:1.5, duration:2})
        // tl.to(gltf.scene.rotation, { y: 2.6, duration: 2}, "-=2")
    })
// }

    var phoneWhite = new THREE.Object3D ()

    // function loadWhitePhone(){
    loader.load('assets/noemi/phone/phone_v3-2.gltf', (gltf) => {
        gltf.scene.position.set(1.2,-3,0)
        gltf.scene.scale.set(0.2,0.2,0.2)

        gltf.scene.traverse((child) => {
            if (child instanceof THREE.Mesh){
                if (child.material.name == "phone_color"){
                    child.material.color = new THREE.Color(0xffffff)
                    child.material.metalness = 0.6
                    child.material.roughness = 0.7
                }
            }
        // tl.to(gltf.scene.position, { y:0.4, duration: 3})
        // tl.to(gltf.scene.rotation, {y: 2.6, duration: 3}, "-=3")
        })
        
        phoneWhite = gltf.scene
        sceneOne.add(gltf.scene)
    })
// }

    var phoneSilver = new THREE.Object3D ()
    // function loadSilverPhone(){
    loader.load('assets/noemi/phone/phone_v3-2.gltf', (gltf) => {
        // gltf.scene.position.set(0,0.4,0)
        gltf.scene.scale.set(0.4,0.4,0.4)
        gltf.scene.traverse((child) => {
            if (child instanceof THREE.Mesh){
                if (child.material.name == "phone_color"){
                    child.material.color = new THREE.Color(0xcecece)
                    child.material.metalness = 0.8
                }
            }
        })
        
        phoneSilver = gltf.scene
        // sceneOne.add(gltf.scene)
    })
// }

    var phoneGold = new THREE.Object3D ()
    // function loadGoldPhone(){
    loader.load('assets/noemi/phone/phone_v3-2.gltf', (gltf) => {
        gltf.scene.position.set(0,-3,0)
        gltf.scene.scale.set(0.2,0.2,0.2)
        gltf.scene.rotation.y = 3.1
        gltf.scene.traverse((child) => {
            if (child instanceof THREE.Mesh){
                if (child.material.name == "phone_color"){
                    child.material.color = new THREE.Color(0x996515)
                    child.material.metalness = 0.8
                }
            }
        // tl.to(gltf.scene.position, { y:0.4, duration: 3})
        // tl.to(gltf.scene.rotation, {y: 2.6, duration: 3}, "-=3")
        })
        
        phoneGold = gltf.scene
        sceneOne.add(gltf.scene)
    })
// }

    window.addEventListener('resize', onWindowResize, false)
    function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
    render()
}

// function animationSceneOne(){
//     tl.to(phoneBlack.position, { y:0.4, duration: 3})
//     tl.to(phoneBlack.rotation, {y: 2.6, duration: 3}, "-=3")
//     tl.to(phoneGold.position, { y:0.4, duration: 3})
//     tl.to(phoneGold.rotation, {y: 2.6, duration: 3}, "-=3")
//     tl.to(phoneWhite.position, { y:0.4, duration: 3})
//     tl.to(phoneWhite.rotation, {y: 2.6, duration: 3}, "-=3")
//     // phoneBlack.position.set(-4,5,1)
// }

// animationSceneOne()
// var scaleup =false
// var scaleforzoom = 1
// window.addEventListener('mousemove', e =>{

//     var mouse = new THREE.Vector2();
//     mouse.x = ( e.clientX / window.innerWidth ) * 2 - 1;
//     mouse.y = - ( e.clientY / window.innerHeight ) * 2 + 1;

//     var raycaster = new THREE.Raycaster();
//     raycaster.setFromCamera( mouse, camera );
//     var intersects = raycaster.intersectObject( imageMesh );

//     if(intersects.length > 0) {
//         if (scaleup == false && scaleforzoom==1){
//             scaleup=true
//         }
//         else if (scaleup==true &&scaleforzoom>=1.2){
//             scaleup=false
//         }
//     }

// })




function animate() {
    requestAnimationFrame(animate)

    // phone.rotation.x += 0.01
    // phone.rotation.y += 0.01
    // if (scaleup && scaleforzoom <1.2){
    //     scaleforzoom+=0.01
    //         imageMesh.scale.set(scaleforzoom,scaleforzoom, 1)
    // }
    // controls.update()

    // phoneBlack.rotation.y +=0.05

    if(phoneBlack.position.y <0.25){

        phoneBlack.position.y +=0.0149
        phoneBlack.rotation.y+=0.013
        phoneBlack.scale.x +=0.0001
        // phoneBlack.position.x +=0.0002
        phoneGold.position.y +=0.015
        phoneGold.rotation.y +=0.013
        phoneWhite.position.y +=0.015
        phoneWhite.rotation.y +=0.013
        phoneWhite.scale.x -=0.0001
        // phoneWhite.position.x +=0.0003
    }
    render()
}

function render() {
    renderer.render(sceneOne, camera)
}

animate()
