import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { GUI } from 'dat.gui'
import gsap from 'gsap'

const scene1 = new THREE.Scene()

const hero = document.getElementById("hero") as HTMLElement
let headphone1: any

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
camera.position.z = 6

const canvas = document.getElementById("canvas") as HTMLCanvasElement
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true
})
renderer.setSize(window.innerWidth, window.innerHeight)

const ambientLight = new THREE.AmbientLight()
ambientLight.intensity = 0.2
scene1.add(ambientLight)

const spotLight = new THREE.SpotLight()
spotLight.position.set(0,0,3)
spotLight.intensity = 0.8
scene1.add(spotLight)

// const controls = new OrbitControls(camera, renderer.domElement)

const loader = new GLTFLoader()
loader.load(
    'assets/bram/headphone/uploads_files_3333731_Headphone.gltf',
    function (gltf) {
        gltf.scene.scale.x = 0.4
        gltf.scene.scale.y = 0.4
        gltf.scene.scale.z = 0.4
        gltf.scene.position.y = 0.8
        scene1.add(gltf.scene)
        headphone1 = gltf
        console.log(headphone1)
        introAnimation()
    },
    (xhr) => {
        console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
    },
    (error) => {
        console.log(error)
    }
)

window.addEventListener('resize', onWindowResize, false)
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
    render()
}

// Animations
function introAnimation() {
    const canvas = document.getElementById("canvas")
    gsap.to(canvas, {
        duration: 2,
        opacity: 1
    })
    gsap.to(camera.position, {
        duration: 3,
        z: 2
    })
    const introTitle = document.getElementById("introTitle")
    gsap.to(introTitle, {
        delay: 1,
        duration: 2,
        css: {
            marginTop: 300,
            opacity: 1
        }
    })
}

const scene2 = new THREE.Scene()

let headphone2: any

const camera2 = new THREE.PerspectiveCamera(75, window.innerWidth/2 / window.innerHeight, 0.1, 1000)
camera2.position.z = 1
camera2.position.y = 0.5
camera2.position.x = -0

const canvas2 = document.getElementById("canvas2") as HTMLCanvasElement
const renderer2 = new THREE.WebGLRenderer({
    canvas: canvas2,
    alpha: true
})
renderer2.setSize(window.innerWidth/2, window.innerHeight)


const spotLight2 = new THREE.SpotLight()
spotLight2.position.set(0,0,3)
spotLight2.intensity = 2
scene2.add(spotLight2)


loader.load(
    'assets/bram/headphone/uploads_files_3333731_Headphone.gltf',
    function (gltf) {
        gltf.scene.scale.x = 0.4
        gltf.scene.scale.y = 0.4
        gltf.scene.scale.z = 0.4
        gltf.scene.position.y = 0.7
        scene2.add(gltf.scene)
        headphone2 = gltf
    },
    (xhr) => {
        console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
    },
    (error) => {
        console.log(error)
    }
)



const scene3 = new THREE.Scene()

let headphone3: any

const camera3 = new THREE.PerspectiveCamera(20, window.innerWidth / window.innerHeight, 0.1, 1000)
camera3.position.z = 6
camera3.position.y = -4.8
camera3.position.x = 0.1


const canvas3 = document.getElementById("canvas3") as HTMLCanvasElement
const renderer3 = new THREE.WebGLRenderer({
    canvas: canvas3,
    alpha: true
})
renderer3.setSize(window.innerWidth, window.innerHeight)

const ambientLight3 = new THREE.AmbientLight()
ambientLight3.intensity = 0.8
scene3.add(ambientLight3)

const spotLight3 = new THREE.SpotLight()
spotLight3.position.set(0,3,3)
spotLight3.intensity = 2
scene3.add(spotLight3)

loader.load(
    'assets/bram/headphone/uploads_files_3333731_Headphone.gltf',
    function (gltf) {
        scene3.add(gltf.scene)
        headphone3 = gltf
    },
    (xhr) => {
        console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
    },
    (error) => {
        console.log(error)
    }
)

const scene4 = new THREE.Scene()

let headphone4: any

const camera4 = new THREE.PerspectiveCamera(20, window.innerWidth / window.innerHeight, 0.1, 1000)
camera4.position.z = 7
camera4.position.y = 0.5


