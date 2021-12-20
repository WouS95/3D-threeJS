import * as THREE from 'three'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GUI } from 'three/examples/jsm/libs/dat.gui.module'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader'
import { RoughnessMipmapper } from 'three/examples/jsm/utils/RoughnessMipmapper'
import { PMREMGenerator } from 'three'
import { reverse } from 'dns'

/* SCENE */

const scene = new THREE.Scene()

/* CAMERA */

const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.001, 1000)

/* STARTPOS CAMERA */
camera.position.x = 0.1
camera.position.y = 0.448
camera.position.z = -0.015

camera.rotation.x = -1.59
camera.rotation.y = 0
camera.rotation.z = 3.14

/* LIGHTS */

const hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0);
scene.add(hemiLight);

/* RENDERER */

const renderer = new THREE.WebGLRenderer( { alpha: true } )
renderer.toneMapping = THREE.ReinhardToneMapping
renderer.outputEncoding = THREE.sRGBEncoding;
renderer.toneMappingExposure = 1.5
renderer.physicallyCorrectLights = true
renderer.shadowMap.enabled = true
renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

const pmremGenerator = new PMREMGenerator(renderer)
pmremGenerator.compileEquirectangularShader()

/* ORBIT CONTROLS */

// const controls = new OrbitControls(camera, renderer.domElement)

/* RESPONSIVENESS */

window.addEventListener('resize', onWindowResize, false)
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
    render()
}

/* MODEL LOADER */

const maxAnisotropy = renderer.capabilities.getMaxAnisotropy();

// new GLTFLoader().load('RESOURCES/MacBook2020_GLTF/scene.gltf', function (gltf) {
//     const model = gltf.scene

//     model.traverse(function (object: any) {
//         object.castShadow = false
//         object.receiveShadow = false
//         if ( object.isMesh === true && object.material.map !== null ) {
//             object.material.map.anisotropy = maxAnisotropy;
//         }
//     })
//     scene.add(model)
// })

var mixer: THREE.AnimationMixer
var mixerKeys: THREE.AnimationMixer
var mixerTouchbar: THREE.AnimationMixer

new RGBELoader()
    .setPath('RESOURCES/')
    .load('pink_sunrise_4k.hdr', function (texture) {
        texture.mapping = THREE.EquirectangularReflectionMapping
        scene.environment = texture
        render()

        const roughnessMidmapper = new RoughnessMipmapper(renderer)

        const loader = new GLTFLoader().setPath('RESOURCES/MBani4/')
        loader.load('Macbook Pro.gltf', function (gltf) {
            const model = gltf.scene
            gltf.scene.traverse(function (child: any) {
                if (child.isMesh) {
                    roughnessMidmapper.generateMipmaps(child.material)
                }
            })
            scene.add(model)

            mixer = new THREE.AnimationMixer(model)
            mixerKeys = new THREE.AnimationMixer(model)
            mixerTouchbar = new THREE.AnimationMixer(model)
            const gltfAnimations: THREE.AnimationClip[] = gltf.animations

            // const ani = mixer.clipAction(gltf.animations[1])

            const screenAni1 = mixer.clipAction(gltf.animations[2])
            const screenAni2 = mixer.clipAction(gltf.animations[3])
            const screenAni3 = mixer.clipAction(gltf.animations[4])
            const screenAni4 = mixer.clipAction(gltf.animations[5])
            const screenAni5 = mixer.clipAction(gltf.animations[6])
            const screenAni6 = mixer.clipAction(gltf.animations[7])
            const keysAni = mixerKeys.clipAction(gltf.animations[0])
            const touchbarAni = mixerTouchbar.clipAction(gltf.animations[1])

            console.log(gltf.animations[2])

            // console.log(gltfAnimations)
            
            screenAni1.play()
            screenAni2.play()
            screenAni3.play()
            screenAni4.play()
            screenAni5.play()
            screenAni6.play()
            keysAni.play()
            // touchbarAni.play()

            mixerKeys.setTime(0)

            mixer.setTime(1.65)
            console.log(mixer.time)
            console.log(keysAni)

            // ani.play()

            roughnessMidmapper.dispose()
            render()
            gsap.from('canvas', {
                opacity: 0,
                delay: 0,
                x: 300,
                duration: 1,
            });
        })

    })

/* SCROLL ANIMATIONS */

/* STARTPOS CAMERA */
var cameraPosX = 0.1
var cameraPosY = 0.448
var cameraPosZ = -0.015

var cameraRotX = -1.59
var cameraRotY = 0
var cameraRotZ = 3.14

var scrollPos
var snapped = false
var mixerTime: number
var mixerTimeSaved = false

let textBoxContainer = document.querySelector('.textBoxContainer')!

