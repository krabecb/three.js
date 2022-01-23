//Create scene
let scene = new THREE.Scene()

//Create perspective camera: 4 args - FOV, aspect ratio, near and far plane)
let camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth/window.innerHeight,
    0.1,
    1000
)

//Set up WebGL renderer, most flexible renderer without limitations
let renderer = new THREE.WebGLRenderer({antialias: true})
renderer.setClearColor("#e5e5e5")
renderer.setSize(window.innerWidth, window.innerHeight)

document.body.appendChild(renderer.domElement)

//If size of the browser changes, the renderer should adjust accordingly
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight)
    //Readjust aspect ratio
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectMatrix()
})