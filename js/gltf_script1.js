import * as THREE from './three.js-master/three.js-master/build/three.module.js'
import {GLTFLoader} from './GLTFLoader.js'
import Stats from '../js/stats.module.js'
import {OrbitControls}  from '../js/three.js-master/three.js-master/examples/jsm/controls/OrbitControls.js'

const container = document.createElement( 'div' );
		document.body.appendChild( container );
const canvas = document.querySelector('.webgl')
const scene = new THREE.Scene()
scene.background = new THREE.Color( '#FFF8DC' );

const loader = new GLTFLoader()
loader.load('../assets/model_50041.glb', function(gltf){
    console.log(gltf)
    
    const root = gltf.scene;
    //root.scale.set(0.5,0.5,0.5)
    //root.position.y=4;
   //root.rotation.set(Math.PI/2,0, 0);
    scene.add(root);
    
}, function(xhr){
    console.log((xhr.loaded/xhr.total * 100) + '% loaded')
}, function(error){
    console.log('An error ocurred')
})


const light = new THREE.DirectionalLight(0xffffff, 1)
light.position.set(-743663, -954305, -8.4)

var fillLight = new THREE.DirectionalLight(0xffffff, 0.95);
fillLight.position.set(-100, 20, 100);

var backLight = new THREE.DirectionalLight(0xffffff, 0.70);
backLight.position.set(-100, 20, 100).normalize();


scene.add(fillLight);
scene.add(light)
scene.add(backLight);


//const geometry = new THREE.BoxGeometry(1,1,1);
//const material = new THREE.MeshBasicMaterial({
//    color:'red'
//})
//const boxMesh = new THREE.Mesh(geometry, material);
//scene.add(boxMesh);


//boiler plate code
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

const camera = new THREE.PerspectiveCamera(75, sizes.width/sizes.height,0.15, 1000)
camera.position.set (-743663, -954305, -8.4)
scene.add(camera)

const renderer = new THREE.WebGL1Renderer({
    canvas: canvas
})

renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
document.body.appendChild(renderer.domElement)
renderer.shadowMap.enabled = true
renderer.gammaOutput = true

renderer.render(scene, camera);

const controls = new OrbitControls( camera, renderer.domElement );
	controls.target.set(-743663, -954258, -8);
	controls.update();

//const controls = new THREE.OrbitControls(camera, renderer.domElement)
//controls.enableDamping = true
//controls.dampingFactor = 0.25
//controls.enableZoom = true

// stats
/*const stats = new Stats();
    container.appendChild( stats.dom );*/

function animate(){
    requestAnimationFrame(animate)
    controls.update()
    renderer.render(scene, camera)

}

animate()


