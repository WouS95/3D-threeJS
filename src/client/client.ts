import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import Stats from 'three/examples/jsm/libs/stats.module'
import { Camera, TextureLoader } from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import gsap from 'gsap'
import { GUI } from 'dat.gui'

function log(message: any){
    console.log(message)
}
let tl = gsap.timeline()

const animationOne = document.getElementById('animationOne') as HTMLCanvasElement
const animationTwo = document.getElementById('animationTwo') as HTMLCanvasElement
const animationThree = document.getElementById('animationThree') as HTMLCanvasElement

const sceneOne = new THREE.Scene()
sceneOne.background = new THREE.Color(0x750319)

const sceneTwo = new THREE.Scene()
sceneTwo.background = new THREE.Color(0xffffff)

const sceneThree = new THREE.Scene()
sceneThree.background = new THREE.Color(0xffffff)

const ambiLight = new THREE.AmbientLight(0xffffff, 1)
const lightLeft = new THREE.PointLight(0xffffff, 1, 100)
lightLeft.position.set( 0, 5, 20 );
const lightRight = new THREE.PointLight(0xffffff, 1, 100)
lightRight.position.set( 0, 5, -20 );
const ambiLight2 = new THREE.AmbientLight(0xffffff, 1)
const lightLeft2 = new THREE.PointLight(0xffffff, 1, 100)
lightLeft2.position.set( 0, 25, 50 );
const lightRight2 = new THREE.PointLight(0xffffff, 1, 100)
lightRight2.position.set( 0, 25, -50 );
const ambiLight3 = new THREE.AmbientLight(0xffffff, 1)
const lightLeft3 = new THREE.PointLight(0xffffff, 1, 100)
lightLeft3.position.set( 0, 25, 50 );
const lightRight3 = new THREE.PointLight(0xffffff, 1, 100)
lightRight2.position.set( 0, 25, -50 );
sceneOne.add(ambiLight)
sceneOne.add(lightLeft)
sceneOne.add(lightRight)
sceneTwo.add(ambiLight2)
sceneTwo.add(lightLeft2)
sceneTwo.add(lightRight2)
sceneThree.add(ambiLight3)
sceneThree.add(lightLeft3)
sceneThree.add(lightRight3)

const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000)
camera.position.z = 4

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

// const controls = new OrbitControls(camera, renderer.domElement)
// controls.enableDamping = true

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
    })

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
    })

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
 
    var phoneBlueOne = new THREE.Object3D ()
    var phoneBlueTwo = new THREE.Object3D ()
    var phoneBlueThree = new THREE.Object3D ()
    var phoneBlueFour = new THREE.Object3D ()

    loader.load('assets/noemi/phone/phone_v3-2.gltf', (gltf) => {
        // gltf.scene.position.set(1.2,-3,0)
        gltf.scene.scale.set(0.16,0.16,0.16)

        gltf.scene.traverse((child) => {
            if (child instanceof THREE.Mesh){
                if (child.material.name == "phone_color"){
                    child.material.color = new THREE.Color(0x8fc9d9)
                    child.material.metalness = 0.6
                    child.material.roughness = 0.7
                }
            }
        })
        
        var bluePhone = gltf.scene
        var phoneRotation = 0
        for (var i =0 ; i<5; i++){
            var newModel = bluePhone.clone()
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

    window.addEventListener('resize', onWindowResize, false)
    function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    rendererOne.setSize(window.innerWidth, window.innerHeight)
    rendererTwo.setSize(window.innerWidth, window.innerHeight)
    rendererThree.setSize(window.innerWidth, window.innerHeight)
    render()
}
let playAnimationTwo = false
window.addEventListener("scroll", function() {
const t = Math.abs(document.body.getBoundingClientRect().top)
log(t)
log(window.innerHeight)

if(t > window.innerHeight){
    log("start animation 2")
    playAnimationTwo = true
}
else {
    playAnimationTwo = false
}
})

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
    }
    if (playAnimationTwo){
        if (phoneVar2.position.x > -2.5){
            phoneVar2.position.x -= 0.025
            phoneVar2.rotation.y += 0.008
            phoneVar2.scale.x -= 0.0002
        }
        if (phoneSilver.position.x < 2.5){
            phoneSilver.position.x += 0.025
            // phoneSilver.position.z += 0.0001
            phoneSilver.rotation.y -= 0.008
            phoneSilver.scale.x -= 0.0002
        }
        if (textFieldPhones.position.y > 0.25){
            textFieldPhones.position.y -= 0.045
            log("dropping tekst")
        }

    }

    render()
}

function render() {
    rendererOne.render(sceneOne, camera)
    rendererTwo.render(sceneTwo, camera)
    rendererThree.render(sceneThree, orthocam)
}

animate()