const canvas4 = document.getElementById("canvas4") as HTMLCanvasElement
const renderer4 = new THREE.WebGLRenderer({
    canvas: canvas4,
    alpha: true
})
renderer4.setSize(window.innerWidth, window.innerHeight)

const ambientLight4 = new THREE.AmbientLight()
ambientLight4.intensity = 0.2
scene4.add(ambientLight4)

const spotLight4 = new THREE.SpotLight()
spotLight4.position.set(0,3,3)
spotLight4.intensity = 2
scene4.add(spotLight4)

loader.load(
    'assets/bram/headphone/uploads_files_3333731_Headphone.gltf',
    function (gltf) {
        gltf.scene.rotation.y = Math.PI / 2 
        gltf.scene.position.x = 0.24
        scene4.add(gltf.scene)
        headphone4 = gltf
    },
    (xhr) => {
        console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
    },
    (error) => {
        console.log(error)
    }
)


const scene5 = new THREE.Scene()

let headphone5: any

const camera5 = new THREE.PerspectiveCamera(20, window.innerWidth / window.innerHeight, 0.1, 1000)
camera5.position.z = 15
camera5.position.y = -1.5
camera5.position.x = -0.7

const ambientLight5 = new THREE.AmbientLight()
ambientLight5.intensity = 0.5
scene5.add(ambientLight5)

const spotLight5 = new THREE.SpotLight()
spotLight5.position.set(0,0,5)
spotLight5.intensity = 1
scene5.add(spotLight5)



const canvas5 = document.getElementById("canvas5") as HTMLCanvasElement
const renderer5 = new THREE.WebGLRenderer({
    canvas: canvas5,
    alpha: true
})
renderer5.setSize(window.innerWidth/2, window.innerHeight/2)

loader.load(
    'assets/bram/headphone/uploads_files_3333731_Headphone.gltf',
    function (gltf) {
        scene5.add(gltf.scene)
        headphone5 = gltf
    },
    (xhr) => {
        console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
    },
    (error) => {
        console.log(error)
    }
)


window.onscroll = function(){
    console.log(window.scrollY)
    if(window.scrollY > 1000){
        hero.style.display = 'none'
    } else {
        hero.style.display = 'block'
    }
    if(window.scrollY > 400){
        hero.style.opacity = String( 1 - (window.scrollY - 400) * 0.002 )
    } else {
        hero.style.opacity = "1"
    }
    if(window.scrollY > 800){
        const soundSpecsText = document.getElementById("soundSpecsTextDiv")
        gsap.to(soundSpecsText, {
            duration: 2,
            css: {
                opacity: 1,
                top: 250,
            },
        })
    }
    if(window.scrollY > 1500){
        gsap.to(camera3.position, {
            duration: 1,
            y: -3.8,
        })
    }
    if(window.scrollY > 1700){
        const micSpecsText = document.getElementById("micSpecsText")
        gsap.to(micSpecsText, {
            duration: 2,
            css: {
                marginTop: -450,
                opacity: 1,
            },
        })
    }
    if(window.scrollY > 2500){
        gsap.to(headphone4.scene.rotation, {
            duration: 1,
            y: 0,
        })
        gsap.to(headphone4.scene.position, {
            duration: 1,
            x: -0.1,
        })
        const bandSpecsText = document.getElementById("bandSpecsText")
        gsap.to(bandSpecsText, {
            delay: 0.5,
            duration: 2,
            css: {
                top: 400,
                opacity: 1,
            },
        })
    }
}

function animate() {
    requestAnimationFrame(animate)
    if(headphone1){
        headphone1.scene.scale.z = 0.4 + window.scrollY * 0.0005
        headphone1.scene.scale.y = 0.4 + window.scrollY * 0.0005
        headphone1.scene.scale.x = 0.4 + window.scrollY * 0.0005
        headphone1.scene.position.y = 0.8 + window.scrollY * 0.001

        headphone2.scene.rotation.y = window.scrollY * 0.0005
        camera2.position.y = 0.5 - window.scrollY * 0.0005

        headphone5.scene.rotation.y += 0.005
    }
    // controls.update()

    render()
}
function render() {
    renderer.render(scene1, camera)
    renderer2.render(scene2, camera2)
    renderer3.render(scene3, camera3)
    renderer4.render(scene4, camera4)
    renderer5.render(scene5, camera5)
}
animate()