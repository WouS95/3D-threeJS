import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'



// ----------------------------------------------------------------
// HERO

// Scene
const hero = new THREE.Scene()
hero.background = new THREE.Color(0)

// Camera
const heroCamera = new THREE.PerspectiveCamera(75, 1280 / 800, 0.1, 1000)
heroCamera.position.z = 4

// Lights
hero.add(new THREE.AmbientLight(0xffffff, 0.25));
const heroLight = new THREE.DirectionalLight(0xffff00, 1.0)

// Renderer
const canvas = document.getElementById("heroVisual") as HTMLCanvasElement
const renderer = new THREE.WebGLRenderer({canvas:canvas, antialias: true})
renderer.setSize(1280, 800)
// document.body.appendChild(renderer.domElement)

new OrbitControls(heroCamera, renderer.domElement)


// 3D stuff
const heroPlane = new THREE.PlaneBufferGeometry(50, 30, 300, 300);

const plane = new THREE.Mesh(heroPlane, new THREE.MeshPhongMaterial({ color: 0xffffff }));
plane.material.side = THREE.DoubleSide;
plane.receiveShadow = true;
plane.castShadow = true;
plane.rotation.x = - Math.PI / 1.7;
plane.position.y = -3
// plane.rotation.y = - Math.PI / 1;


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

    // plane.rotation.x += 0.05
    // plane.rotation.y += 0.05

    // controls.update()
        // SINE WAVE
        // const now = Date.now() / 1000;
        const now = Date.now() / 1000;
        for (let i = 0; i < count; i++) {
            const x = heroPlane.attributes.position.getX(i);
            const y = heroPlane.attributes.position.getY(i);

            // SINE WAVE
            const xangle = x + now
            const yangle = y + now
            // const xangle = getRandomInt(2)

            const xsin = Math.sin(xangle)
            const ycos = Math.cos(yangle + 5)
            heroPlane.attributes.position.setZ(i, xsin + ycos);
        }
        heroPlane.computeVertexNormals();
        heroPlane.attributes.position.needsUpdate = true;


    render()
}

function getRandomInt(max: number) {
    return Math.floor(Math.random() * max)
}

function render() {
    renderer.render(hero, heroCamera)
}
animate()
