import {
    log
} from 'console'
import * as THREE from 'three'
import {
    OrbitControls
} from 'three/examples/jsm/controls/OrbitControls'
import {
    TWEEN
} from 'three/examples/jsm/libs/tween.module.min'
import {
    TransformControls
} from 'three/examples/jsm/controls/TransformControls'
import {
    GLTFLoader
} from 'three/examples/jsm/loaders/GLTFLoader'
import {
    GUI
} from 'dat.gui'
const scene = new THREE.Scene()
let rotateModels = true;
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
camera.position.z = 2

const renderer = new THREE.WebGLRenderer({
    alpha: true
})
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

const controls = new OrbitControls(camera, renderer.domElement)
controls.minAzimuthAngle = -Math.PI / 4
controls.maxAzimuthAngle = Math.PI / 4
controls.maxPolarAngle = Math.PI / 1.5
// controls.enableZoom = false
// controls.enableRotate = false

const ambientLight = new THREE.AmbientLight(0xffffff, 1)
ambientLight.castShadow = true
scene.add(ambientLight)
const light = new THREE.PointLight(0xffffff, 1);
light.position.set(0, 10, 4);
light.castShadow = true; // default false
scene.add(light);

const light2 = new THREE.PointLight(0xffffff, 1);
light2.position.set(0, 20, 4);
light2.castShadow = true; // default false
scene.add(light2);
// const guilight = new GUI()
// const lightFolder = guilight.addFolder('Lights macbook')
// lightFolder.add(light2.position, 'x', 0, 40, 0.1)
// lightFolder.add(light2.position, 'y', 0, 100, 0.1)
// lightFolder.add(light2.position, 'z', -100, 100, 0.1)
// lightFolder.open()
//Set up shadow properties for the light
// light.shadow.mapSize.width = 512; // default
// light.shadow.mapSize.height = 512; // default
light.shadow.camera.near = 0.1; // default
light.shadow.camera.far = 25; // default
const boxGeometry = new THREE.BoxGeometry()
const sphereGeometry = new THREE.SphereGeometry()
const planeGeometry = new THREE.PlaneGeometry(1000, 1000, 1, 1)
const cubeMaterial = new THREE.MeshStandardMaterial({
    // color: 0x00ff00,
    transparent: true,
    wireframe: false
})
const sphereMaterial = new THREE.MeshStandardMaterial({
    // color: 0x00ff00,
    transparent: true,
    wireframe: false
})
const floorMaterial = new THREE.MeshBasicMaterial({
    color: 0x242424,
    transparent: true
})
let headphones: any
const loader = new GLTFLoader()
loader.load(
    'models/headphone/scene.gltf',
    function (gltf) {
        headphones = gltf
        gltf.scene.traverse(function (child) {
            //         // if ((child as THREE.Mesh).isMesh) {
            //         //     const m = child as THREE.Mesh
            //         //     m.receiveShadow = true
            //         //     m.castShadow = true
            //         //     // m.transparent = true
            //         // }
            //         // if ((child as THREE.Light).isLight) {
            //         //     const l = child as THREE.Light
            //         //     l.castShadow = true
            //         //     l.shadow.bias = -0.003
            //         //     l.shadow.mapSize.width = 2048
            //         //     l.shadow.mapSize.height = 2048
            //         // }
            if (
                child instanceof THREE.Mesh &&
                child.material instanceof THREE.MeshStandardMaterial
            ) {
                //   scene.add(child);
                child.material.format = THREE.RGBAFormat
                child.material.opacity = 1;
                child.material.transparent = true
            }
        })
        gltf.scene.scale.set(.007, .007, .007)
        // const gui = new GUI()
        // const cubeFolder = gui.addFolder('Headphones')
        // cubeFolder.add(gltf.scene.rotation, 'x', 0, Math.PI * 2)
        // cubeFolder.add(gltf.scene.rotation, 'y', 0, Math.PI * 2)
        // cubeFolder.add(gltf.scene.rotation, 'z', 0, Math.PI * 2)
        // cubeFolder.add(gltf.scene.scale, 'x', 0, 0.1, 0.001)

        // cubeFolder.open()
        scene.add(gltf.scene)
    },
    (xhr) => {
        console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
    },
    (error) => {
        console.log(error)
    }
)