window.onscroll = () => {
    scrollPos = window.scrollY
    // console.log(scrollPos)
    // console.log('MixerTime: ', mixer.time)
    if (scrollPos < 996) {
        mixer.setTime(1.65 - (scrollPos / (995/1.65)))
        cameraPosX = 0.1 - (scrollPos / (995/0.1))
        cameraPosY = 0.448 - (scrollPos / (995/(0.448 - 0.06)))
        cameraPosZ = -0.015 + (scrollPos / (995/(0.4 + 0.015)))

        cameraRotX = -1.59 + (scrollPos / (995/(1.59)))
        cameraRotZ = 3.14 - (scrollPos / (995/(3.14)))

        camera.position.x = cameraPosX
        camera.position.y = cameraPosY
        camera.position.z = cameraPosZ
        camera.rotation.x = cameraRotX
        camera.rotation.y = cameraRotY
        camera.rotation.z = cameraRotZ
    }
    if (scrollPos >= 1045 && camera.rotation.z != 0 && snapped == false) {
        camera.position.x = 0
        camera.position.y = 0.06
        camera.position.z = 0.4
        camera.rotation.x = 0
        camera.rotation.y = 0
        camera.rotation.z = 0
        snapped = true
    }
    if (scrollPos >= 1045 && mixerTimeSaved == false) {
        mixerTime = mixer.time
        // console.log('Mixer Snap Time: ', mixerTime)
        mixerTimeSaved = true
    }
    if (scrollPos >= 1045 && scrollPos <= 1543) {
        mixer.setTime(0.0066331658291458595 + ((scrollPos - 1045) / (498 / (1.65 - 0.0066331658291458595))))

        cameraPosY = 0.06 + ((scrollPos - 1045) / (498 / (0.41 - 0.06)))
        cameraPosZ = 0.4 - ((scrollPos - 1045) / (498 / (0.41)))
        cameraRotX = 0 - ((scrollPos - 1045) / (498 / (1.59)))
        cameraRotZ = 0 + ((scrollPos - 1045) / (498 / (3.14)))

        camera.position.y = cameraPosY
        camera.position.z = cameraPosZ
        camera.rotation.x = cameraRotX
        camera.rotation.z = cameraRotZ

        textBoxContainer.setAttribute('style', 'top: ' + (105 + ((scrollPos - 1045) / (498 / 50))) + 'vh;')

        mixerTime = mixer.time
    }
    if (scrollPos > 1543 && scrollPos <= 2040) {
        

        mixer.setTime(mixerTime - ((scrollPos - 1543) / (497 / (1.65))))

        cameraPosY = 0.41 - ((scrollPos - 1543) / (497 / (0.19)))
        cameraPosZ = -0.009999999999999953 + ((scrollPos - 1543) / (497 / (0.00999999 + 0.15)))
        cameraRotX = -1.5900000000000003 + ((scrollPos - 1543) / (497 / (1.59 - 0.35)))
        cameraRotZ = 3.14 - ((scrollPos - 1543) / (497 / (3.14)))

        camera.position.y = cameraPosY
        camera.position.z = cameraPosZ
        camera.rotation.x = cameraRotX
        camera.rotation.z = cameraRotZ

        textBoxContainer.setAttribute('style', 'top: ' + (155 + ((scrollPos - 1543) / (497 / 50))) + 'vh;')

    }
    if (scrollPos > 2040 && scrollPos <= 3041) {
        // console.log('x: ', camera.position.x, ' y: ', camera.position.y, ' z: ', camera.position.z, ' x: ', camera.rotation.x, ' y: ', camera.rotation.y, ' z: ', camera.rotation.z, )
        console.log(scrollPos)

        mixerKeys.setTime(0 + ((scrollPos - 2040) / (1000 / (1.659))))

        cameraPosZ = 0.14549294802816903 + ((scrollPos - 2040) / (1000 / (0.267 - 0.14549294802816903)))
        cameraRotX = -0.38492957746478895 - ((scrollPos - 2040) / (1000 / (0.72 - 0.38492957746478895)))

        camera.position.z = cameraPosZ
        camera.rotation.x = cameraRotX
    }
}

// length: 1.6666
// 2040
// x:  0        y:  0.22535211267605632         z:  0.14549294802816903                         x:  -0.38492957746478895            y:  0           z:  0.08845070422535217
// x:  0        y:  0.227                       z:  0.267                                       x:  -0.6                            y:  0           z:  0


/* GUI */

const data = {
    color: hemiLight.color.getHex(),
    mapsEnabled: true,
}

const gui = new GUI({ autoPlace: false })

var customContainer = document.getElementById('guiContainer')!
customContainer.appendChild(gui.domElement);

const hemiLightSettings = gui.addFolder('HemiLight')
hemiLightSettings.addColor(data, 'color').onChange(() => {
    hemiLight.color.setHex(Number(data.color.toString().replace('#', '0x')))
})
hemiLightSettings.add(hemiLight, 'intensity', 0, 10, 0.01)

