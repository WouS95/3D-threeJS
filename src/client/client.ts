import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import Stats from 'three/examples/jsm/libs/stats.module'
import { Camera, TextureLoader } from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import gsap from 'gsap'
import { GUI } from 'dat.gui'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';

function log(message: any){
    console.log(message)
}

let tl = gsap.timeline()

// const controls = new OrbitControls(camera, renderer.domElement)
// controls.enableDamping = true
const stats = Stats()
document.body.appendChild(stats.dom)

////////match animations to the canvasses
const animationOne = document.getElementById('animationOne') as HTMLCanvasElement
const animationTwo = document.getElementById('animationTwo') as HTMLCanvasElement
const animationThree = document.getElementById('animationThree') as HTMLCanvasElement
const animationFour = document.getElementById('animationFour') as HTMLCanvasElement

////scene 1 backgroundcolor is teal-ish
const sceneOne = new THREE.Scene()
sceneOne.background = new THREE.Color(0x20777d)

//////scene 2 & 3 & 4 white background
const sceneTwo = new THREE.Scene()
sceneTwo.background = new THREE.Color(0xffffff)

const sceneThree = new THREE.Scene()
sceneThree.background = new THREE.Color(0xffffff)

const sceneFour = new THREE.Scene()
sceneThree.background = new THREE.Color(0xffffff)

const ambiLight = new THREE.AmbientLight(0xffffff, 1)
const lightLeft = new THREE.PointLight(0xffffff, 1, 100)
lightLeft.position.set( 0, 5, 20 );
const lightRight = new THREE.PointLight(0xffffff, 1, 100)
lightRight.position.set( 0, 5, -20 );
sceneOne.add(ambiLight)
sceneOne.add(lightLeft)
sceneOne.add(lightRight)

const ambiLight2 = new THREE.AmbientLight(0xffffff, 1)
const lightLeft2 = new THREE.PointLight(0xffffff, 1, 100)
lightLeft2.position.set( 0, 25, 50 );
const lightRight2 = new THREE.PointLight(0xffffff, 1, 100)
lightRight2.position.set( 0, 25, -50 );
sceneTwo.add(ambiLight2)
sceneTwo.add(lightLeft2)
sceneTwo.add(lightRight2)

const ambiLight3 = new THREE.AmbientLight(0xffffff, 1)
const lightLeft3 = new THREE.PointLight(0xffffff, 1, 100)
lightLeft3.position.set( 0, 25, 50 );
const lightRight3 = new THREE.PointLight(0xffffff, 1, 100)
lightRight3.position.set( 0, 25, -50 );
sceneThree.add(ambiLight3)
sceneThree.add(lightLeft3)
// sceneThree.add(lightRight3)

const ambiLight4 = new THREE.AmbientLight(0xffffff, 1)
const lightLeft4 = new THREE.PointLight(0xffffff, 1, 100)
lightLeft4.position.set( 0, 25, 50 );
const lightRight4 = new THREE.PointLight(0xffffff, 1, 100)
lightRight4.position.set( 0, 25, -50 );
sceneFour.add(ambiLight4)
sceneFour.add(lightLeft4)
sceneFour.add(lightRight4)

////perspective camera for scene 1 and 2
const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000)
camera.position.z = 4

/////orthographic cam for scene 3
const orthocam = new THREE.OrthographicCamera(window.innerWidth / - 200, window.innerWidth / 200,window.innerHeight / 200, window.innerHeight / - 200, -10, 100)

const rendererOne = new THREE.WebGLRenderer({canvas: animationOne, alpha: true})
rendererOne.setPixelRatio(window.devicePixelRatio); 
rendererOne.outputEncoding = THREE.sRGBEncoding
rendererOne.setSize(window.innerWidth, window.innerHeight)

const rendererTwo = new THREE.WebGLRenderer({canvas: animationTwo, alpha: true})
rendererTwo.setPixelRatio(window.devicePixelRatio); 
rendererTwo.outputEncoding = THREE.sRGBEncoding
rendererTwo.setSize(window.innerWidth, window.innerHeight)

const rendererThree = new THREE.WebGLRenderer({canvas: animationThree, alpha: true})
rendererThree.setPixelRatio(window.devicePixelRatio); 
rendererThree.outputEncoding = THREE.sRGBEncoding
rendererThree.setSize(window.innerWidth, window.innerHeight)

const rendererFour = new THREE.WebGLRenderer({canvas: animationFour, alpha: true})
rendererFour.setPixelRatio(window.devicePixelRatio); 
rendererFour.outputEncoding = THREE.sRGBEncoding
rendererFour.setSize(window.innerWidth, window.innerHeight)

