import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { GUI } from 'dat.gui'
import gsap from 'gsap'

// Scene 1 -----------------------------
const scene1 = new THREE.Scene()

// Camera 
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
camera.position.z = 8
camera.position.y = -0.05
const canvas = document.getElementById("canvas") as HTMLCanvasElement

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true,
    antialias: true
})
renderer.setSize(window.innerWidth, window.innerHeight)

//Lights 
const ambientLight = new THREE.AmbientLight()
ambientLight.intensity = 3
scene1.add(ambientLight)

const spotLight = new THREE.SpotLight()
spotLight.position.set(0,0,30)
spotLight.intensity = 5
scene1.add(spotLight)

// Loads the GLTF model of the headphone.
let headphone1: any
const loader = new GLTFLoader()
loader.load(
    'assets/bram/headphone/scene.gltf',
    function (gltf) {
        gltf.scene.scale.x = 0.01
        gltf.scene.scale.y = 0.01
        gltf.scene.scale.z = 0.01
        gltf.scene.rotation.y = Math.PI/2
        headphoneObject.add(gltf.scene)
        headphone1 = gltf
        introAnimation()
    },
    (xhr) => {
        console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
    },
    (error) => {
        console.log(error)
    }
)

// Puts div with all content for the first headphone in a variable.
const hero = document.getElementById("hero") as HTMLElement

// Puts the spin button in a variable
const spinButton = document.getElementById("spinButton") as HTMLButtonElement

// 3D object where all the elements of the first headphone will be stored in.
const headphoneObject = new THREE.Mesh()
headphoneObject.name = "headphone"

// Material assigned to clickable areas. By default invisible. Can be made visible for debugging purposes.
const normalMaterial = new THREE.MeshNormalMaterial({
    transparent: true,
    opacity: 0
})

// This is how a clickable area is created. see comments below for the explanation
// Geometry for the clickable area of the sound specs
const headphoneSoundGeometry = new THREE.CylinderGeometry( 0.62, 0.62, 0.82, 32 )

// Creates the clickable area for the sound specs
const headphoneSoundRight = new THREE.Mesh(headphoneSoundGeometry, normalMaterial)
headphoneSoundRight.rotation.z = Math.PI / 2 - 0.35
headphoneSoundRight.position.x = 0.65
headphoneSoundRight.position.y = -0.6
headphoneSoundRight.position.z = -0.15

// Assigns a name to the object so the program know on which object the user has clicked
headphoneSoundRight.name = "sound"


// Clickable area for the headphone band adjustment specs
const headhoneBandAdjustGeometry = new THREE.BoxGeometry(0.5, 0.5, 0.5)
const headhoneBandAdjust = new THREE.Mesh(headhoneBandAdjustGeometry, normalMaterial)
headhoneBandAdjust.position.x = -1
headhoneBandAdjust.position.y = 0.1
headhoneBandAdjust.position.z = -0.1
headhoneBandAdjust.name = "bandAdjust"

// Clickable area for the headphone band specs
const headphoneBandGeometry = new THREE.BoxGeometry(2, 0.7, 0.5)
const headphoneBand = new THREE.Mesh(headphoneBandGeometry, normalMaterial)
headphoneBand.position.y = 0.9
headphoneBand.position.z = -0.1
headphoneBand.name = "band"

// Clickable area for the headphone microphone specs
const headphoneMicGeometry = new THREE.BoxGeometry(0.2, 0.2, 0.2)
const headphoneMic = new THREE.Mesh(headphoneMicGeometry, normalMaterial)
headphoneMic.position.y = - 1.1
headphoneMic.position.x = - 0.65
headphoneMic.position.z = 0.7
headphoneMic.name = "mic"


// Adds every single clickable object to the main object that will be put in the scene
headphoneObject.add(headphoneMic)
headphoneObject.add(headhoneBandAdjust)
headphoneObject.add(headphoneBand)
headphoneObject.add(headphoneSoundRight)

// Adds the main object to the scene
scene1.add(headphoneObject)



// Scene 2 -----------------------------
const scene2 = new THREE.Scene()

// Camera
const camera2 = new THREE.PerspectiveCamera(25, window.innerWidth/2 / 500, 0.1, 1000)
camera2.position.z = 28
camera2.position.y = -0.05
const canvas2 = document.getElementById("canvas2") as HTMLCanvasElement

// Renderer
const renderer2 = new THREE.WebGLRenderer({
    canvas: canvas2,
    alpha: true,
    antialias: true
})
renderer2.setSize(window.innerWidth/2, 500)

//Lights 
const ambientLight2 = new THREE.AmbientLight()
ambientLight2.intensity = 3
scene2.add(ambientLight2)

const spotLight2 = new THREE.SpotLight()
spotLight2.position.set(0,0,35)
spotLight2.intensity = 5
scene2.add(spotLight2)

