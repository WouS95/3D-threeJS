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
spotLight.intensity = 0.6
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

// const gui = new GUI()
// const lightFolder = gui.addFolder('THREE.Light')
// lightFolder.add(spotLight, 'intensity', 0, 1, 0.01)
// lightFolder.open()
// const spotLightFolder = gui.addFolder('THREE.SpotLight')
// spotLightFolder.add(spotLight, 'distance', 0, 100, 0.01)
// spotLightFolder.add(spotLight, 'decay', 0, 4, 0.1)
// spotLightFolder.add(spotLight, 'angle', 0, 1, 0.1)
// spotLightFolder.add(spotLight, 'penumbra', 0, 1, 0.1)
// spotLightFolder.add(spotLight.position, 'x', -50, 50, 0.01)
// spotLightFolder.add(spotLight.position, 'y', -50, 50, 0.01)
// spotLightFolder.add(spotLight.position, 'z', -50, 50, 0.01)
// spotLightFolder.open()


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
}


function animate() {
    requestAnimationFrame(animate)
    if(headphone1){
        headphone1.scene.scale.z = 0.4 + window.scrollY * 0.0005
        headphone1.scene.scale.y = 0.4 + window.scrollY * 0.0005
        headphone1.scene.scale.x = 0.4 + window.scrollY * 0.0005
        headphone1.scene.position.y = 0.8 + window.scrollY * 0.001
    }
    // controls.update()

    render()
}

function render() {
    renderer.render(scene1, camera)
}
animate()
