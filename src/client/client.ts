import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

import { GUI } from "dat.gui"
import { Raycaster } from 'three'
import gsap from "gsap";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';




// ----------------------------------------------------------------
// HERO




// Scene
const hero = new THREE.Scene()
const visual = new THREE.Scene()
const product = new THREE.Scene()
hero.background = new THREE.Color(0)
// visual.background = new THREE.Color(0xe8e8e8)

// Camera
const heroCamera = new THREE.PerspectiveCamera(75, 1920 / 800, 0.1, 1000)
const visualCamera = new THREE.PerspectiveCamera(75, 1280 / 800, 0.1, 1000)
const productCamera = new THREE.PerspectiveCamera(75, 1920 / 800, 0.1, 1000)
heroCamera.position.z = 4
visualCamera.position.z = 2
productCamera.position.z = 3

let headphone1: any
const loader = new GLTFLoader()
loader.load(
    'assets/bram/headphone2/scene.gltf',
    function (gltf) {
        gltf.scene.scale.x = 0.01
        gltf.scene.scale.y = 0.01
        gltf.scene.scale.z = 0.01
        gltf.scene.position.z = 1
        gltf.scene.rotation.y = Math.PI/1.13
        product.add(gltf.scene)
        headphone1 = gltf
    },
    (xhr) => {
        console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
    },
    (error) => {
        console.log(error)
    }
)

// TextureLoader
const textureLoader = new THREE.TextureLoader()

const geometry = new THREE.PlaneBufferGeometry(1, 1.3)
// const geometry2 = new THREE.PlaneBufferGeometry(1, 1.3)

for (let i = 0; i < 3; i++) {
    const material = new THREE.MeshBasicMaterial({
        map: textureLoader.load(`/img/${i}.jpg`)
    })

    const img = new THREE.Mesh(geometry, material)
    
    img.add

    img.position.set(Math.random() + .8, i * -1.8, 0)
    visual.add(img)

}

let objs = [] as any
// let objs: objs[] = [] as any;


visual.traverse((object) => {
    if ((<THREE.Mesh>object).isMesh)
        objs.push(object)
})

// Lights HERO
// hero.add(new THREE.AmbientLight(0xffffff, 0.45));
// visual.add(new THREE.AmbientLight(0xffffff, 0.45));

const sphereSize = 10;

const light1 = new THREE.PointLight(0x973999, 2)
hero.add(light1)
const pointLightHelper1 = new THREE.PointLightHelper(light1, sphereSize);
hero.add(pointLightHelper1);

const light2 = new THREE.PointLight(0xffb900, 2)
hero.add(light2)
const pointLightHelper2 = new THREE.PointLightHelper(light2, sphereSize);
hero.add(pointLightHelper2);

const light3 = new THREE.PointLight(0xe23838, 2)
hero.add(light3)
const pointLightHelper3 = new THREE.PointLightHelper(light3, sphereSize);
// hero.add( pointLightHelper3 );

const light4 = new THREE.PointLight(0x009cdf, 2)
hero.add(light4)
const pointLightHelper4 = new THREE.PointLightHelper(light4, sphereSize);
// hero.add( pointLightHelper4 );


const light5 = new THREE.PointLight(0xffffff, 4)
product.add(light5)
const pointLightHelper5 = new THREE.PointLightHelper(light5, sphereSize);
// product.add(pointLightHelper5)

// PointLight( color : Integer, intensity : Float, distance : Number, decay : Float )
const light6 = new THREE.PointLight(0x000fff, 2, 0, 40)
product.add(light6)
const pointLightHelper6 = new THREE.PointLightHelper(light6, sphereSize);
// product.add(pointLightHelper6)

const light7 = new THREE.PointLight(0x0f00ff, 2, 0, 40)
product.add(light7)
const pointLightHelper7 = new THREE.PointLightHelper(light7, sphereSize);
// product.add(pointLightHelper7)

light1.position.set(5, 5, 5)
light2.position.set(15, -5, 15)
light3.position.set(0, -5, 5)
light3.position.set(0, -3, 6)
light5.position.set(0, -3, 6)
light6.position.set(2, -3, 6)

// Lights VISUAL

// Lights
// hero.add(new THREE.AmbientLight(0xffffff, 0.25));
// const heroLight = new THREE.DirectionalLight(0xffff00, 1.0)