// Loads the GLTF model of the second headphone
let headphone2: any
const loader2 = new GLTFLoader()
loader2.load(
    'assets/bram/headphone/scene.gltf',
    function (gltf) {
        gltf.scene.scale.x = 0.025
        gltf.scene.scale.y = 0.025
        gltf.scene.scale.z = 0.025
        gltf.scene.rotation.y = Math.PI
        gltf.scene.position.x = 2
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

// Every time the window resizes, it resizes the scenes responsive to the window size 
window.addEventListener('resize', onWindowResize ,false)
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)

    camera2.aspect = window.innerWidth /2 / 500
    camera2.updateProjectionMatrix()
    renderer2.setSize(window.innerWidth /2, 500)
    render()
}

// Global booleans that are used so the program knows what it's doing to trigger different functionalities.
let isShowingSound = false
let isShowingMic = false
let isShowingBand = false 
let isShowingBandAdjust = false
let isSpinning = false
let isAnimating = false

// Functions that is used so the program knows where the mouse of the user is.
const mouse = new THREE.Vector2()
const raycaster = new THREE.Raycaster()

// Runs when the mouse is clicked
function onMouseClick( event: any) {
	// Calculate mouse position in normalized device coordinates.
	// (-1 to +1) for both components.
	mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

    // Sets a raycaster from the position of the camera in the scene
    raycaster.setFromCamera(mouse, camera)

    // Variable that stores the object where the mouse is intersecting with
    const intersects = raycaster.intersectObject(scene1, true)
    
    // Runs through all the intersects the mouse has.
    for (let i = 0; i < intersects.length; i++) {
        // Depending on the nname of the object,

        // Checks if the program intersects with an object AND if it's not still
        if(intersects[i].object && !isAnimating){

            // Runs if the program is not showing specs currently
            if(!isShowingSpecsOf()){
                if(intersects[i].object.name == "sound"){
                    goToSoundSpecs()
                    animationDelay()
                }
                if(intersects[i].object.name == "band"){
                    goToBandSpecs()
                    animationDelay()
                }
                if(intersects[i].object.name == "mic" ){
                    goToMicSpecs()
                    animationDelay()
                }
                if(intersects[i].object.name == "bandAdjust" ){
                    goToBandAdjustSpecs()
                    animationDelay()
                }
            } 
            // Runs if the program is showing specs. Which makes only the object which it is looking at clickable and nothing else
            else {
                if(intersects[i].object.name == "sound" && isShowingSpecsOf() == "sound"){
                    goToSoundSpecs()
                    animationDelay()
                }
                if(intersects[i].object.name == "band" && isShowingSpecsOf() == "band"){
                    goToBandSpecs()
                    animationDelay()
                }
                if(intersects[i].object.name == "mic" && isShowingSpecsOf() == "mic"){
                    goToMicSpecs()
                    animationDelay()
                }
                if(intersects[i].object.name == "bandAdjust" && isShowingSpecsOf() == "bandAdjust"){
                    goToBandAdjustSpecs()
                }
            }
        }
    }
}

// Function that returns the name of the specs the program is looking at.
function isShowingSpecsOf(){
    if(isShowingBandAdjust){
        return "bandAdjust"
    }
    if(isShowingBand){
        return "band"
    }
    if(isShowingMic){
        return "mic"
    }
    if(isShowingSound){
        return "sound"
    }
}

// Function that sets the isAnimating Bolean to true for 2 seconds.
// This makes sure that nothing else is clickable while the program is still animating.
// Which roughly never takes longer than 2 seconds.
function animationDelay(){
    isAnimating = true
    setTimeout(function() {
        isAnimating = false
    }, 2000);
}

// Eventlistener for the function that makes things clickable.
window.addEventListener( 'click', onMouseClick, false );

// Animations  -----------------------------
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
            marginTop: 330,
            opacity: 1
        }
    })
    gsap.to(spinButton, {
        delay: 1.5,
        duration: 2,
        css: {
            opacity: 1
        }
    })
}

function goToOriginal(){
    spinButton.style.display = 'inline-block'
        gsap.to(spinButton, {
            delay: 0.4,
            duration: 0.4,
            css: {
                opacity: '1'
            }
        })
    gsap.to(camera.position, {
        duration: 1,
        z: 3,
        y: -0.05,
        x: 0
    })
    gsap.to(camera.rotation, {
        duration: 0.5,
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
    if(isSpinning){
        toggleSpin()
    }

    const soundSpecs = document.getElementById("soundSpecs")
    if(!isShowingSound){
        gsap.to(spinButton, {
            duration: 0.5,
            css: {
                opacity: '0'
            }
        })
        gsap.to(spinButton, {
            delay: 0.5,
            css: {
                display: 'none'
            }
        })
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
                background: "#111"
            }
        })
        gsap.to(soundSpecs, {
            duration: 1,
            css: {
                top: "350px",
                opacity: "1"
            }
        })
    } else {
        gsap.to(soundSpecs, {
            duration: 1,
            css: {
                top: "0px",
                opacity: "0"
            }
        })
        goToOriginal()
    }
    isShowingSound = !isShowingSound
}

