import * as THREE from "three"
import * as dat from "lil-gui"
import { OrbitControls } from "OrbitControls"
const x = 0, y = 0;
/****
** SETUP **
***/
// Sizes
const sizes = {
    width: window.innerWidth /5.5,
    height: window.innerHeight /2.5,
    aspectRatio: 1
}

/****
** SCENE **
****/
// Canvas
const canvas = document.querySelector('.webgl')

// Scene
const scene = new THREE.Scene()
scene.background = new THREE.Color('gray')

// Camera
const camera = new THREE.PerspectiveCamera(
    75,
    sizes.aspectRatio,
    0.1,
    100
)
camera.position.set(0, 0, 20)
scene.add(camera)

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true
})
renderer.setSize(sizes.width, sizes.height)

// Orbit Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/****
** LIGHTS **
*****/
// Directional Light
const directionalLight = new THREE.DirectionalLight(0x404040, 100)
scene.add(directionalLight)

/***
** MESHES **
****/
const heartShape = new THREE.Shape();
heartShape.bezierCurveTo( x + 5, y + 5, x + 4, y, x, y );
heartShape.bezierCurveTo( x - 6, y, x - 6, y + 7,x - 6, y + 7 );
heartShape.bezierCurveTo( x - 6, y + 11, x - 3, y + 15.4, x + 5, y + 19 );
heartShape.bezierCurveTo( x + 12, y + 15.4, x + 16, y + 11, x + 16, y + 7 );
heartShape.bezierCurveTo( x + 16, y + 7, x + 16, y, x + 10, y );
heartShape.bezierCurveTo( x + 7, y, x + 5, y + 5, x + 5, y + 5 );

// Heart Geometry
const heartGeometry = new THREE.ShapeGeometry( heartShape );

// Cube Materials
const blueMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color('blue')
})
const pinkMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color('pink')
})
const redMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color('red')
})

const drawHeart = (i, material) =>
{
    const heart = new THREE.Mesh(heartGeometry, material)
    heart.position.x = (Math.random() - 0.5) * 10
    heart.position.z = (Math.random() - 0.5) * 10
    heart.position.y = i - 10
    heart.scale.x = .05
    heart.scale.y = .05
    heart.scale.z = .05
    heart.rotation.x = Math.random() * 2 * Math.PI
    heart.rotation.y = Math.random() * 2 * Math.PI
    heart.rotation.z = Math.random() * 2 * Math.PI

    scene.add(heart)
}


/**********************
** TEXT PARSERS & UI **
***********************/
let preset = {}

const uiobj = {
    text: '',
    textArray: [],
    term1: 'romeo',
    term2: 'juliet',
    term3: 'love',
    rotateCamera: false
   
}

// Text Parsers

// Parse Text and Terms
const parseTextandTerms = () =>
{
    // Strip periods and downcase text
    const parsedText = uiobj.text.replaceAll(".", "").toLowerCase()
    //console.log(parsedText)

    // Tokenize text
    uiobj.textArray = parsedText.split(/[^\w']+/)
    //console.log(uiobj.textArray)

    // Find term 1
    findTermInParsedText(uiobj.term1, blueMaterial)

    // Find term 2
    findTermInParsedText(uiobj.term2, pinkMaterial)

    // Find term 3
    findTermInParsedText(uiobj.term3, redMaterial)

}

const findTermInParsedText = (term, material) =>
{
    for (let i=0; i < uiobj.textArray.length; i++)
    {
        //console.log(i, uiobj.textArray[i])
        if(uiobj.textArray[i] === term)
        {
         //console.log(i, term)
         // convert i into n, which is a value between 0 and 20
         const n = (100 / uiobj.textArray.length) * i * 0.2
         
         // call drawCube function 5 times using converted n value
         for(let a=0; a < 5; a++)
         {
            drawHeart(n, material)
         }

        }
    }
}
// Load source text
fetch("https://raw.githubusercontent.com/tylerdll/IASC-2P02/main/assignment2/assets/romeojuliet.txt")
    .then(response => response.text())
    .then((data) =>
    {
        uiobj.text = data
        parseTextandTerms()
    }
    )
   

// UI
const ui = new dat.GUI({
    container: document.querySelector('#parent1')
})

// Interaction Folders

    // hearts Folder
    const heartsFolder = ui.addFolder('Filter Terms')

    heartsFolder
        .add(blueMaterial, 'visible')
        .name(`${uiobj.term1}`)

    heartsFolder
        .add(pinkMaterial, 'visible')
        .name(`${uiobj.term2}`)

    heartsFolder
        .add(redMaterial, 'visible')
        .name(`${uiobj.term3}`)

    // Camera Folder
    const cameraFolder = ui.addFolder('Camera')

    cameraFolder
        .add(uiobj, 'rotateCamera')
        .name('Rotate Camera')



/*******************
** ANIMATION LOOP **
********************/
const clock = new THREE.Clock()

// Animate
const animation = () =>
{
    // Return elapsedTime
    const elapsedTime = clock.getElapsedTime()

    // Orbit Controls
    controls.update()

    // Camera Rotation
    if(uiobj.rotateCamera)
    {
        camera.position.x = Math.sin(elapsedTime * 0.2) * 16
        camera.position.z = Math.cos(elapsedTime * 0.2) * 16
    }


    // Renderer
    renderer.render(scene, camera)

    // Request next frame
    window.requestAnimationFrame(animation)
}

animation()