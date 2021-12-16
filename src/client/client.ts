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
sceneOne.background = new THREE.Color(0xffffff)

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
camera.position.z = 5


const renderer = new THREE.WebGLRenderer({canvas: animationOne, alpha: true})
renderer.setPixelRatio(window.devicePixelRatio); 
renderer.outputEncoding = THREE.sRGBEncoding
renderer.setSize(window.innerWidth, window.innerHeight)
// document.body.appendChild(renderer.domElement)

// const controls = new OrbitControls(camera, renderer.domElement)
// controls.enableDamping = true

// const geometry = new THREE.BoxGeometry()
// const material = new THREE.MeshBasicMaterial({
    //     color: 0x00ff00,
    //     wireframe: true,
    // })
    
    // const texture = new TextureLoader().load('assets/noemi/phone/phones.png')
    // const geometry = new THREE.PlaneBufferGeometry(4, 3);
    // const material = new THREE.MeshBasicMaterial( { map: texture } );
    // const imageMesh = new THREE.Mesh( geometry, material );
    // sceneOne.add( imageMesh );
    
    const initialMTL = new THREE.MeshPhongMaterial( { color: 0xf1f1f1, shininess: 10 } );
    const initialMap = {childID: "Plane", mtl: initialMTL}

    const loader = new GLTFLoader()
    var phone = new THREE.Object3D()
    
    loader.load('assets/noemi/phone/phone_v4.gltf', (gltf) => {
        gltf.scene.position.set(-4,0.4,0)
        gltf.scene.scale.set(0.5,0.5,0.5)
        gltf.scene.traverse((child) => {
            log("traversing!!")
            if (child instanceof THREE.Mesh){
                console.log(child)
                if (child.material.name == "phone_color"){
                    child.material.color = new THREE.Color(0xFFD700)
                }
            }
        })
        sceneOne.add(gltf.scene)
    })

    loader.load('assets/noemi/phone/phone_v3.gltf', (gltf) => {
        gltf.scene.position.set(0,0.4,0)
        gltf.scene.scale.set(0.5,0.5,0.5)
        gltf.scene.traverse((child) => {
            log("traversing!!")
            if (child instanceof THREE.Mesh){
                console.log(child)
                if (child.material.name == "phone_color"){
                    child.material.color = new THREE.Color(0xFFD700)
                }
            }
        })
          
          

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


        tl.to(gltf.scene.rotation, { y: 3.2, duration: 3})
        tl.to(gltf.scene.scale, {x: 0.25, y:0.25, z:0.25, duration:3}, "-=3")
        tl.to(gltf.scene.position, {x:1.5, duration:2})
        tl.to(gltf.scene.rotation, { y: 2.6, duration: 2}, "-=2")
    })


    // loader.load(
        //     'assets/noemi/phone/phone_v2-2.gltf',
        //     function (gltf) {
            //         phone = gltf.scene
            //         // phone.scale.set(0.02, 0.02, 0.02)
            //         // var phonemodel = phone.children[0]
            
            
            
            //         // phone.traverse((child) => {
                //         //     if (child instanceof THREE.Mesh) {
                    //         //         // child.material = new THREE.MeshBasicMaterial()
                    //         //       child.material.emissive = new THREE.Color( 0x00f0ff );
                    //         //     }
                    //         //     if ( child instanceof THREE.Mesh ) {
                        //         //         child.castShadow = true;
                        //         //         child.receiveShadow = true
                        //         //         }
                        //         //   });
                        //         sceneOne.add(phone)
                        //         // gltf.scene.traverse(function (child) {
                            //         //     if ((child as THREE.Mesh).isMesh) {
                                //         //         const m = child as THREE.Mesh
                                //         //         m.scale.set(0.02, 0.02, 0.02)
                                //         //         sceneOne.add(m)
                                //         //     }
                                //         // })
                                //         // gltf.scene.scale.set(0.02, 0.02, 0.02)
                                //         // sceneOne.add(gltf.scene)
                                //     },
                                //     (xhr) => {
                                    //         console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
                                    //     },
                                    //     (error) => {
                                        //         console.log(error)
                                        //     }
                                        // )
                                        
                                        // const phone = new THREE.Mesh(geometry, material)
                                        // sceneOne.add(phone)
                                        

    window.addEventListener('resize', onWindowResize, false)
    function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
    render()
}

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

    render()
}

function render() {
    renderer.render(sceneOne, camera)
}

animate()
