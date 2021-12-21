import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { GUI } from 'dat.gui'
import gsap from 'gsap'

const scene1 = new THREE.Scene()

const hero = document.getElementById("hero") as HTMLElement
let headphone1: any

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
camera.position.z = 8
camera.position.y = -0.05
const canvas = document.getElementById("canvas") as HTMLCanvasElement
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true,
    antialias: true
})
renderer.setSize(window.innerWidth, window.innerHeight)

const ambientLight = new THREE.AmbientLight()
ambientLight.intensity = 3
scene1.add(ambientLight)

const spotLight = new THREE.SpotLight()
spotLight.position.set(0,0,30)
spotLight.intensity = 5
scene1.add(spotLight)

// const controls = new OrbitControls(camera, renderer.domElement)

const loader = new GLTFLoader()
loader.load(
    'assets/bram/test/scene.gltf',
    function (gltf) {
        gltf.scene.scale.x = 0.01
        gltf.scene.scale.y = 0.01
        gltf.scene.scale.z = 0.01
        gltf.scene.rotation.y = Math.PI/2
        headphoneObject.add(gltf.scene)
        headphone1 = gltf
        console.log(headphone1)
        console.log(headphone1.scene.children)
        introAnimation()
    },
    (xhr) => {
        console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
    },
    (error) => {
        console.log(error)
    }
)
const headphoneObject = new THREE.Mesh()
headphoneObject.name = "headphone"

const normalMaterial = new THREE.MeshNormalMaterial({
    transparent: true,
    opacity: 0
})
const headphoneSoundGeometry = new THREE.CylinderGeometry( 0.62, 0.62, 0.82, 32 )

const soundArea = new THREE.Mesh()

const headphoneSoundRight = new THREE.Mesh(headphoneSoundGeometry, normalMaterial)
headphoneSoundRight.rotation.z = Math.PI / 2 - 0.35
headphoneSoundRight.position.x = 0.65
headphoneSoundRight.position.y = -0.6
headphoneSoundRight.position.z = -0.15
headphoneSoundRight.name = "sound"
soundArea.add(headphoneSoundRight)

const headphoneBandGeometry = new THREE.BoxGeometry(2, 0.7, 0.5)
const headphoneBand = new THREE.Mesh(headphoneBandGeometry, normalMaterial)
headphoneBand.position.y = 0.9
headphoneBand.position.z = -0.1
headphoneBand.name = "band"

const headphoneMicGeometry = new THREE.BoxGeometry(0.2, 0.2, 0.2)
const headphoneMic = new THREE.Mesh(headphoneMicGeometry, normalMaterial)
headphoneMic.position.y = - 1.1
headphoneMic.position.x = - 0.65
headphoneMic.position.z = 0.7
headphoneMic.name = "mic"

headphoneObject.add(headphoneMic)
headphoneObject.add(headphoneBand)
headphoneObject.add(soundArea)
scene1.add(headphoneObject)
console.log("HeadponeObject", headphoneObject)

window.addEventListener('resize', onWindowResize, false)
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
    render()
}


let isShowingSound = false
let isShowingMic = false
let isShowingBand = false

const mouse = new THREE.Vector2()
const raycaster = new THREE.Raycaster()

function onMouseMove( event: any) {
	// calculate mouse position in normalized device coordinates
	// (-1 to +1) for both components
	mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

    raycaster.setFromCamera(mouse, camera)

    const intersects = raycaster.intersectObject(scene1, true)
    for (let i = 0; i < intersects.length; i++) {
        if(intersects[i].object){
            if(intersects[i].object.name == "sound"){
                goToSoundSpecs()
            }
            if(intersects[i].object.name == "band"){
                goToBandSpecs()
            }
            if(intersects[i].object.name == "mic"){
                goToMicSpecs()
            }
        }
    }
}

window.addEventListener( 'click', onMouseMove, false );

// Animations
function introAnimation() {
    const canvas = document.getElementById("canvas")
    gsap.to(canvas, {
        duration: 2,
        opacity: 1
    })
    gsap.to(camera.position, {
        duration: 3,
        z: 3
    })
    gsap.to(headphone1.scene.rotation, {
        delay: 2,
        duration: 2,
        y: Math.PI
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

function goToOriginal(){
    gsap.to(camera.position, {
        duration: 0.8,
        z: 3,
        y: -0.05,
        x: 0
    })
    gsap.to(camera.rotation, {
        duration: 0.6,
        z: 0,
        y: 0,
        x: 0
    })
    gsap.to(hero, {
        delay: 0.2,
        duration: 0.5,
        css: {
            background: "#FFF"
        }
    })
}

function goToSoundSpecs(){
    if(!isShowingSound){
        gsap.to(camera.rotation, {
            duration: 1.2,
            y: Math.PI / 2 -0.4
        })
        gsap.to(camera.position, {
            duration: 1.2,
            z: 1.4,
            x: 2
        })
        gsap.to(hero, {
            duration: 0.5,
            css: {
                background: "#000"
            }
        })
    } else {
        goToOriginal()
    }
    isShowingSound = !isShowingSound
}

function goToMicSpecs(){
    if(!isShowingMic){
        gsap.to(camera.rotation, {
            duration: 1.2,
            y: -Math.PI / 2
        })
        gsap.to(camera.position, {
            duration: 1.2,
            z: 1,
            x: -2,
            y: -1
        })
        gsap.to(hero, {
            duration: 0.5,
            css: {
                background: "#000"
            }
        })
    } else {
        goToOriginal()
    }
    isShowingMic = !isShowingMic
}

function goToBandSpecs(){
    if(!isShowingBand){
        gsap.to(camera.position, {
            duration: 2,
            z: -1.3,
            x: 0,
        })
        gsap.to(camera.rotation, {
            duration: 2,
            x: 0.3
        })
        gsap.to(camera.rotation, {
            delay: 0.3,
            duration: 1,
            y: Math.PI,
        })
        gsap.to(camera.position, {
            delay: 0.5,
            duration: 2,
            y: 1.6
        })
        gsap.to(hero, {
            duration: 0.5,
            css: {
                background: "#000"
            }
        })
    } else {
        goToOriginal()
    }
    isShowingBand = !isShowingBand
}


window.onscroll = function(){
    console.log(window.scrollY)
    if(headphone1){
        if(window.scrollY > 200){
            goToOriginal()
            isShowingBand = false
            isShowingMic = false
            isShowingSound = false
        } 
        if(window.scrollY > 1000){
            hero.style.display = 'none'
        } else {
            hero.style.display = 'block'
        }
    }
}

function animate() {
    requestAnimationFrame(animate)
    if(headphone1){
    }
    // controls.update()

    render()
}

function render() {
    renderer.render(scene1, camera)
}
animate()