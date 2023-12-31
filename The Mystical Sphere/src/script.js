import './style.css'
import * as THREE from 'three'

// Texture Loader
const textureLoader = new THREE.TextureLoader()

const normalTexture = textureLoader.load('/Textures/NormalMap.png')

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Objects
const geometry = new THREE.SphereGeometry(.6, 64, 64);

// Materials
const material = new THREE.MeshStandardMaterial()

material.metalness = 0.7
material.roughness = 0.2
material.normalMap = normalTexture

material.color = new THREE.Color(0x292929)


// Mesh
const sphere = new THREE.Mesh(geometry,material)
scene.add(sphere)

// Lights
const pointLight = new THREE.PointLight(0xffffff, 0.1)
pointLight.position.x = 2
pointLight.position.y = 3
pointLight.position.z = 4
scene.add(pointLight)

// Light 2
const pointLight2 = new THREE.PointLight(0xEF0107, 2)
pointLight2.position.set(-1.86, 1, -0.65)
pointLight2.intensity = 10
scene.add(pointLight2)

// Light 3
const pointLight3 = new THREE.PointLight(0xe1ff, 2)
pointLight3.position.set(2.5, -3, -1.98)
pointLight3.intensity = 6.7
scene.add(pointLight3)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 0
camera.position.y = 0
camera.position.z = 2
scene.add(camera)

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
document.addEventListener('mousemove', onDocumentMouseMove)

let mouseX = 0
let mouseY = 0

let targetX = 0
let targetY = 0

const windowHalfX = window.innerWidth / 2;
const windowHalfY = window.innerHeight / 2;

function onDocumentMouseMove(event){
    mouseX = (event.clientX - windowHalfX)
    mouseY = (event.clientY - windowHalfY)
}

const updateSphere = (event) => {
    const maxZ = 0.8;

    const calculatedZ = window.scrollY * 0.01;
    if (calculatedZ > maxZ) {
        sphere.position.z = maxZ;
    } else {
        sphere.position.z = calculatedZ;
    }
}


window.addEventListener('scroll', updateSphere)

const clock = new THREE.Clock()

const tick = () =>
{

    targetX = mouseX *  0.01
    targetY = mouseY *  0.01

    const elapsedTime = clock.getElapsedTime()

    // Update objects
    sphere.rotation.y = .5 * elapsedTime

    sphere.rotation.y += .5 * (targetX - sphere.rotation.y)
    sphere.rotation.x += .05 * (targetY - sphere.rotation.x)

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()