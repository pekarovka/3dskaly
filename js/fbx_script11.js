import * as THREE from '../js/three.js-master/three.js-master/build/three.module.js';
import Stats from '../js/stats.module.js';
import { OrbitControls }  from '../js/three.js-master/three.js-master/examples/jsm/controls/OrbitControls.js';
import { FBXLoader } from '../js/FBXLoader.js';


const scene = new THREE.Scene();
scene.background = new THREE.Color( '#FFF8DC' );
//scene.add(new THREE.AxesHelper(5));

const light = new THREE.PointLight();
light.position.set(60, 30, 60);
scene.add(light);

const ambientLight = new THREE.AmbientLight();
scene.add(ambientLight);

const fillLight = new THREE.DirectionalLight(0xffffff, 0.65);
      fillLight.position.set(-100, 20, 100);

const backLight = new THREE.DirectionalLight(0xffffff, 0.70);
    backLight.position.set(-100, 20, 100).normalize();
scene.add(fillLight);
scene.add(backLight);

const camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 20, 1000);
camera.position.set(130,110,-15);
//camera.rotation.set(Math.PI/4,0, Math.PI/2);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.target.set(0,1,0);
//controls.target.set(100, 100, 20)

const material = new THREE.MeshNormalMaterial();

const fbxLoader = new FBXLoader();

	fbxLoader.load( '../assets/model_50004.fbx', function ( object ) {

					//mixer = new THREE.AnimationMixer( object );

					//const action = mixer.clipAction( object.animations[ 0 ] );
					//action.play();

		object.traverse( function ( child ) {

			if ( child.isMesh ) {

				child.castShadow = true;
				child.receiveShadow = true;
				}
				} );
				
			    object.rotation.set(-Math.PI/2,0,  Math.PI / 4);
				scene.add( object );
			} );

window.addEventListener('resize', onWindowResize, false);
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    render();
}

/*const stats = new Stats();
document.body.appendChild(stats.dom);*/

function animate() {
    requestAnimationFrame(animate);

    controls.update();

    render();

   // stats.update();
}

function render() {
    renderer.render(scene, camera);
}

animate();