// Renderer
const canvas = document.getElementById("heroVisual") as HTMLCanvasElement
const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true })
renderer.setSize(1920, 800)

const canvas2 = document.getElementById("carrouselVisual") as HTMLCanvasElement
const renderer2 = new THREE.WebGLRenderer({ canvas: canvas2, antialias: true })
renderer2.setSize(1280, 800)

const canvas3 = document.getElementById("overzichtVisual") as HTMLCanvasElement
const renderer3 = new THREE.WebGLRenderer({ canvas: canvas3, antialias: true })
renderer3.setSize(1920, 800)


// new OrbitControls(heroCamera, renderer.domElement)
// new OrbitControls(visualCamera, renderer2.domElement)
// new OrbitControls(productCamera, renderer3.domElement)

// 3D stuff
const heroPlane = new THREE.PlaneBufferGeometry(30, 30, 250, 350);
const headphonePlane = new THREE.PlaneBufferGeometry(30, 30, 250, 350);

// const plane = new THREE.Mesh(heroPlane, new THREE.MeshNormalMaterial({}));
const plane = new THREE.Mesh(heroPlane, new THREE.MeshPhysicalMaterial({
    // color: 0x00ff00,
    roughness: 0,
    metalness: 1,
    reflectivity: 1,
    clearcoat: 1,
    clearcoatRoughness: 0,
    // wireframe: true
}))

// const plane2 = new THREE.Mesh(headphonePlane, new THREE.MeshNormalMaterial({}));
const plane2 = new THREE.Mesh(headphonePlane, new THREE.MeshPhysicalMaterial({
    // color: 0x00ff00,
    roughness: 0,
    metalness: 1,
    reflectivity: 1,
    clearcoat: 1,
    clearcoatRoughness: 0,
    // wireframe: true
}))



// const visualPlane = new THREE.BoxGeometry(1, 1, 1, 1)
// const gallery = new THREE.Mesh(visualPlane, new THREE.MeshNormalMaterial({}))

plane.material.side = THREE.DoubleSide;
plane.receiveShadow = true;
plane.castShadow = true;
plane.rotation.x = - Math.PI / 1;
plane.position.y = -3
plane.rotation.y = - Math.PI / 1;

plane2.material.side = THREE.DoubleSide;
plane2.receiveShadow = true;
plane2.castShadow = true;
plane2.rotation.x = - Math.PI / 1;
plane2.position.y = -1
plane2.position.z = -3
plane2.rotation.y = - Math.PI / 1;
// plane2.rotation.z += 0.2


hero.add(plane)
product.add(plane2)
// visual.add(gallery)

// HERO
//-----------------------------------------------------------------

const count: number = heroPlane.attributes.position.count;
const count2: number = headphonePlane.attributes.position.count;


// Mouse
window.addEventListener("wheel", onMouseWheel, false)

let y = 0
let position = 0

function onMouseWheel(event: any) {
    // console.log(event.deltaY)
    y = event.deltaY * 0.0031
}

const mouse = new THREE.Vector2()
window.addEventListener('mousemove', (event) => {
    mouse.x = event.clientX / 1280 * 2 - 1
    mouse.y = - ( event.clientY / 800 ) * 2 - 1
})

const raycaster = new THREE.Raycaster()

function animate() {
    requestAnimationFrame(animate)
    animateLights()

    plane.rotation.z += 0.0015
    // headphone1.rotation.y += 0.05

    // SINE WAVE
    // const now = Date.now() / 1000;
    const now = Date.now() / 3500;
    for (let i = 0; i < count; i++) {
        const x = heroPlane.attributes.position.getX(i);
        const y = heroPlane.attributes.position.getY(i);

        // SINE WAVE
        const xangle = x + now
        const yangle = y + now
        // const xangle = getRandomInt(2)

        const xsin = Math.sin(xangle * 4)
        const ycos = Math.cos(yangle * 5)
        heroPlane.attributes.position.setZ(i, xsin + ycos);
    }
    heroPlane.computeVertexNormals();
    heroPlane.attributes.position.needsUpdate = true;

    for (let i = 0; i < count; i++) {
        const x = heroPlane.attributes.position.getX(i);
        const y = heroPlane.attributes.position.getY(i);

        // SINE WAVE
        const xangle = x + now
        const yangle = y + now
        // const xangle = getRandomInt(2)

        const xsin = Math.sin(xangle * 4)
        const ycos = Math.cos(yangle * 5)
        headphonePlane.attributes.position.setZ(i, xsin);
    }
    headphonePlane.computeVertexNormals();
    headphonePlane.attributes.position.needsUpdate = true;

    // gallery.rotation.x += .05

    if ( window.scrollY > 0 ) {
        position += y
        y *= .9
    }

    showSpecs()

    visualCamera.position.y = -position

    // Raycaster
    raycaster.setFromCamera(mouse, visualCamera)
    const intersects = raycaster.intersectObjects(objs)
    // console.log(intersects)
    for(const intersect of intersects) {
        console.log('intersected')
    }



    render()
}

