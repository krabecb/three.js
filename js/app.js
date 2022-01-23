//Create scene
let scene = new THREE.Scene()

//Create perspective camera: 4 args - FOV, aspect ratio, near and far plane)
let camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth/window.innerHeight,
    0.1,
    1000
)
camera.position.z = 5

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
    camera.updateProjectionMatrix()
})

//Use Three.js' primitive shapes
//Two things to consider: form and texture
//(size, width, height)
let geometry = new THREE.SphereGeometry(1, 10, 10)
let material = new THREE.MeshLambertMaterial({color: 0xFFCC00})

//Combine geometry and material variables into a mesh
let mesh = new THREE.Mesh(geometry, material)

scene.add(mesh)

//Add a light
//(color, intensity, distance)
let light = new THREE.PointLight(0xFFFFFF, 1, 500)
light.position.set(10, 0, 25)
scene.add(light)

renderer.render(scene, camera)