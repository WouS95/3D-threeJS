import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import SimplexNoise from 'simplex-noise'
// const {SimplexNoise} = require('simplex-noise');


// ----------------------------------------------------------------
// HERO

const simplex = new SimplexNoise();


// Scene
const hero = new THREE.Scene()
hero.background = new THREE.Color(0xffffff)

// Camera
const heroCamera = new THREE.PerspectiveCamera(75, 1280 / 800, 0.1, 1000)
heroCamera.position.z = 4

// Lights
hero.add(new THREE.AmbientLight(0xffffff, 0.25));
const heroLight = new THREE.DirectionalLight(0xffffff, 1.0)

const r = 30;
const y = 10;

// const light1 = new THREE.PointLight(0xffffff, 5, 20);
// light1.position.set(0, y, r);
// hero.add(light1);
// const light2 = new THREE.PointLight(0xffffff, 5, 20);
// light2.position.set(0, -y, -r);
// hero.add(light2);
// const light3 = new THREE.PointLight(0xffffff, 5, 20);
// light3.position.set(r, y, 0);
// hero.add(light3);
// const light4 = new THREE.PointLight(0xffffff, 5, 20);
// light4.position.set(-r, y, 0);
// hero.add(light4);

// Renderer
const canvas = document.getElementById("heroVisual") as HTMLCanvasElement
const renderer = new THREE.WebGLRenderer({canvas:canvas, antialias: true})
renderer.setSize(1280, 800)
// document.body.appendChild(renderer.domElement)

new OrbitControls(heroCamera, renderer.domElement)


// 3D stuff
const heroPlane = new THREE.PlaneBufferGeometry(50, 30, 300, 300);
let mat = new THREE.MeshStandardMaterial({ color: 0x808080, roughness: 0.5, metalness: 0.2 });

const plane = new THREE.Mesh(heroPlane, mat);

// const plane = new THREE.Mesh(heroPlane, new THREE.MeshPhongMaterial({ color: 0xffffff }));
plane.material.side = THREE.DoubleSide;
plane.receiveShadow = true;
plane.castShadow = true;
plane.rotation.x = - Math.PI / 1.7;
plane.position.y = -3
// plane.rotation.y = - Math.PI / 1;

hero.add(plane);

// plane.position.z = - 30;
hero.add(plane);
hero.add(heroLight);


// HERO
//-----------------------------------------------------------------

// window.addEventListener('resize', onWindowResize, false)
// function onWindowResize() {
//     camera1.aspect = window.innerWidth / window.innerHeight
//     camera1.updateProjectionMatrix()
//     renderer.setSize(window.innerWidth, window.innerHeight)
//     render()
// }

const count: number = heroPlane.attributes.position.count;


function animate() {
    requestAnimationFrame(animate)
    // animatePlane()

    // plane.rotation.x += 0.05
    // plane.rotation.y += 0.05

    // controls.update()
        // SINE WAVE
        // const now = Date.now() / 1000;
 
    render()
}

function getRandomInt(max: number) {
    return Math.floor(Math.random() * max)
}

console.log(plane.geometry.attributes.position.array[4])

// function logArray (){
//     for (let i = 0; i < plane.geometry.attributes.position.array.length; i++) {
//         console.log( plane.geometry.attributes.position.array[i])
//     }
// }

// logArray()


function render() {
    renderer.render(hero, heroCamera)
}

let gArray = plane.geometry.attributes.position.array;


function animatePlane() {
    let xyCoef =  50
    let zCoef  =  10
    let mouse = new THREE.Vector2();

    // console.log(gArray)
    // console.log(gArray[6+2])
    // console.log(plane.geometry.attributes.position.array)
    const time = Date.now() * 0.0002;
    for (let i = 0; i < gArray.length; i += 3) {
        plane.geometry.attributes.position.array[i] = simplex.noise4D(gArray[i] / xyCoef, gArray[i + 1] / xyCoef, time, mouse.x + mouse.y) * zCoef;
        // gArray[i] = simplex.noise4D(gArray[i] / xyCoef, gArray[i + 1] / xyCoef, time, mouse.x + mouse.y) * zCoef;
    }
    plane.geometry.attributes.position.needsUpdate = true;
    plane.geometry.computeBoundingSphere();
}

animate()
animatePlane()