let macbookModel: any
loader.load(
    'models/macbook/scene.gltf',
    function (gltf) {
        macbookModel = gltf
        gltf.scene.traverse(function (child) {
            // if ((child as THREE.Mesh).isMesh) {
            //     const m = child as THREE.Mesh
            //     m.receiveShadow = true
            //     m.castShadow = true
            // }
            // if ((child as THREE.Light).isLight) {
            //     const l = child as THREE.Light
            //     l.castShadow = true
            //     l.shadow.bias = -0.003
            //     l.shadow.mapSize.width = 2048
            //     l.shadow.mapSize.height = 2048
            // }
            if (
                child instanceof THREE.Mesh &&
                child.material instanceof THREE.MeshStandardMaterial
            ) {
                //   scene.add(child);
                child.material.format = THREE.RGBAFormat
                child.material.opacity = 0;
                child.material.transparent = true
            }
        })
        gltf.scene.scale.set(8, 8, 8)
        // gltf.scene.opacity = 0
        gltf.scene.position.set(cameraPositions[1].x, cameraPositions[1].y-.5 , 0)
        gltf.scene.rotation.x = .5
        // const gui = new GUI()
        // const cubeFolder = gui.addFolder('MAcbook rotation')
        // cubeFolder.add(gltf.scene.rotation, 'x', 0, Math.PI * 2)
        // cubeFolder.add(gltf.scene.rotation, 'y', 0, Math.PI * 2)
        // cubeFolder.add(gltf.scene.rotation, 'z', 0, Math.PI * 2)
        // cubeFolder.add(gltf.scene.scale, 'x', 0, 10, 0.001)
        // const translateFolder = gui.addFolder('MAcbook translation')
        // translateFolder.add(gltf.scene.position, 'x', 0, 10, 0.001)
        // translateFolder.add(gltf.scene.position, 'y', 0, 10, 0.001)
        // translateFolder.add(gltf.scene.position, 'z', 0, 10, 0.001)
        // translateFolder.open()
        // cubeFolder.open()
        scene.add(gltf.scene)
    },
    (xhr) => {
        console.log((xhr.loaded / xhr.total) * 100 + '% loaded macbook')
    },
    (error) => {
        console.log(error)
    }
)

let phoneModel: any
loader.load(
    'models/phone/scene.gltf',
    function (gltf) {
        phoneModel = gltf
        gltf.scene.traverse(function (child) {
            //         // if ((child as THREE.Mesh).isMesh) {
            //         //     const m = child as THREE.Mesh
            //         //     m.receiveShadow = true
            //         //     m.castShadow = true
            //         // }
            //         // if ((child as THREE.Light).isLight) {
            //         //     const l = child as THREE.Light
            //         //     l.castShadow = true
            //         //     l.shadow.bias = -0.003
            //         //     l.shadow.mapSize.width = 2048
            //         //     l.shadow.mapSize.height = 2048
            //         // }
            if (
                child instanceof THREE.Mesh &&
                child.material instanceof THREE.MeshStandardMaterial
            ) {
                //   scene.add(child);
                child.material.format = THREE.RGBAFormat
                child.material.opacity = 0;
                child.material.transparent = true
            }
        })
        gltf.scene.scale.set(.8, .8, .8)
        // gltf.scene.opacity = 0
        gltf.scene.position.set(cameraPositions[2].x, cameraPositions[2].y, 0)
        // const gui = new GUI()
        // const cubeFolder = gui.addFolder('phone rotation')
        // cubeFolder.add(gltf.scene.rotation, 'x', 0, Math.PI * 2)
        // cubeFolder.add(gltf.scene.rotation, 'y', 0, Math.PI * 2)
        // cubeFolder.add(gltf.scene.rotation, 'z', 0, Math.PI * 2)
        // cubeFolder.add(gltf.scene.scale, 'x', 0, 10, 0.001)
        // const translateFolder = gui.addFolder('phone translation')
        // translateFolder.add(gltf.scene.position, 'x', 0, 10, 0.001)
        // translateFolder.add(gltf.scene.position, 'y', 0, 10, 0.001)
        // translateFolder.add(gltf.scene.position, 'z', 0, 10, 0.001)
        // translateFolder.open()
        // cubeFolder.open()
        scene.add(gltf.scene)
    },
    (xhr) => {
        console.log((xhr.loaded / xhr.total) * 100 + '% loaded phone')
    },
    (error) => {
        console.log(error)
    }
)


const cube = new THREE.Mesh(boxGeometry, cubeMaterial)
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial)
sphere.castShadow = true; //default is false
sphere.receiveShadow = false; //default
const floor = new THREE.Mesh(planeGeometry, floorMaterial)
floor.receiveShadow = true;
floor.material.side = THREE.DoubleSide;
floor.rotation.x = 90;
floor.position.y = -1
// scene.add(cube)
// scene.add(sphere)

// const transformControls = new TransformControls(camera, renderer.domElement)
// transformControls.attach(cube)
// transformControls.setMode('rotate')
// scene.add(transformControls)
// console.log(transformControls);

