import * as THREE from 'three'
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import Stats from 'three/examples/jsm/libs/stats.module'
import { Camera, TextureLoader } from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import gsap from 'gsap'
import { GUI } from 'dat.gui'
// import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
// import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';

function log(message: any){
    console.log(message)
}

let tl = gsap.timeline()

// const controls = new OrbitControls(camera, renderer.domElement)
// controls.enableDamping = true
// const stats = Stats()
// document.body.appendChild(stats.dom)

////////match animations to the canvasses
const animationOne = document.getElementById('animationOne') as HTMLCanvasElement
const animationTwo = document.getElementById('animationTwo') as HTMLCanvasElement
const animationThree = document.getElementById('animationThree') as HTMLCanvasElement
const animationFour = document.getElementById('animationFour') as HTMLCanvasElement
const animationFive = document.getElementById('animationFive') as HTMLCanvasElement

////scene 1 backgroundcolor is dark purple-grey
const sceneOne = new THREE.Scene()
// sceneOne.background = new THREE.Color(0x312F3C)
sceneOne.background = new THREE.Color(0x242424)

//////scene 2 & 3 & 4 white background
const sceneTwo = new THREE.Scene()
sceneTwo.background = new THREE.Color(0xffffff)/////////

const sceneThree = new THREE.Scene()
sceneThree.background = new THREE.Color(0xF6F6F6)////////////

const sceneFour = new THREE.Scene()
sceneFour.background = new THREE.Color(0xffffff)//////////////

const sceneFive = new THREE.Scene()
sceneFive.background = new THREE.Color(0xffffff)

const ambiLight = new THREE.AmbientLight(0xffffff, 1)
const lightLeft = new THREE.PointLight(0xffffff, 1, 100)
lightLeft.position.set( 0, 5, 20 );
const lightRight = new THREE.PointLight(0xffffff, 1, 100)
lightRight.position.set( 0, 5, -20 );
sceneOne.add(ambiLight)
sceneOne.add(lightLeft)
sceneOne.add(lightRight)

const ambiLight2 = new THREE.AmbientLight(0xffffff, 1)
const lightLeft2 = new THREE.PointLight(0xffffff, 1, 100, 1)
lightLeft2.position.set(50, 20, 50 );
const lightRight2 = new THREE.PointLight(0xffffff, 1, 100, 1)
lightRight2.position.set( -50, 20, 50 );
sceneTwo.add(ambiLight2)
sceneTwo.add(lightLeft2)
sceneTwo.add(lightRight2)

const ambiLight3 = new THREE.AmbientLight(0xffffff, 1)
const light3 = new THREE.PointLight(0xffffff, 1, 100,1.2)
light3.position.set( 0, 10, 25 );
sceneThree.add(ambiLight3)
sceneThree.add(light3)

const ambiLight4 = new THREE.AmbientLight(0xffffff, 1)
const lightLeft4 = new THREE.PointLight(0xffffff, 1, 100)
lightLeft4.position.set( 0, 25, 50 );
const lightRight4 = new THREE.PointLight(0xffffff, 1, 100)
lightRight4.position.set( 0, 25, -50 );
sceneFour.add(ambiLight4)
sceneFour.add(lightLeft4)
sceneFour.add(lightRight4)

const ambiLight5 = new THREE.AmbientLight(0xffffff, 1)

const light5 = new THREE.PointLight(0xffffff, 1,100,1)
light5.position.set(0,10,20)
sceneFive.add(ambiLight5)
sceneFive.add(light5)


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

