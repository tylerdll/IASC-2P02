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

//sphere

const sphereGeometry = new THREE.SphereGeometry(1)
const sphereMaterial = new THREE.MeshLambertMaterial({ color: 0xff0000 })
const  sphere = new THREE.Mesh(sphereGeometry,sphereMaterial)

sphere.scale.set (.2,.2,.2)
sphere.position.set(1,3.1,4.2)
sphere.castShadow = true
scene.add(sphere)
sphere.visible = false;


const torusKnotGeometry = new THREE.TorusKnotGeometry(1)
const torusKnotMaterial = new THREE.MeshLambertMaterial({ color: 0xff0000 })
const  torusKnot = new THREE.Mesh(torusKnotGeometry,torusKnotMaterial)

torusKnot.scale.set (.15,.15,.15)
torusKnot.position.set(1,3.1,4.2)
torusKnot.castShadow = true
scene.add(torusKnot)
torusKnot.visible = false;

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
/*
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

*/
/*
DOM INTERACTIONS
*/
//domObject
const domObject = {
    part: 1,

    firstchange: false,
    secondChange: false,
    thirdChange: false,
    fourthChange: false,
}



// continue-rreading
document.querySelector('#continue-reading').onclick = function(){
   document.querySelector('#part-two').classList.remove('hidden')
   document.querySelector('#part-one').classList.add('hidden')
   domObject.part = 2

   domObject.firstChange = false
   domObject.secondChange = false

   sphere.scale.set (.2,.2,.2)
   sphere.position.set(1,3.1,4.2)
   sphere.castShadow = true
   sphere.visible = false;

   torusKnot.scale.set (.15,.15,.15)
   torusKnot.position.set(1,3.1,4.2)
   torusKnot.castShadow = true
   torusKnot.visible=false;

   directionalLight.position.set(8.5,1,0)
}

//restart
document.querySelector('#restart').onclick = function(){
    document.querySelector('#part-two').classList.add('hidden')
    document.querySelector('#part-one').classList.remove('hidden')
    domObject.part = 1

//reset domObject changes
domObject.firstChange = false
domObject.secondChange = false
domObject.thirdChange = false
domObject.fourthChange = false


//reset directionalLight
directionalLight.position.set(8.5,1,0)
 }
//first change
document.querySelector('#first-change').onclick = function(){
    domObject.firstChange = true
}

//second change
document.querySelector('#second-change').onclick = function(){
    domObject.secondChange = true
    domObject.firstChange = false
}

//third change
document.querySelector('#third-change').onclick = function(){
    domObject.thirdChange = true
}

//fourth chagne
document.querySelector('#fourth-change').onclick = function(){
    domObject.fourthChange = true
    domObject.thirdChange = false
}





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

//torusKnot.rotation.y=elapsedTime
//torusKnot.position.z=Math.sin(elapsedTime * 0.5) * 2

//update directionalLgihtHelper
//directionalLightHelper.update()




//controls
controls.update()


//DOM INTERACTIOSN

//part 1
if (domObject.part === 1){
camera.position.set(0.43,-0.25,-0.023)
camera.lookAt(-5,0,0)
}

//part 2
if (domObject.part === 2){
camera.position.set(9.3,3.2,10)
camera.lookAt(0,0,0)
}


//first-change
if(domObject.firstChange){
    sphere.visible = true;
    sphere.rotation.y= elapsedTime
    sphere.rotation.x = elapsedTime


sphere.position.y = Math.sin(elapsedTime * 6) * 3
sphere.position.z = Math.sin(elapsedTime) * 4

torusKnot.visible = true;
torusKnot.rotation.y= elapsedTime
torusKnot.rotation.x = elapsedTime

torusKnot.position.y = Math.sin(elapsedTime * 6) * 3
torusKnot.position.z = Math.sin(elapsedTime) * 4

}

//second-change
if(domObject.secondChange){

sphere.position.y += elapsedTime * 0.8
torusKnot.position.y += elapsedTime * 0.8
directionalLight.position.y -= elapsedTime * 0.005

}

//third-change
if(domObject.thirdChange){
    sphere.visible = true;
    sphere.rotation.y= elapsedTime
    sphere.rotation.x = elapsedTime


sphere.position.y = Math.sin(elapsedTime * 6) * 3
sphere.position.z = Math.sin(elapsedTime) * 4

torusKnot.visible = true;
torusKnot.rotation.y= elapsedTime
torusKnot.rotation.x = elapsedTime

torusKnot.position.y = Math.sin(elapsedTime * 6) * 3
torusKnot.position.z = Math.sin(elapsedTime) * 4

}

//fourth-change
if(domObject.fourthChange){
  
    sphere.position.y += elapsedTime * 0.8
    torusKnot.position.y += elapsedTime * 0.8
    directionalLight.position.y -= elapsedTime * 0.005
}
//Renderer
renderer.render(scene,camera)

//Request next frame
    window.requestAnimationFrame(animation)
}
animation()