// transformControls.addEventListener('dragging-changed', function (event) {
//     controls.enabled = !event.value
//     //dragControls.enabled = !event.value
// })
// floor.scale.x = 1

// scene.add(floor)
sphere.position.x = 5
sphere.position.y = 1
// sphere.material.opacity = 0

window.addEventListener('resize', onWindowResize, false)
// window.addEventListener('wheel', onMouseWheel)

// const gui = new GUI()
// const cubeFolder = gui.addFolder('Cube')
// cubeFolder.add(cube.rotation, 'x', 0, Math.PI * 2)
// cubeFolder.add(cube.rotation, 'y', 0, Math.PI * 2)
// cubeFolder.add(cube.rotation, 'z', 0, Math.PI * 2)
// cubeFolder.open()
// const cameraFolder = gui.addFolder('Camera')
// cameraFolder.add(camera.position, 'z', 0, 10)
// cameraFolder.add(camera.position, 'x', 0, 10)
// cameraFolder.add(camera.position, 'y', 0, 10)
// cameraFolder.open()
// const controlsFolder = gui.addFolder('Controls')
// controlsFolder.add(controls.target, 'x', -10, 10)
// controlsFolder.open()


function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
    render()
}
const nextButton = document.getElementById('next-button');
const previousButton = document.getElementById('previous-button');
let positionCounter = 0
let cameraPositions = [{
        x: 0,
        y: 0,
        z: 2
    },
    {
        x: 10,
        y: 7,
        z: 3
    },
    {
        x: 25,
        y: 15,
        z: 5
    },
]
nextButton!.addEventListener('click', onNextClick)
previousButton!.addEventListener('click', onPreviousClick)

function onNextClick() {
    console.log('next');
    // if(animating) return;
    // animating = true
    positionCounter++;
    let productIndex = ((positionCounter % cameraPositions.length) + cameraPositions.length) % cameraPositions.length
    hideAndShowProducts(productIndex)
    moveCamera(cameraPositions[productIndex])
    //show and hide information
    for (let index = 0; index < cameraPositions.length; index++) {
        let product = document.getElementById('product'+index)
        product!.hidden = !(index == productIndex)
    }
}

function onPreviousClick() {
    console.log('previous');
    // if(animating) return;
    // animating = true
    positionCounter--;
    let productIndex = ((positionCounter % cameraPositions.length) + cameraPositions.length) % cameraPositions.length //deze modulo loop kan ook de andere kant op
    console.log(productIndex)
    hideAndShowProducts(productIndex)
    moveCamera(cameraPositions[productIndex])
}

// let animating = false;
function moveCamera(cameraPosition: any) {
    let c = cameraPosition;
    console.log(c);

    // controls.target.set(c.x, c.y, c.z)
    //  new TWEEN.Tween(controls.target)
    //         .to({
    //             x: c.x,
    //             y: c.y,
    //             z: c.z
    //         }, 500)
    //         //.delay (1000)
    //         .easing(TWEEN.Easing.Cubic.Out)
    //         // .onUpdate(() => render())
    //         .start()
    // .onComplete(() => {
    //     animating = false;
    //     controls.update()
    // })
    new TWEEN.Tween(controls.target)
        .to({
            x: c.x,
            y: c.y,
            z: 0 // hiermee roteert ie met orbitcontrols om het geselecteerde object heen
        }, 500)
        //.delay (1000)
        .easing(TWEEN.Easing.Cubic.Out)
        // .onUpdate(() => render())
        .start()

    new TWEEN.Tween(camera.position)
        .to({
            x: c.x,
            y: c.y,
            z: c.z
        }, 500)
        //.delay (1000)
        .easing(TWEEN.Easing.Cubic.Out)
        // .onUpdate(() => render())
        .start()


}