const cameraFolder = gui.addFolder('Camera')
cameraFolder.add(camera.position, 'x', -5, 5, 0.001)
cameraFolder.add(camera.position, 'y', -5, 5, 0.001)
cameraFolder.add(camera.position, 'z', -5, 5, 0.001)
cameraFolder.add(camera.rotation, 'x', -5, Math.PI * 2.0, 0.01)
cameraFolder.add(camera.rotation, 'y', -5, Math.PI * 2.0, 0.01)
cameraFolder.add(camera.rotation, 'z', -5, Math.PI * 2.0, 0.01)

/* ANIMATE */

const clock = new THREE.Clock()

function animate() {
    requestAnimationFrame(animate)

    // controls.update()

    // var delta = clock.getDelta();
  
    // if ( mixer ) mixer.update( delta );

    render()
}

/* RENDER */

function render() {
    renderer.render(scene, camera)
}
animate()

/* GSAP */

gsap.registerPlugin(ScrollTrigger);

gsap.from('.intro p', {
    opacity: 0,
    delay: 0.5,
    x: -300,
    duration: 1,
});

gsap.from('.intro h1', {
    opacity: 0,
    delay: 1,
    x: -300,
    duration: 1,
});

gsap.from('.intro button', {
    opacity: 0,
    delay: 1.5,
    x: 300,
    duration: 1,
});

let sections = gsap.utils.toArray('.horizontal')

let horizontalScroll = gsap.to(sections, {
    xPercent: -100 * (sections.length - 1),
    ease: 'none',
    scrollTrigger: {
        trigger: '.sideBySide',
        pin: true,
        scrub: 1,
        snap: 1 / (sections.length - 1),
        // end: () => "+=" + document.querySelector('.sideBySide')!.clientWidth
    }
})

gsap.from('.TBO1', {
    scrollTrigger: {
        trigger: '.textBoxContainer',
        start: 'top center',
        end: 'bottom bottom',
    },
    y: 100,
    opacity: 0,
    duration: 0.5,
    delay: 1
})


gsap.to('.TBO1', {
    scrollTrigger: {
        containerAnimation: horizontalScroll,
        trigger: '.horizontal0',
        // start: 'right center',
        end: 'right center',
        onLeave: () => {
            gsap.to('.TBO1', {
                y:-100,
                opacity: 0,
                duration: 0.5,
            })
        },
        onEnterBack: () => {
            gsap.fromTo('.TBO1', {
                y: 100,
                opacity: 0,
            }, {
                y: 0,
                opacity: 1,
                duration: 0.5
            })
        },
    },
})


gsap.from('.TBO2', {
    scrollTrigger: {
        containerAnimation: horizontalScroll,
        trigger: '.horizontal1',
        start: 'left center',
        end: 'right center',
        onEnter: () => {
            gsap.fromTo('.TBO2', {
                y: 100,
                opacity: 0,
            }, {
                y: 0,
                opacity: 1,
                duration: 0.5
            })
        },
        onLeave: () => {
            gsap.to('.TBO2', {
                y:-100,
                opacity: 0,
                duration: 0.5,
                delay: 0
            })
        },
        onEnterBack: () => {
            gsap.fromTo('.TBO2', {
                y: 100,
                opacity: 0,
            }, {
                y: 0,
                opacity: 1,
                duration: 0.5
            })
        },
        onLeaveBack: () => {
            gsap.fromTo('.TBO2', {
                y: 0,
                opacity: 1,
            }, {
                y: -100,
                opacity: 0,
                duration: 0.5
            })
        }
    },
    y: 100,
    opacity: 0,
    duration: 0.5,
    delay: 0
})

gsap.from('.TBO3', {
    scrollTrigger: {
        containerAnimation: horizontalScroll,
        trigger: '.horizontal2',
        start: 'left center',
        end: 'bottom center',
        onEnter: () => {
            gsap.fromTo('.TBO3', {
                y: 100,
                opacity: 0,
            }, {
                y: 0,
                opacity: 1,
                duration: 0.5
            })
        },
        onLeave: () => {
            gsap.to('.TBO3', {
                y:-100,
                opacity: 0,
                duration: 0.5,
                delay: 0
            })
        },
        onEnterBack: () => {
            gsap.fromTo('.TBO3', {
                y: 100,
                opacity: 0,
            }, {
                y: 0,
                opacity: 1,
                duration: 0.5
            })
        },
        onLeaveBack: () => {
            gsap.fromTo('.TBO3', {
                y: 0,
                opacity: 1,
            }, {
                y: -100,
                opacity: 0,
                duration: 0.5
            })
        }
    },
    y: 100,
    opacity: 0,
    duration: 0.5,
    delay: 0
})

let scrollBtn = document.querySelector('.scrollBtn')!
