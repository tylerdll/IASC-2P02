import * as THREE from "three"
import * as dat from "lil-gui"
import {OrbitControls} from "OrbitControls"

/*
**Setup
*/

//Sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
    aspectRatio: window.innerWidth / window.innerHeight
}
/*
Scene
*/

//canvas
 const canvas = document.querySelector('.webgl')
//scene
const scene = new THREE.Scene()
//camera
const camera = new THREE.PerspectiveCamera(
    75,
    sizes.aspectRatio,
    0.1,
    100
)
camera.position.set(9.3,3.2,10)
scene.add(camera)

//renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias:true
 })
renderer.setSize(sizes.width,sizes.height)
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap


//controls
const controls = new OrbitControls(camera,canvas)
controls.enableDamping = true



/*
Meshes
*/
const caveMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color('white'),
    side:THREE.DoubleSide
})
//CaveWall
const caveWallGeometry = new THREE.PlaneGeometry(10,5)
const caveWall = new THREE.Mesh(caveWallGeometry, caveMaterial)
caveWall.rotation.y= Math.PI * 0.5
caveWall.position.set(-5,0,0)
caveWall.receiveShadow = true
scene.add (caveWall)
//barrierwall

const barrierWallGeometry = new THREE.PlaneGeometry(10,2)
const barrierWall = new THREE.Mesh(barrierWallGeometry, caveMaterial)
barrierWall.rotation.y= Math.PI * 0.5
barrierWall.position.set(5,-1.5,0)
scene.add (barrierWall)

//Cavefloor
const caveFloorGeometry = new THREE.PlaneGeometry(10,10)
const caveFloor = new THREE.Mesh(caveFloorGeometry, caveMaterial)
caveFloor.rotation.x= Math.PI * 0.5
caveFloor.position.set(0,-2.5,0)

scene.add (caveFloor)

//OBJECTS

//torusKnot
const torusKnotGeometry = new THREE.TorusKnotGeometry(1,0.2)
const torusKnotMaterial = new THREE.MeshNormalMaterial()
const  torusKnot = new THREE.Mesh(torusKnotGeometry,torusKnotMaterial)
torusKnot.position.set(6,1.5,0)
torusKnot.castShadow = true
scene.add(torusKnot)


/*
LIGHTS
*/
//ambientLight
/*
const ambientLight = new THREE.AmbientLight (
    new THREE.Color('white')
);
scene.add(ambientLight)
*/
// directionLight
const directionalLight = new THREE.DirectionalLight(
    new THREE.Color('white'),
    0.5
    )
    directionalLight.target = caveWall
    directionalLight.position.set(8.5,1,0)
    directionalLight.castShadow = true
    directionalLight.shadow.mapSize.width = 1024
    directionalLight.shadow.mapSize.height = 1024
    scene.add(directionalLight)

//directional light helper
//const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight)
//scene.add(directionalLightHelper)

/*
UI
*/
const ui = new dat.GUI()

const uiObject = {}

uiObject.reset = () =>
{
   directionalLight.position.set(8.5,1,0)
}



//Directional Light
const lightPositionFolder = ui.addFolder('Directional Light Position')

lightPositionFolder
    .add(directionalLight.position, 'x')
    .min(-10)
    .max (20)
    .step(0.1)

lightPositionFolder
    .add(directionalLight.position, 'y')
    .min(-10)
    .max (10)
    .step(0.1)
lightPositionFolder
    .add(directionalLight.position, 'z')
    .min(-10)
    .max (10)
    .step(0.1)

 lightPositionFolder
    .add(uiObject, 'reset')
    .name('Reset Position')

/*
Animation Loop
*/
const clock = new THREE.Clock()

//Animate
const animation =() =>
{
    //Return elaspedTime
const elapsedTime = clock.getElapsedTime()

//animate objects

torusKnot.rotation.y=elapsedTime
torusKnot.position.z=Math.sin(elapsedTime * 0.5) * 2

//update directionalLgihtHelper
//directionalLightHelper.update()




//controls
controls.update()


    //Renderer
renderer.render(scene,camera)
    //Request next frame

    window.requestAnimationFrame(animation)
}
animation()