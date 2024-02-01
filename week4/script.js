import * as THREE from "three"
import { OrbitControls } from "OrbitControls"
import * as dat from "lil-gui"



/**
 * Setup
 */

//Sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
    aspectRatio:window.innerWidth / window.innerHeight
}


/*********
 * Scene
 *********/

//Canvas
const canvas = document.querySelector('.webgl')

//Scene
const scene = new THREE.Scene()
scene.background = new THREE.Color('gray')

//Camera
const camera = new THREE.PerspectiveCamera(
    75,
    sizes.aspectRatio,
    0.1,
    100
)
camera.position.x = (2,2,4)
scene.add(camera)
//Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
 })
 renderer.setSize(sizes.width,sizes.height)
//controls

const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true



/**
 * MESHES
 */
//plane
const planeGeometry = new THREE.PlaneGeometry(10,10,50,50)
const planeMaterial = new THREE.MeshBasicMaterial({
    color: new THREE.Color('red'),
    side: THREE.DoubleSide,
    wireframe: true
})

const plane = new THREE.Mesh(planeGeometry,planeMaterial)


plane.rotation.x = Math.PI * 0.5
scene.add(plane)

//testSphere
const geometry = new THREE.SphereGeometry(1)
const material = new THREE.MeshNormalMaterial()
const testSphere = new THREE.Mesh(geometry, material)


scene.add(testSphere)

//Controls


/*
UI
*/
const ui = new dat.GUI()

//UI Object
const uiObject = {}
uiObject.play = false

// Plane UI
const planeFolder = ui.addFolder('Plane')

planeFolder
    .add(planeMaterial,'wireframe')

    //Sphere UI
const sphereFolder = ui.addFolder('Sphere')

sphereFolder 
    .add(testSphere.position, 'y')
    .min(-5)
    .max(5)
    .step(0.1)
    .name('Height')

sphereFolder
    .add(uiObject,'play')
    .name('Animate Sphere')



/****************
 * Animation loop *
 ****************/
const clock = new THREE.Clock()
//Animate
const animation = ()  =>
{
    //Return elaspedTime
    const elapsedTime = clock.getElapsedTime()  
//animate sphere
console.log(uiObject.play)

   // Controls
   if(uiObject.play)
   {
    testSphere.position.y = Math.sin(elapsedTime *.3) * 2
   }

    //Renderer
    renderer.render(scene,camera)

    //Request next frame
    window.requestAnimationFrame(animation)

}
animation()