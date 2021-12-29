//  ANCHOR Imports
import * as THREE from 'three'
import { Color } from 'three';
import { DoubleSide } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import fragment from "./shaders/fragment.glsl";
import vertex from "./shaders/vertex.glsl";
// import './style.scss';

//Base Canvas
const canvas = document.getElementById('webgl')

//Scene
const scene = new THREE.Scene()

//Renderer
let width = window.innerWidth
let height = window.innerHeight
const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
    canvas: canvas
})
renderer.setSize(width, height)
renderer.setClearColor(0xffffee, 1)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

// NOTE add encoding to both input texture and render output for best texture lighting 
// bakedTexture.encoding = THREE.sRGBEncoding
// renderer.outputEncoding = THREE.sRGBEncoding


//  // 300 is camera.position.z
// precalculated FoV is (2 * Math.atan((height / 2) / 100) * (180 / Math.PI))
//Camera
const camera = new THREE.PerspectiveCamera(
    (2 * Math.atan((height / 2) / 300) * (180 / Math.PI)),
    width / height,
    0.1,
    500
)
camera.position.set(0, 0, 300)
console.log(camera.fov);
camera.lookAt(scene)
scene.add(camera)

//Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
controls.update()

//animation variables
// NOTE Declareing global variables here
const clock = new THREE.Clock()
let time = 0
let mouse = { x:0, y:0, z:1 }
window.addEventListener('mousemove', (event) => {
    mouse.x = event.clientX / width - 0.5
    mouse.y = event.clientY / height - 0.5
})

//GEOMETRY
let geometry = new THREE.BoxBufferGeometry(200,200,200,100,100,100)
let numberOfVertices = geometry.attributes.position.count
// create an arry of length of attributes.position.count and fill them with random value
let randomPosition = new Float32Array(numberOfVertices)
for (let i = 0; i < numberOfVertices; i++) {
    randomPosition[i] = Math.random()          
}          
// now feed the geometry with a new attribute node with value of randomPosition[]
geometry.setAttribute('aRandom',new THREE.BufferAttribute(randomPosition, 1))


const cube = new THREE.Mesh(
    geometry,
    new THREE.RawShaderMaterial({
        vertexShader: vertex,
        fragmentShader: fragment,
        transparent: true,  // to see behind the object, gl_FragColor = vec4(1.0,1.0,1.0, 0.5)  here 0.5 os alpha.
        uniforms:{
            time:{
                value: 1.0
            }
        },
        // wireframe: true,
        // side: THREE.DoubleSide
     })
)
scene.add(cube)



// TODO add objects through functions and call them here
// unction     const example = () =>{     } Calls

let previousTime = 0

//func Render
const animate = () => {
    controls.update()

    const elapsedTime = clock.getElapsedTime()
    const deltaTime = elapsedTime - previousTime
        previousTime = elapsedTime
       
    // cube.rotation.y += Math.sin(deltaTime)*0.01
    // cube.rotation.x += Math.tan(deltaTime - 0.2)*0.01
    // cube.rotation.z += Math.tan(deltaTime - 0.4)*0.01


    cube.material.uniforms.time.value = elapsedTime

    const parallaxX = mouse.x 
    const parallaxY = - mouse.y
    // camera.position.x += (parallaxX - camera.position.x) * 120 * deltaTime
    // camera.position.y += (parallaxY - camera.position.y) * 120 * deltaTime


    // TODO we will manipulate this section for animation
    // let elapsedTime = clock.getElapsedTime()
    time += 0.05

    // this.material.uniforms.time.value = this.time
    renderer.render(scene, camera)
    requestAnimationFrame(animate)
}
animate();


//func resize function and Event
window.addEventListener('resize', () => {
     width = window.innerWidth
     height = window.innerHeight
     console.log(camera.fov);
    renderer.setSize(width,height)
    camera.aspect = (width/height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    camera.updateProjectionMatrix()
})