const rendererFive = new THREE.WebGLRenderer({canvas: animationFive, alpha: true})
rendererFive.setPixelRatio(window.devicePixelRatio); 
rendererFive.outputEncoding = THREE.sRGBEncoding
rendererFive.setSize(window.innerWidth, window.innerHeight)

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
    rendererFive.setSize(window.innerWidth, window.innerHeight)
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

    if (t>(this.window.innerHeight*1.9)){
               
        log("start animation 2")
        playAnimationTwo = true
    }

    else {
        playAnimationTwo = false
    
    }

    if (t>(this.window.innerHeight*3)){

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
    if (t>(this.window.innerHeight*4)){
        window.addEventListener('mousemove', e =>{

            var mouse = new THREE.Vector2();
            mouse.x = ( e.clientX / window.innerWidth ) * 2 - 1;
            mouse.y = - ( e.clientY / window.innerHeight ) * 2 + 1;
        
            var raycaster = new THREE.Raycaster();
            raycaster.setFromCamera( mouse, orthocam );
            var intersectsBlack = raycaster.intersectObject( colorCircleBlack );
            var intersectsSilver = raycaster.intersectObject( colorCircleSilver );
            var intersectsWhite = raycaster.intersectObject( colorCircleWhite );
            var intersectsBlue = raycaster.intersectObject( colorCircleBlue );
            var intersectsGold = raycaster.intersectObject( colorCircleGold );
        
            var intersectPhonePro = raycaster.intersectObject( phoneVar2)
            var intersectPhoneLite = raycaster.intersectObject (phoneSilver)
        
            if(intersectsBlack.length > 0) {
                setAllColorPositionsTo0()
                phoneBlackSceneFive.visible = true
                log("hovering over black")
            }
            if(intersectsSilver.length > 0) {
                setAllColorPositionsTo0()
                phoneSilverSceneFive.visible = true
                log("hovering over silver")
            }
            if(intersectsWhite.length > 0) {
                setAllColorPositionsTo0()
                phoneWhiteSceneFive.visible = true
                log("hovering over white")
            }
            if(intersectsBlue.length > 0) {
                setAllColorPositionsTo0()
                phoneBlueSceneFive.visible = true
                log("hovering over blue")
            }
            if(intersectsGold.length > 0) {
                setAllColorPositionsTo0()
                phoneGoldSceneFive.visible = true
                log("hovering over gold")
            }
            if(intersectPhonePro.length > 0) {
                log("hovering over phone pro")
                // phoneVar2.rotation.y +=0.1
                // window.addEventListener('mousedown', e =>{
                //     tl.to(phoneVar2.rotation, {z: Math.PI , duration: 1.5} )
                // })
                //replace("fillertext", "b;ab;a")
                // document.getElementById("animation2")?.style.opacity.replace("0", "1")
                //replaceWith("Met een scherm van 21 inches en een geweicht van slechts 211 gr is de YouPhone Pro de beste op de markt. Al vanaf euro 399,99")
            }
            if(intersectPhoneLite.length > 0) {
                log("hovering over phone lite")
                // phoneSilver.rotation.y +=0.1
            }
        
        })
    }
})

const loader = new GLTFLoader()

var phoneBlack = new THREE.Object3D ()
var phoneBlackSceneFive = new THREE.Object3D ()
loader.load('assets/noemi/phone/phone_v3.4.gltf', (gltf) => {
    gltf.scene.position.set(-1.2,-3.25,0)
    // gltf.scene.scale.set(0.2,0.2,0.2)
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

    phoneBlackSceneFive = phoneBlack.clone()
    phoneBlackSceneFive.scale.set(2,2,2)
    phoneBlackSceneFive.position.set(-1.5,0,1)
    // phoneBlackSceneFive.visible = false
    sceneFive.add(phoneBlackSceneFive)
})


/////loads the phones for scene one
var phoneWhite = new THREE.Object3D ()
var phoneWhiteSceneFive = new THREE.Object3D ()
loader.load('assets/noemi/phone/phone_v3.4.gltf', (gltf) => {
    gltf.scene.position.set(1.2,-3.25,0)
    // gltf.scene.scale.set(0.2,0.2,0.2)

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
    // phoneWhite.visible = false
    sceneOne.add(gltf.scene)

    phoneWhiteSceneFive = phoneWhite.clone()
    phoneWhiteSceneFive.scale.set(2,2,2)
    phoneWhiteSceneFive.position.set(-1.5,0,1)
    phoneWhiteSceneFive.visible = false
    sceneFive.add(phoneWhiteSceneFive)
})

