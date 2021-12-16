import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import Stats from 'three/examples/jsm/libs/stats.module'
import { Camera, TextureLoader } from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import gsap from 'gsap'


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
    
    const loader = new GLTFLoader()
    var phone = new THREE.Object3D()
    
    loader.load('assets/noemi/phone/phone_v2-2gold.gltf', (gltf) => {
        gltf.scene.position.set(0,0.2,0)
        gltf.scene.scale.set(0.5,0.5,0.5)
        phone.traverse((child) => {
            if (child instanceof THREE.Mesh) {
                // child.material = new THREE.MeshBasicMaterial()
                child.material.emissive = new THREE.Color( 0x00f0ff );
            }
        })
        sceneOne.add(gltf.scene)
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
                                        
                                        // const cube = new THREE.Mesh(geometry, material)
                                        // sceneOne.add(cube)
                                        

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

    // cube.rotation.x += 0.01
    // cube.rotation.y += 0.01
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