/////eventlistener to update the canvassize when it changes
window.addEventListener('resize', onWindowResize, false)
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    rendererOne.setSize(window.innerWidth, window.innerHeight)
    rendererTwo.setSize(window.innerWidth, window.innerHeight)
    rendererThree.setSize(window.innerWidth, window.innerHeight)
    rendererFour.setSize(window.innerWidth, window.innerHeight)
    render()
}

let playAnimationTwo = false
let playAnimationThree = false
let playAnimationFour = false
let setupanimation3 = false
let setupanimation4 = false

/////eventlistener for when the user scrolls through the website. 
window.addEventListener("scroll", function() {
    const t = Math.abs(document.body.getBoundingClientRect().top)
    log(t)
    log(window.innerHeight)

    if(t > (window.innerHeight*0.9)){
        log("start animation 2")
        playAnimationTwo = true
    }

    else {
        playAnimationTwo = false
    }

    if (t>(this.window.innerHeight*2.9)){
        log("start animation 3")
        playAnimationThree = true
        if (!setupanimation3){
            setUpAnimation3()
            setupanimation3 = true
        }
    }
    else{
        playAnimationThree = false
    }

    if (t>(this.window.innerHeight*3)){
        log("start animation 4")
        playAnimationFour = true
        if (!setupanimation4){
            setUpAnimation4()
            setupanimation4 = true
        }
    }
    else{
        playAnimationFour = false
    }
})

const loader = new GLTFLoader()

var phoneBlack = new THREE.Object3D ()
loader.load('assets/noemi/phone/phone_v3-2.gltf', (gltf) => {
    gltf.scene.position.set(-1.2,-3,0)
    gltf.scene.scale.set(0.2,0.2,0.2)
    gltf.scene.traverse((child) => {
        if (child instanceof THREE.Mesh){
            if (child.material.name == "phone_color"){
                child.material.color = new THREE.Color(0x000000)
                child.material.metalness = 0.9
            }
        }
    })
    
    phoneBlack = gltf.scene
    sceneOne.add(gltf.scene)

    // const gui = new GUI()
    // const phoneFolder = gui.addFolder('Phone')
    // const phoneRotationFolder = phoneFolder.addFolder('Rotation')
    // phoneRotationFolder.add(gltf.scene.rotation, 'x', 0, Math.PI * 2, 0.01)
    // phoneRotationFolder.add(gltf.scene.rotation, 'y', 0, Math.PI * 2, 0.01)
    // phoneRotationFolder.add(gltf.scene.rotation, 'z', 0, Math.PI * 2, 0.01)
    // const phonePositionFolder = phoneFolder.addFolder('Position')
    // phonePositionFolder.add(gltf.scene.position, 'x', -10, 10)
    // phonePositionFolder.add(gltf.scene.position, 'y', -10, 10)
    // phonePositionFolder.add(gltf.scene.position, 'z', -10, 10)
    // const lightFolder = gui.addFolder('Lights')
    // const LightLeftFolder = lightFolder.addFolder('Light Left')
    // LightLeftFolder.add(lightLeft.position, 'x', -10, 10)
    // LightLeftFolder.add(lightLeft.position, 'y', -10, 10)
    // LightLeftFolder.add(lightLeft.position, 'z', -10, 10)
    // const LightRightFolder = lightFolder.addFolder('Light Right')
    // LightRightFolder.add(lightRight.position, 'x', -10, 10)
    // LightRightFolder.add(lightRight.position, 'y', -10, 10)
    // LightRightFolder.add(lightRight.position, 'z', -10, 10)
    // phoneFolder.open()
})


/////loads the phones for scene one
var phoneWhite = new THREE.Object3D ()
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
    })
    
    phoneWhite = gltf.scene
    sceneOne.add(gltf.scene)
})

var phoneGold = new THREE.Object3D ()
var phoneGoldSceneFour =new THREE.Object3D ()
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
    })
    
    phoneGold = gltf.scene
    sceneOne.add(gltf.scene)
    phoneGoldSceneFour = phoneGold.clone()
    phoneGoldSceneFour.scale.set(0.2,0.2,0.2)
    phoneGoldSceneFour.position.set(0,0,0)
    sceneFour.add(phoneGoldSceneFour)
})