var phoneGold = new THREE.Object3D ()
var phoneGoldSceneFour =new THREE.Object3D ()
var phoneGoldSceneFive = new THREE.Object3D ()
loader.load('assets/noemi/phone/phone_v3.4.gltf', (gltf) => {
    gltf.scene.position.set(0,-3.25,0)
    // gltf.scene.scale.set(0.2,0.2,0.2)
    gltf.scene.rotation.y = Math.PI
    gltf.scene.traverse((child) => {
        if (child instanceof THREE.Mesh){
            if (child.material.name == "phone_color"){
                child.material.color = new THREE.Color(0xC99548)
                child.material.metalness = 0.8
            }
        }
    })
    
    phoneGold = gltf.scene
    sceneOne.add(gltf.scene)
    phoneGoldSceneFour = phoneGold.clone()
    phoneGoldSceneFour.scale.set(2,2,2)
    phoneGoldSceneFour.position.set(3.5,0,0)
    sceneFour.add(phoneGoldSceneFour)
    phoneGoldSceneFive = phoneGold.clone()
    phoneGoldSceneFive.scale.set(2,2,2)
    phoneGoldSceneFive.position.set(-1.5,0,1)
    phoneGoldSceneFive.rotation.y = Math.PI
    phoneGoldSceneFive.visible = false
    sceneFive.add(phoneGoldSceneFive)
})

    // const gui = new GUI()
    // const lightFolder = gui.addFolder('Lights')
    // const LightLeftFolder = lightFolder.addFolder('Light Left')
    // LightLeftFolder.add(lightLeft2.position, 'x', -10, 100)
    // LightLeftFolder.add(lightLeft2.position, 'y', -10, 100)
    // LightLeftFolder.add(lightLeft2.position, 'z', -10, 200)
    // const LightRightFolder = lightFolder.addFolder('Light Right')
    // LightRightFolder.add(lightRight2.position, 'x', -10, 100)
    // LightRightFolder.add(lightRight2.position, 'y', -10, 100)
    // LightRightFolder.add(lightRight2.position, 'z', -10, 200)
    // lightFolder.open()

// const textTexture= new TextureLoader().load('assets/noemi/phone/knipsel.PNG')
// const textGeometry = new THREE.PlaneBufferGeometry(3,2)
// const textMaterial = new THREE.MeshBasicMaterial({map: textTexture})
// const textFieldPhones = new THREE.Mesh(textGeometry, textMaterial)
// textFieldPhones.position.z = -0.5
// textFieldPhones.position.y = 5

// sceneTwo.add(textFieldPhones)
//////loads the phones for scene 2
var phoneVar2 = new THREE.Object3D()
loader.load('assets/noemi/phone/phone_v3-unjoined.gltf', (gltf) => {
    gltf.scene.position.set(0,0.65,-0.1)
    // gltf.scene.scale.set(0.2,0.2,0.2)
    gltf.scene.traverse((child) => {
        if (child instanceof THREE.Mesh){
            console.log(child)
            if (child.material.name == "phone_color"){
                child.material.color = new THREE.Color(0xe8e8e8)
                child.material.metalness = 0.95
            }
        }
    })
    sceneTwo.add(gltf.scene)
    phoneVar2 = gltf.scene
})
var phoneSilver = new THREE.Object3D ()
var phoneSilverSceneFive = new THREE.Object3D ()
loader.load('assets/noemi/phone/phone_v3.4.gltf', (gltf) => {
    gltf.scene.position.set(0,0,0.1)
    gltf.scene.rotation.y = Math.PI
    gltf.scene.scale.set(0.9,0.9,0.9)
    gltf.scene.traverse((child) => {
        if (child instanceof THREE.Mesh){
            // phoneSilver = child as THREE.Mesh
            if (child.material.name == "phone_color"){
                child.material.color = new THREE.Color(0xe8e8e8)
                child.material.metalness = 0.95
            }
        }
    })
    sceneTwo.add(gltf.scene)
    phoneSilver = gltf.scene

    phoneSilverSceneFive = phoneSilver.clone()
    phoneSilverSceneFive.scale.set(2,2,2)
    phoneSilverSceneFive.position.set(-1.5,0,1)
    phoneSilverSceneFive.rotation.y = Math.PI
    phoneSilverSceneFive.visible = false
    sceneFive.add(phoneSilverSceneFive)
})
// sceneTwo.overrideMaterial = new THREE.MeshBasicMaterial({color: 'gold'});

const flashTexture= new TextureLoader().load('assets/noemi/phone/camflash.png')
const flashGeometry = new THREE.PlaneBufferGeometry()
const flashMaterial = new THREE.MeshBasicMaterial({map: flashTexture})
flashMaterial.transparent = true
const flashCamera = new THREE.Mesh(flashGeometry, flashMaterial)
flashCamera.position.z = -6
flashCamera.position.y = -.1
flashCamera.position.x = 3.8

sceneThree.add(flashCamera)


