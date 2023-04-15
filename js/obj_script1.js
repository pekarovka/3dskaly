var scene = new THREE.Scene();
scene.background = new THREE.Color( '#FFF8DC' );

var camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.15, 1000 );
camera.position.set (-743685, -954305, -9);


var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

var controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.25;
controls.enableZoom = true;
controls.zoomSpeed = 0.25;
controls.target.set(-743660, -954270, -5);
/*controls.autoRotate = true;
controls.autoRotateSpeed = 1.5;*/

var keyLight = new THREE.DirectionalLight(0xffffff, 0.30);
keyLight.position.set(7.8, 2, 23);

var fillLight = new THREE.DirectionalLight(0xffffff, 0.65);
fillLight.position.set(-100, 20, 100);

var backLight = new THREE.DirectionalLight(0xffffff, 0.40);
backLight.position.set(-100, 20, 100).normalize();

scene.add(keyLight);
scene.add(fillLight);
scene.add(backLight);

var mtlLoader = new THREE.MTLLoader();
mtlLoader.setTexturePath('../assets/');
mtlLoader.setPath('../assets/');
mtlLoader.load('model_50041.mtl', function (materials) {

    materials.preload();

    var objLoader = new THREE.OBJLoader();
    objLoader.setMaterials(materials);
    objLoader.setPath('../assets/');
    objLoader.load('model_50041.obj', function (object) {

        scene.add(object);
        object.position.y -= 20;
        //object.rotation.set(new THREE.Vector3(Math.PI / 4, 0,0));
       

    });

});

var animate = function () {
	requestAnimationFrame( animate );
	controls.update();
	renderer.render(scene, camera);
};

animate();