//////loads the phones for scene 2
var phoneVar2 = new THREE.Object3D()
loader.load('assets/noemi/phone/phone_v4.gltf', (gltf) => {
    gltf.scene.position.set(0,0.15,-0.1)
    gltf.scene.scale.set(0.2,0.2,0.2)
    gltf.scene.traverse((child) => {
        if (child instanceof THREE.Mesh){
            console.log(child)
            if (child.material.name == "phone_color"){
                child.material.color = new THREE.Color(0xcecece)
                child.material.metalness = 0.95
            }
        }
    })
    sceneTwo.add(gltf.scene)
    phoneVar2 = gltf.scene
})
var phoneSilver = new THREE.Object3D ()
loader.load('assets/noemi/phone/phone_v3-2.gltf', (gltf) => {
    gltf.scene.position.set(0,0.15,0.1)
    gltf.scene.rotation.y = 3.1
    gltf.scene.scale.set(0.18,0.18,0.18)
    gltf.scene.traverse((child) => {
        if (child instanceof THREE.Mesh){
            // phoneSilver = child as THREE.Mesh
            if (child.material.name == "phone_color"){
                child.material.color = new THREE.Color(0xcecece)
                child.material.metalness = 0.95
            }
        }
    })
    sceneTwo.add(gltf.scene)
    phoneSilver = gltf.scene
})
// sceneTwo.overrideMaterial = new THREE.MeshBasicMaterial({color: 'gold'});

/////render phones for scene 3, rotate each in turn
function setUpAnimation3(){
    loader.load('assets/noemi/phone/phone_v3-2.gltf', (gltf) => {
        gltf.scene.position.set(4.3,-5,0)
        gltf.scene.scale.set(0.85,0.85,0.85)
        
        gltf.scene.traverse((child) => {
            if (child instanceof THREE.Mesh){
                if (child.material.name == "phone_color"){
                    child.material.color = new THREE.Color(0x8fc9d9)
                    child.material.metalness = 0.6
                    child.material.roughness = 0.7
                }
            }
        })
        sceneThree.add(gltf.scene)
        var bluePhone = gltf.scene

        for (var i =0 ; i<5; i++){
            var newModel = bluePhone.clone()
            newModel.scale.set(0.16,0.16,0.16)
            newModel.position.set(-3.5+1.75*i, -3.5+1.75*i , 0)
            newModel.rotation.z = i*(.5*Math.PI)
            sceneThree.add(newModel)
            tl.to(newModel.rotation, {z: i*(.5*Math.PI)+Math.PI , duration: 1} )
        }
        // gltf.scene.position.set(-2.5,-2.5,0)
        // phoneBlueOne = gltf.scene
        // sceneThree.add(phoneBlueOne)
        // gltf.scene.position.set(2.5,2.5,0)
        // phoneBlueTwo = gltf.scene
        // sceneThree.add(phoneBlueTwo)
    })
}

function setUpAnimation4(){
    tl.to(phoneGoldSceneFour.rotation, {y: Math.PI*2 , duration: 5} )
    ////add plane over screen
    ////allow user to scroll over
}

const textTexture= new TextureLoader().load('assets/noemi/phone/knipsel.PNG')
const textGeometry = new THREE.PlaneBufferGeometry(3,2)
const textMaterial = new THREE.MeshBasicMaterial({map: textTexture})
const textFieldPhones = new THREE.Mesh(textGeometry, textMaterial)
textFieldPhones.position.z = -0.5
textFieldPhones.position.y = 5

sceneTwo.add(textFieldPhones)

function animate() {
    requestAnimationFrame(animate)

    if(phoneBlack.position.y <0.25){
        phoneBlack.position.y +=0.0149
        phoneBlack.rotation.y+=0.013
        phoneBlack.scale.x +=0.0001
        phoneGold.position.y +=0.015
        phoneGold.rotation.y +=0.013
        phoneWhite.position.y +=0.015
        phoneWhite.rotation.y +=0.013
        phoneWhite.scale.x -=0.0001
        rendererOne.render(sceneOne, camera)
    }
    if (playAnimationTwo){
        if (phoneVar2.position.x > -2.5){
            phoneVar2.position.x -= 0.025
            phoneVar2.rotation.y += 0.008
            phoneVar2.scale.x -= 0.0005
        }
        if (phoneSilver.position.x < 2.5){
            phoneSilver.position.x += 0.025
            // phoneSilver.position.z += 0.0001
            phoneSilver.rotation.y -= 0.008
            phoneSilver.scale.x -= 0.0005
        }
        if (textFieldPhones.position.y > 0.25){
            textFieldPhones.position.y -= 0.045
            log("dropping tekst")
        }
        rendererTwo.render(sceneTwo, camera)

    }
    if (playAnimationThree){
        rendererThree.render(sceneThree, orthocam)
    }

    if (playAnimationFour){
        rendererFour.render(sceneFour, camera)
    }
    stats.update()
    // render()
}

function render() {
    // rendererOne.render(sceneOne, camera)
    // rendererTwo.render(sceneTwo, camera)
    // rendererThree.render(sceneThree, orthocam)
    // rendererFour.render(sceneFour, camera)
}

animate()