/////render phones for scene 3, rotate each in turn

var phoneBlueSceneFive = new THREE.Object3D ()

function setUpAnimation3(){
    loader.load('assets/noemi/phone/phone_v3.4.gltf', (gltf) => {
        gltf.scene.position.set(4.3,-5,-0.1)
        gltf.scene.scale.set(3.8,3.8,3.8)
        
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
            newModel.scale.set(0.8,0.8,0.8)
            newModel.position.set(-3.5+1.75*i, -3.5+1.75*i , 0)
            newModel.rotation.z = i*(.5*Math.PI)
            newModel.rotation.y = i*Math.PI
            sceneThree.add(newModel)
            tl.to(newModel.rotation, {z: i*(.5*Math.PI)+Math.PI , duration: 1} )
        }

        phoneBlueSceneFive = bluePhone.clone()
        phoneBlueSceneFive.scale.set(2,2,2)
        phoneBlueSceneFive.position.set(-1.5,0,1)
        phoneBlueSceneFive.visible = false
        sceneFive.add(phoneBlueSceneFive)
    })
}

function setUpAnimation4(){
    tl.to(phoneGoldSceneFour.rotation, {y: Math.PI*2 , duration: 5} )
    ////add plane over screen
    ////allow user to scroll over
}

const colorCircleGeometry = new THREE.CircleBufferGeometry(.5,36)
const blueMaterial = new THREE.MeshBasicMaterial({ color: 0x8fc9d9 })
const blackMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 })
const whiteMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff })
const goldMaterial = new THREE.MeshBasicMaterial({ color: 0xC99548 })
const silverMaterial = new THREE.MeshBasicMaterial({ color: 0xcecece })
// colorCircleMaterial.color = new THREE.Color(0x8fc9d9)
const colorCircleBlack = new THREE.Mesh(colorCircleGeometry, blackMaterial)
colorCircleBlack.position.set(1.5,2.5,0)
sceneFive.add(colorCircleBlack)
const colorCircleSilver = new THREE.Mesh(colorCircleGeometry, silverMaterial)
colorCircleSilver.position.set(1.5,1.25,0)
sceneFive.add(colorCircleSilver)
const outlineWhite = colorCircleBlack.clone()
outlineWhite.scale.set(1.04,1.04,1.04)
outlineWhite.position.set(1.5,0,0)
sceneFive.add(outlineWhite)
const colorCircleWhite = new THREE.Mesh(colorCircleGeometry, whiteMaterial)
colorCircleWhite.position.set(1.5,0,0)
sceneFive.add(colorCircleWhite)
const colorCircleBlue = new THREE.Mesh(colorCircleGeometry, blueMaterial)
colorCircleBlue.position.set(1.5,-1.25,0)
sceneFive.add(colorCircleBlue)
const colorCircleGold = new THREE.Mesh(colorCircleGeometry, goldMaterial)
colorCircleGold.position.set(1.5,-2.5,0)
sceneFive.add(colorCircleGold)

// window.addEventListener('mousemove', e =>{

//     var mouse = new THREE.Vector2();
//     mouse.x = ( e.clientX / window.innerWidth ) * 2 - 1;
//     mouse.y = - ( e.clientY / window.innerHeight ) * 2 + 1;

//     var raycaster = new THREE.Raycaster();
//     raycaster.setFromCamera( mouse, orthocam );
//     var intersectsBlack = raycaster.intersectObject( colorCircleBlack );
//     var intersectsSilver = raycaster.intersectObject( colorCircleSilver );
//     var intersectsWhite = raycaster.intersectObject( colorCircleWhite );
//     var intersectsBlue = raycaster.intersectObject( colorCircleBlue );
//     var intersectsGold = raycaster.intersectObject( colorCircleGold );

//     var intersectPhonePro = raycaster.intersectObject( phoneVar2)
//     var intersectPhoneLite = raycaster.intersectObject (phoneSilver)

