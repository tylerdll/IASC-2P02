import * as THREE from "three"

/************
 ** SCENE **
 ***********/

 //Canvas
const canvas = document.querySelector('.webgl')


 //Scene
 const scene = new THREE.Scene()
scene.background = new THREE.Color('darkred')


 //Camera
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth/ window.innerHeight,
    0.1,
    100
)
camera.position.set(0,0,5)
scene.add(camera)


 //Renderer
 const renderer = new THREE.WebGLRenderer({
    canvas: canvas
 })
 renderer.setSize(window.innerWidth,window.innerHeight)

 /*
 MESHES*/ 
 //testSphere
 const sphereGeometry = new THREE.SphereGeometry(1)
 const sphereMaterial = new THREE.MeshNormalMaterial()
const testSphere = new THREE.Mesh(sphereGeometry, sphereMaterial)


scene.add (testSphere)

 /******************
 **Animation loop **
 *******************/
const clock = new THREE.Clock()
 // Animate
const animation = () =>{
//Return elapsedTime
const elapsedTime = clock.getElapsedTime()
//Animate testSphere
testSphere.position.x = Math.sin(elapsedTime)
testSphere.position.z = Math.sin(elapsedTime)
//rotate testSphere
testSphere.rotation.x= elapsedTime*100
//Renderer
renderer.render(scene,camera)
//Request next frame
window.requestAnimationFrame(animation)
}

animation()