function showSpecs(){

    const specs1 = document.getElementById("carrouselText1")
    if (window.scrollY > 250){
        gsap.to(specs1, {
            duration: 3,
            css: {
                top: "900px",
                opacity: 0
            }
        })
    } else if (window.scrollY < 250){
        gsap.to(specs1, {
            duration: 2,
            css: {
                top: "1050px",
                opacity: 1
            }
        })
    }

    const specs2 = document.getElementById("carrouselText2")
    if (window.scrollY > 600){
        gsap.to(specs2, {
            duration: 3,
            css: {
                top: "900px",
                opacity: 0
            }
        })
    } else if (window.scrollY < 250){
        gsap.to(specs2, {
            duration: 2,
            css: {
                top: "1225px",
                opacity: 1
            }
        })
    }

    const specs3 = document.getElementById("carrouselText3")
    if (window.scrollY > 950){
        gsap.to(specs3, {
            duration: 3,
            css: {
                top: "900px",
                opacity: 0
            }
        })
    } else if (window.scrollY < 250){
        gsap.to(specs3, {
            duration: 2,
            css: {
                top: "1380px",
                opacity: 1
            }
        })
    }

    // const specs4 = document.getElementById("carrouselText4")
    // if (window.scrollY > 580){
    //     gsap.to(specs4, {
    //         duration: 3,
    //         css: {
    //             top: "800px",
    //             opacity: 0
    //         }
    //     })
    // }

}


function render() {
    renderer.render(hero, heroCamera)
    renderer2.render(visual, visualCamera)
    renderer3.render(product, productCamera)
}

function animateLights() {
    const time = Date.now() * 0.003;
    const d = 2000;
    light1.position.y = Math.sin(time * 0.3) * d;
    light1.position.z = Math.cos(time * 0.1) * d;

    light2.position.y = Math.sin(time * 0.1) * d;
    light2.position.z = Math.cos(time * 0.3) * d;
    // light2.position.z = Math.cos(time * 0.2) * d;

    light3.position.y = Math.sin(time * 0.5) * d;
    light3.position.z = Math.cos(time * 0.2) * d;
    // light3.rotation.z = Math.sin(time * 0.7) * d;

    light4.position.x = Math.sin(time * 0.2) * d;
    light4.position.z = Math.cos(time * 0.5) * d;

    light6.position.y = Math.sin(time * 0.3) * d;
    light6.position.z = Math.cos(time * 0.1) * d;

    light7.position.y = Math.sin(time * 0.1) * d;
    light7.position.z = Math.cos(time * 0.3) * d;
}

animate()

// GUI
const data = {
    color: light1.color.getHex(),
    mapsEnabled: true
}

const gui = new GUI()
const lightFolder = gui.addFolder('THREE.Light')
lightFolder.addColor(data, 'color').onChange(() => {
    light1.color.setHex(Number(data.color.toString().replace('#', '0x')))
})
const lightFolder2 = gui.addFolder('THREE.Light2')
lightFolder2.addColor(data, 'color').onChange(() => {
    light2.color.setHex(Number(data.color.toString().replace('#', '0x')))
})
const lightFolder3 = gui.addFolder('THREE.Light3')
lightFolder3.addColor(data, 'color').onChange(() => {
    light3.color.setHex(Number(data.color.toString().replace('#', '0x')))
})
const lightFolder4 = gui.addFolder('THREE.Light4')
lightFolder4.addColor(data, 'color').onChange(() => {
    light4.color.setHex(Number(data.color.toString().replace('#', '0x')))
})

gui.add(visualCamera.position, 'y').min(-5).max(10)