//     if(intersectsBlack.length > 0) {
//         setAllColorPositionsTo0()
//         phoneBlackSceneFive.visible = true
//         log("hovering over black")
//     }
//     if(intersectsSilver.length > 0) {
//         setAllColorPositionsTo0()
//         phoneSilverSceneFive.visible = true
//         log("hovering over silver")
//     }
//     if(intersectsWhite.length > 0) {
//         setAllColorPositionsTo0()
//         phoneWhiteSceneFive.visible = true
//         log("hovering over white")
//     }
//     if(intersectsBlue.length > 0) {
//         setAllColorPositionsTo0()
//         phoneBlueSceneFive.visible = true
//         log("hovering over blue")
//     }
//     if(intersectsGold.length > 0) {
//         setAllColorPositionsTo0()
//         phoneGoldSceneFive.visible = true
//         log("hovering over gold")
//     }
//     if(intersectPhonePro.length > 0) {
//         log("hovering over phone pro")
//         // phoneVar2.rotation.y +=0.1
//         // window.addEventListener('mousedown', e =>{
//         //     tl.to(phoneVar2.rotation, {z: Math.PI , duration: 1.5} )
//         // })
//         //replace("fillertext", "b;ab;a")
//         // document.getElementById("animation2")?.style.opacity.replace("0", "1")
//         //replaceWith("Met een scherm van 21 inches en een geweicht van slechts 211 gr is de YouPhone Pro de beste op de markt. Al vanaf euro 399,99")
//     }
//     if(intersectPhoneLite.length > 0) {
//         log("hovering over phone lite")
//         // phoneSilver.rotation.y +=0.1
//     }

// })

window.addEventListener('mousedown', e =>{
    var mouse = new THREE.Vector2();
    mouse.x = ( e.clientX / window.innerWidth ) * 2 - 1;
    mouse.y = - ( e.clientY / window.innerHeight ) * 2 + 1;

    var raycaster = new THREE.Raycaster();
    raycaster.setFromCamera( mouse, orthocam );

    var intersectPhonePro = raycaster.intersectObject( phoneVar2)
    var intersectPhoneLite = raycaster.intersectObject (phoneSilver)
    if(intersectPhonePro.length>0) {
        log("clicking on phone pro")
        // phoneVar2.rotation.y +=0.1
            tl.to(phoneVar2.rotation, {y: phoneVar2.rotation.y+Math.PI , duration: 1.5} )
        
        //replace("fillertext", "b;ab;a")
        // document.getElementById("animation2")?.style.opacity.replace("0", "1")
        //replaceWith("Met een scherm van 21 inches en een geweicht van slechts 211 gr is de YouPhone Pro de beste op de markt. Al vanaf euro 399,99")
    }
    if(intersectPhoneLite.length>0) {
        log("hovering over phone lite")
        tl.to(phoneSilver.rotation, {y: phoneSilver.rotation.y+Math.PI , duration: 1.5} )
    }

})

function setAllColorPositionsTo0(){
    phoneBlackSceneFive.visible = false
    phoneSilverSceneFive.visible = false
    phoneWhiteSceneFive.visible = false
    phoneBlueSceneFive.visible = false
    phoneGoldSceneFive.visible = false
}

var playFlash = true
function animate() {
    requestAnimationFrame(animate)

    if(phoneBlack.position.y <0){
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
        if (phoneVar2.position.x > -2){
            phoneVar2.position.x -= 0.025
            phoneVar2.rotation.y += 0.008
            phoneVar2.scale.x -= 0.0015
        }
        if (phoneSilver.position.x < 2){
            phoneSilver.position.x += 0.025
            phoneSilver.rotation.y -= 0.008
            phoneSilver.scale.x -= 0.0015
        }

        log("text moet verschijnen")
        rendererTwo.render(sceneTwo, camera)

    }
    if (playAnimationThree){
        if (flashCamera.position.z <0.5 && playFlash){
            flashCamera.position.z+=0.035
        }
        else if (flashCamera.position.z >= 0.5 && playFlash){
            flashCamera.scale.x +=.2
            flashCamera.scale.y +=.2
            flashCamera.scale.z +=.2
            flashCamera.rotation.z+=0.15
        }
        if (flashCamera.rotation.z >= .9 && playFlash){
            flashCamera.position.z = -1
            playFlash = false
        }
        rendererThree.render(sceneThree, orthocam)
    }

    if (playAnimationFour){
        rendererFour.render(sceneFour, orthocam)
    }
    // stats.update()
    rendererFive.render(sceneFive, orthocam)
}

function render() {
    // rendererOne.render(sceneOne, camera)
    // rendererTwo.render(sceneTwo, camera)
    // rendererThree.render(sceneThree, orthocam)
    // rendererFour.render(sceneFour, camera)
}

animate()