function hideAndShowProducts(index: number) {
    console.log(index)
    console.log(headphones.scene.traverse((child: any) => {
        console.log(child)
    }))
    // headphones.scene.visible = false
    // new TWEEN.Tween(headphones.scene.traverse((child:any)=>{

    // }))
    //         .to({
    //             // visible: false //0 is index van eerste object
    //             // opacity: Number(0 == index) //0 is index van eerste object
    //             // opacity: 0



    //         }, 500)
    //          .easing(TWEEN.Easing.Cubic.Out)
    //         // .onUpdate(() => render())
    //         .start()
    headphones.scene.traverse(function (child: any) {

        // child.material.opacity = 0
        if (
            child instanceof THREE.Mesh &&
            child.material instanceof THREE.MeshStandardMaterial
        ) {
            //   scene.add(child);
            // child.material.format = THREE.RGBAFormat
            // child.material.opacity = 1;
            // child.material.transparent = true
            new TWEEN.Tween(child.material)
                .to({
                    // format: THREE.RGBAFormat,
                    // transparent: true,
                    // opacity: 0
                    opacity: Number(0 == index)
                }, 500)
                .easing(TWEEN.Easing.Cubic.Out)
                // .onUpdate(() => render())
                .start()
        }
        // cube.material.opacity = Number(0 == index)
        // sphere.material.opacity = Number(1 == index)
    })
    macbookModel.scene.traverse(function (child: any) {

        // child.material.opacity = 0
        if (
            child instanceof THREE.Mesh &&
            child.material instanceof THREE.MeshStandardMaterial
        ) {
            //   scene.add(child);
            // child.material.format = THREE.RGBAFormat
            // child.material.opacity = 1;
            // child.material.transparent = true
            new TWEEN.Tween(child.material)
                .to({
                    // format: THREE.RGBAFormat,
                    // transparent: true,
                    // opacity: 0
                    opacity: Number(1 == index)
                }, 500)
                .easing(TWEEN.Easing.Cubic.Out)
                // .onUpdate(() => render())
                .start()
        }
        // cube.material.opacity = Number(0 == index)
        // sphere.material.opacity = Number(1 == index)
    })
    phoneModel.scene.traverse(function (child: any) {

        // child.material.opacity = 0
        if (
            child instanceof THREE.Mesh &&
            child.material instanceof THREE.MeshStandardMaterial
        ) {
            //   scene.add(child);
            // child.material.format = THREE.RGBAFormat
            // child.material.opacity = 1;
            // child.material.transparent = true
            new TWEEN.Tween(child.material)
                .to({
                    // format: THREE.RGBAFormat,
                    // transparent: true,
                    // opacity: 0
                    opacity: Number(2 == index)
                }, 500)
                .easing(TWEEN.Easing.Cubic.Out)
                // .onUpdate(() => render())
                .start()
        }
        // cube.material.opacity = Number(0 == index)
        // sphere.material.opacity = Number(1 == index)
    })

    // 
    // function onMouseWheel(event: MouseEvent) {
    //     console.log(event);
    //     if(window.pageYOffset > 100 && window.pageYOffset < 300){
    //         // camera.position.x = 5
    //         if(animating) return;
    //         animating = true
    //         new TWEEN.Tween(controls.target)
    //             .to({
    //                 x: 5,
    //                 y: 1,
    //                 z: 5
    //             }, 500)
    //             //.delay (1000)
    //             .easing(TWEEN.Easing.Cubic.Out)
    //             //.onUpdate(() => render())
    //             .start()
    //             .onComplete(() => {
    //                 animating = false;
    //             })
    //     }
    //     else if(window.pageYOffset < 100){
    //         if(animating) return;
    //         animating = true
    //         new TWEEN.Tween(controls.target)
    //             .to({
    //                 x: 0,
    //                 y: 0,
    //                 z: 2
    //             }, 500)
    //             //.delay (1000)
    //             .easing(TWEEN.Easing.Cubic.Out)
    //             //.onUpdate(() => render())
    //             .start()
    //              .onComplete(() => {
    //                 animating = false;
    //             })
    //     }
    // }
}

function onRotateModelsButtonClick() {
    rotateModels = !rotateModels
    if (rotateModels) {
        document.getElementById('disablerotation') !.style.display = 'block';
        document.getElementById('enablerotation') !.style.display = 'none';
    } else {
        document.getElementById('disablerotation') !.style.display = 'none';
        document.getElementById('enablerotation') !.style.display = 'block';
    }
}

document.getElementById('disablerotation') !.addEventListener('click', onRotateModelsButtonClick)
document.getElementById('enablerotation') !.addEventListener('click', onRotateModelsButtonClick)
document.getElementById('enablerotation') !.style.display = 'none';

function animate() {
    requestAnimationFrame(animate)
    // cube.material.opacity = Number(0 == positionCounter % cameraPositions.length)
    // sphere.material.opacity = Number(1 == positionCounter % cameraPositions.length)
    // cube.rotation.x += 0.01
    if (rotateModels) {
        if (headphones) {
            headphones.scene.rotation.y -= 0.01
        }
        if (phoneModel) {
            phoneModel.scene.rotation.y -= 0.01
        }
        if (macbookModel) {
            macbookModel.scene.rotation.y -= 0.01
        }
    }
    TWEEN.update()
    controls.update()

    render()
}

function render() {
    renderer.render(scene, camera)
}
animate()
// render()