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

let raycaster = new THREE.Raycaster()
let mouse = new THREE.Vector2()

//Use Three.js' primitive shapes
//Two things to consider: form and texture
//(size, width, height)
let geometry = new THREE.BoxGeometry(1, 1, 1)
let material = new THREE.MeshLambertMaterial({color: 0xF7F7F7})

//Combine geometry and material variables into a mesh
// let mesh = new THREE.Mesh(geometry, material)

// scene.add(mesh)

let meshX = -10
for(let i = 0; i < 15; i++) {
    let mesh = new THREE.Mesh(geometry, material)
    mesh.position.x = (Math.random() - 0.5) * 10
    mesh.position.y = (Math.random() - 0.5) * 10
    mesh.position.z = (Math.random() - 0.5) * 10
    scene.add(mesh)
    meshX += 1
}

//Add a light
//(color, intensity, distance)
let light = new THREE.PointLight(0xFFFFFF, 1, 1000)
light.position.set(0, 0, 0)
scene.add(light)

let lightTwo = new THREE.PointLight(0xFFFFFF, 2, 1000)
lightTwo.position.set(0, 0, 25)
scene.add(lightTwo)

let render = () => {
    //Draw scene every time screen is refreshed - keeps shape proportions from adjusting
    //when browser size changes
    requestAnimationFrame(render)
    renderer.render(scene, camera)
}

function onMouseMove(event) {
    event.preventDefault()
    mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1
    mouse.y =  - ( event.clientY / window.innerHeight ) * 2 + 1

    raycaster.setFromCamera(mouse, camera)

    let intersects = raycaster.intersectObjects(scene.children, true)
    for(let i = 0; i < intersects.length; i++) {
        //Green sock animation plugin
        this.tl = new TimelineMax()
        this.tl.to(intersects[i].object.scale, 1, {x: 2, ease: Expo.easeOut})
        this.tl.to(intersects[i].object.scale, .5, {x: .5, ease: Expo.easeOut})
        this.tl.to(intersects[i].object.position, .5, {x: 2, ease: Expo.easeOut})
        this.tl.to(intersects[i].object.rotation, .5, {y: Math.PI*.5, ease: Expo.easeOut}, "=-1.5")
    }
}

render()

window.addEventListener('mousemove', onMouseMove)