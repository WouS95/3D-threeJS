import * as THREE from 'three'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GUI } from 'three/examples/jsm/libs/dat.gui.module'
import { GLTF, GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader'
import { RoughnessMipmapper } from 'three/examples/jsm/utils/RoughnessMipmapper'
import { PMREMGenerator } from 'three'

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

const renderer = new THREE.WebGLRenderer({ alpha: true })
renderer.toneMapping = THREE.ReinhardToneMapping
renderer.outputEncoding = THREE.sRGBEncoding;
renderer.toneMappingExposure = 1.5
renderer.physicallyCorrectLights = true
renderer.shadowMap.enabled = true
renderer.setPixelRatio(window.devicePixelRatio);
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

var mixer: THREE.AnimationMixer
var mixerKeys: THREE.AnimationMixer
var mixerTouchbar: THREE.AnimationMixer
var macbook: any

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

            macbook = gltf.scene

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

            const screenAni1 = mixer.clipAction(gltf.animations[2])
            const screenAni2 = mixer.clipAction(gltf.animations[3])
            const screenAni3 = mixer.clipAction(gltf.animations[4])
            const screenAni4 = mixer.clipAction(gltf.animations[5])
            const screenAni5 = mixer.clipAction(gltf.animations[6])
            const screenAni6 = mixer.clipAction(gltf.animations[7])
            const keysAni = mixerKeys.clipAction(gltf.animations[0])
            const touchbarAni = mixerTouchbar.clipAction(gltf.animations[1])

            console.log(gltf.animations[2])

            screenAni1.play()
            screenAni2.play()
            screenAni3.play()
            screenAni4.play()
            screenAni5.play()
            screenAni6.play()
            keysAni.play()
            touchbarAni.play()

            mixerKeys.setTime(0)
            mixerTouchbar.setTime(0)

            mixer.setTime(1.65)
            console.log(mixer.time)
            console.log(keysAni)

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

/* SCROLL ANIMATIONS */

window.onscroll = () => {
    scrollPos = window.scrollY
    // console.log(scrollPos)
    // console.log('MixerTime: ', mixer.time)
    if (scrollPos < 1088) {
        mixer.setTime(1.65 - (scrollPos / (1087 / 1.65)))
        cameraPosX = 0.1 - (scrollPos / (1087 / 0.1))
        cameraPosY = 0.448 - (scrollPos / (1087 / (0.448 - 0.06)))
        cameraPosZ = -0.015 + (scrollPos / (1087 / (0.4 + 0.015)))

        cameraRotX = -1.59 + (scrollPos / (1087 / (1.59)))
        cameraRotZ = 3.14 - (scrollPos / (1087 / (3.14)))

        camera.position.x = cameraPosX
        camera.position.y = cameraPosY
        camera.position.z = cameraPosZ
        camera.rotation.x = cameraRotX
        camera.rotation.y = cameraRotY
        camera.rotation.z = cameraRotZ
    }
    if (scrollPos >= 1087 && camera.rotation.z != 0 && snapped == false) {
        camera.position.x = 0
        camera.position.y = 0.06
        camera.position.z = 0.4
        camera.rotation.x = 0
        camera.rotation.y = 0
        camera.rotation.z = 0
        snapped = true
    }

    if (scrollPos >= 1087 && mixerTimeSaved == false) {
        mixerTime = mixer.time
        mixerTimeSaved = true
    }

    if (scrollPos >= 1087 && scrollPos <= 1605) {
        mixer.setTime(0.0066331658291458595 + ((scrollPos - 1087) / (518 / (1.65 - 0.0066331658291458595))))

        cameraPosY = 0.06 + ((scrollPos - 1087) / (518 / (0.41 - 0.06)))
        cameraPosZ = 0.4 - ((scrollPos - 1087) / (518 / (0.41)))
        cameraRotX = 0 - ((scrollPos - 1087) / (518 / (1.59)))
        cameraRotZ = 0 + ((scrollPos - 1087) / (518 / (3.14)))

        camera.position.y = cameraPosY
        camera.position.z = cameraPosZ
        camera.rotation.x = cameraRotX
        camera.rotation.z = cameraRotZ

        textBoxContainer.setAttribute('style', 'top: ' + (105 + ((scrollPos - 1087) / (518 / 50))) + 'vh;')

        mixerTime = mixer.time
    }
    if (scrollPos > 1605 && scrollPos <= 2122) {
        mixer.setTime(mixerTime - ((scrollPos - 1605) / (517 / (1.65))))

        cameraPosY = 0.41 - ((scrollPos - 1605) / (517 / (0.19)))
        cameraPosZ = -0.009999999999999953 + ((scrollPos - 1605) / (517 / (0.00999999 + 0.15)))
        cameraRotX = -1.5900000000000003 + ((scrollPos - 1605) / (517 / (1.59 - 0.35)))
        cameraRotZ = 3.14 - ((scrollPos - 1605) / (517 / (3.14)))

        camera.position.y = cameraPosY
        camera.position.z = cameraPosZ
        camera.rotation.x = cameraRotX
        camera.rotation.z = cameraRotZ

        textBoxContainer.setAttribute('style', 'top: ' + (155 + ((scrollPos - 1605) / (517 / 50))) + 'vh;')

    }

    if (scrollPos > 2122 && scrollPos <= 3155) {

        mixerKeys.setTime(0 + ((scrollPos - 2122) / (1033 / (1.659))))


        cameraPosX = 0 + ((scrollPos - 2122) / (1033 / (0.227)))
        cameraPosY = 0.22535211267605632 - ((scrollPos - 2122) / (1033 / (0.22535211267605632 - 0.18)))
        cameraPosZ = 0.14549294802816903 + ((scrollPos - 2122) / (1033 / (0.117 - 0.14549294802816903)))

        cameraRotX = -0.38492957746478895 - ((scrollPos - 2122) / (1033 / (0.97 - 0.38492957746478895)))
        cameraRotY = 0 + ((scrollPos - 2122) / (1033 / (1.02)))
        cameraRotZ = 0.08845070422535217 + ((scrollPos - 2122) / (1033 / (0.28 - 0.08845070422535217)))


        camera.position.x = cameraPosX
        camera.position.y = cameraPosY
        camera.position.z = cameraPosZ
        camera.rotation.x = cameraRotX
        camera.rotation.y = cameraRotY
        camera.rotation.z = cameraRotZ
    }

    if (scrollPos > 3155 && scrollPos <= 4192) {

        mixerKeys.setTime(1.659 - ((scrollPos - 3155) / (1037 / (1.659))))
        mixerTouchbar.setTime(0 + ((scrollPos - 2122) / (1037 / (1.65))))

        cameraPosX = 0.227 - ((scrollPos - 3155) / (1037 / (0.267)))
        cameraPosY = 0.18 + ((scrollPos - 3155) / (1037 / (0.227 - 0.18)))
        cameraPosZ = 0.117 + ((scrollPos - 3155) / (1037 / (0.227 - 0.117)))

        cameraRotX = -0.97 + ((scrollPos - 3155) / (1037 / (0.97 - 0.6)))
        cameraRotY = 1.02 - ((scrollPos - 3155) / (1037 / (1.02 + 0.35)))
        cameraRotZ = 0.28 - ((scrollPos - 3155) / (1037 / (0.28)))


        camera.position.x = cameraPosX
        camera.position.y = cameraPosY
        camera.position.z = cameraPosZ
        camera.rotation.x = cameraRotX
        camera.rotation.y = cameraRotY
        camera.rotation.z = cameraRotZ
    }

    if (scrollPos < 3294 && mixerTouchbar.time != 0) {
        mixerTouchbar.setTime(0)
    }

    if (scrollPos > 4192 && scrollPos <= 4692) {

        mixerTouchbar.setTime(1.659 - ((scrollPos - 2122) / (500 / (1.659))))

        cameraPosX = -0.04 + ((scrollPos - 4192) / (500 / (0.04)))
        cameraPosY = 0.227 - ((scrollPos - 4192) / (500 / (0.227 - 0.02)))
        cameraPosZ = 0.227 + ((scrollPos - 4192) / (500 / (0.337 - 0.227)))

        cameraRotX = -0.6 + ((scrollPos - 4192) / (500 / (0.6)))
        cameraRotY = -0.35 + ((scrollPos - 4192) / (500 / (0.35)))


        camera.position.x = cameraPosX
        camera.position.y = cameraPosY
        camera.position.z = cameraPosZ
        camera.rotation.x = cameraRotX
        camera.rotation.y = cameraRotY
    }

    if (scrollPos > 4630 && mixerTouchbar.time != 0) {
        mixerTouchbar.setTime(0)
    }

    if (scrollPos > 4192 && scrollPos <= 6264) {
        mixer.setTime(0 + ((scrollPos - 4192) / (2072 / (1.65))))

        if (macbook) {
            var rotation = 0 + ((scrollPos - 4192) / (2072 / 6.28))
            macbook.rotation.y = rotation
        }
    }
    if (scrollPos >= 6260) {
        if (macbook) {
            macbook.rotation.y = 0
        }
    }
}

// length: 1.6666
// 2040
// 4192       3123
// x:  0        y:  0.22535211267605632         z:  0.14549294802816903                         x:  -0.38492957746478895            y:  0           z:  0.08845070422535217
// x:  0        y:  0.227                       z:  0.267                                       x:  -0.6                            y:  0           z:  0

// x: 0.227     y: 0.18                         z: 0.117                                        x: -0.97                            y: 1.02         z: 0.28
// x: -0.04     y: 0.227                        z: 0.227                                        x: -0.6                             y: -0.35        z: 0

// x: 0         y: 0.02                         z: 0.337                                        0 0 0

// 6264


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

gsap.from('.KBS1 .textBox', {
    scrollTrigger: {
        trigger: '.KBS1 .textBox p',
        start: 'center+=800 center',
    },
    opacity: 0,
    delay: 0.5,
    x: -300,
    duration: 1,
});

gsap.from('.KBS2 .textBox', {
    scrollTrigger: {
        trigger: '.KBS2 .textBox p',
        start: 'center+=800 center',
    },
    opacity: 0,
    delay: 0.5,
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
        end: 'right center',
        onLeave: () => {
            gsap.to('.TBO1', {
                y: -100,
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
                y: -100,
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
                y: -100,
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