function goToBandAdjustSpecs(){
    
    if(isSpinning){
        toggleSpin()
    }

    const bandAdjustSpecs = document.getElementById("bandAdjustSpecs")

    if(!isShowingBandAdjust){
        gsap.to(spinButton, {
            duration: 0.5,
            css: {
                opacity: '0'
            }
        })
        gsap.to(spinButton, {
            delay: 0.5,
            css: {
                display: 'none'
            }
        })
        gsap.to(camera.rotation, {
            duration: 1.2,
            y: -Math.PI / 2 - 0.3
        })
        gsap.to(camera.position, {
            duration: 1.2,
            x: -2,
            z: 0.1,
            y: 0.1
        })
        gsap.to(hero, {
            duration: 0.5,
            css: {
                background: "#111"
            }
        })
        gsap.to(bandAdjustSpecs, {
            duration: 1,
            css: {
                top: "350px",
                opacity: "1"
            }
        })
    } else {
        gsap.to(bandAdjustSpecs, {
            duration: 1,
            css: {
                top: "0px",
                opacity: "0"
            }
        })
        goToOriginal()
    }
    isShowingBandAdjust = !isShowingBandAdjust
}

function goToMicSpecs(){
    
    if(isSpinning){
        toggleSpin()
    }

    const micSpecs = document.getElementById("micSpecs")
    if(!isShowingMic){
        gsap.to(spinButton, {
            duration: 0.5,
            css: {
                opacity: '0'
            }
        })
        gsap.to(spinButton, {
            delay: 0.5,
            css: {
                display: 'none'
            }
        })
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
                background: "#111"
            }
            })
        gsap.to(micSpecs, {
            duration: 1,
            css: {
                bottom: "250px",
                opacity: "1"
            }
        })
    } else {
        goToOriginal()
        gsap.to(micSpecs, {
            duration: 1,
            css: {
                bottom: "-250px",
                opacity: "0"
            }
        })
    }
    isShowingMic = !isShowingMic
}

function goToBandSpecs(){
    
    if(isSpinning){
        toggleSpin()
    }

    const bandSpecs = document.getElementById("bandSpecs")
    if(!isShowingBand){
        gsap.to(spinButton, {
            duration: 0.5,
            css: {
                opacity: '0'
            }
        })
        gsap.to(spinButton, {
            delay: 0.5,
            css: {
                display: 'none'
            }
        })
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
                background: "#111"
            }
        })
        gsap.to(bandSpecs, {
            delay: 1.5,
            duration: 1,
            css: {
                top: "100px",
                opacity: "1"
            }
        })
    } else {
        gsap.to(bandSpecs, {
            duration: 1,
            css: {
                top: "-200px",
                opacity: "0"
            }
        })
        goToOriginal()
    }
    isShowingBand = !isShowingBand
}

// Functions that toggles the spinning.
// This is also used to stop the spinning when the program starts looking at specs.
function toggleSpin(){
    if(isSpinning){
        gsap.to(headphoneObject.rotation, {
            duration: 1,
            y: 0
        })
        spinButton.innerHTML = "Start spinning"
    } else {
        spinButton.innerHTML = "Stop spinning"
    }
    isSpinning = !isSpinning

}

// Removes and adds certain elements when the user scrolls through the page.
window.onscroll = function(){
    console.log(window.scrollY)
    if(headphone1){
        if(window.scrollY > 175){
            gsap.to(spinButton, {
                duration: 0.2,
                css: {
                    opacity: '0',
                    display: 'none'
                }
            })
        } else {
            if(!isShowingSpecsOf()){
                gsap.to(spinButton, {
                    duration: 0.2,
                    css: {
                        opacity: '1',
                        display: 'inline-block'
                    }
                })
            }
        }
        if(window.scrollY > 1000){
            hero.style.display = 'none'
        } else {
            hero.style.display = 'block'
        }
    }
}

// Animates the scenes by constantly looping this function and rendering again.
function animate() {
    requestAnimationFrame(animate)
    if(headphone1 && isSpinning){
        headphoneObject.rotation.y += 0.01
    }
    if(headphone2){
        headphone2.scene.rotation.y += 0.01
    }
    // controls.update()

    render()
}

// Function that renders the scenes.
function render() {
    renderer.render(scene1, camera)
    renderer2.render(scene2, camera2)

}

// Runs the animate function the first time.
animate()

// Makes the buttons clickable.
const micSpecsBackButton = document.getElementById("micSpecsBack") as HTMLButtonElement
micSpecsBackButton.onclick = goToMicSpecs

const bandSpecsBackButton = document.getElementById("bandSpecsBack") as HTMLButtonElement
bandSpecsBackButton.onclick = goToBandSpecs

const soundSpecsBackButton = document.getElementById("soundSpecsBack") as HTMLButtonElement
soundSpecsBackButton.onclick = goToSoundSpecs

const bandAdjustBackButton = document.getElementById("bandAdjustSpecsBack") as HTMLButtonElement
bandAdjustBackButton.onclick = goToBandAdjustSpecs

spinButton.onclick = toggleSpin