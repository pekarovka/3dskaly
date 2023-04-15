//samotne vytvoreni krychli

window.onload = function(){	
	
	//test if webgl is supported
	if (!Detector.webgl) {
		Detector.addGetWebGLMessage({
			parent: document.getElementById('webgl-not-supported')
		});
	} else {
	    //create ThreejsCubeSample
	    var cubeSample = new ThreejsCubeSample();   		
	}    
	
};
	

function ThreejsCubeSample() {
	
	//CLASS PROPERTIES
	    
    var self = this; //"Getting Out of Binding Situations in JavaScript" -- http://alistapart.com/article/getoutbindingsituations    
		
	self.guiControls; self.stats; self.orbitControls;
	
	self.container; self.controlsUI; self.statsUI;  	
	
	self.camera; self.scene; self.renderer;
	
	self.cubeGeometry; self.cubes = [];
				
	self.canvasWidth; self.canvasHeight;		
	
	//FPS median info
	self.fpss = []; self.startTime = (new Date()).getTime(); self.framesCount = 0;	self.fpsInfo;	
	
	
	
	//CLASS METHODS
	//###############################################################
	
	/**
	 * Constructor of the class ThreejsCubeSample which initiate the class instance.
	 *
	 * @constructor
	 */
	self.init = function() {
				
		//container elements		
		self.container = document.getElementById('container-3d');
		self.controlsUI = document.getElementById('controls-UI');
		self.statsUI = document.getElementById('stats-UI');
		
		
		//set scene size
		self.canvasWidth = self.container.clientWidth;
		self.canvasHeight = self.container.clientHeight;
		
		
		//create the camera (Field of vision, Aspect ratio, nearest point, farest point) 
		self.camera = new THREE.PerspectiveCamera(70, self.canvasWidth / self.canvasHeight, 1, 50000);
		self.camera.position.y = 150;
		self.camera.position.z = 600;
		
		
		//init orbit controls
		self.orbitControls = new THREE.TrackballControls(self.camera, self.container);
		
		self.orbitControls.rotateSpeed = 2.0;
		self.orbitControls.zoomSpeed = 5.0;
		self.orbitControls.panSpeed = 0.8;
		self.orbitControls.minDistance = 200;
		
		self.orbitControls.noZoom = false;
		self.orbitControls.noPan = false;
		
		self.orbitControls.staticMoving = true;
		self.orbitControls.dynamicDampingFactor = 0.3;
		
						
		//create the scene
		self.scene = new THREE.Scene();

				
		//init the WebGL renderer and append it to the Dom	
		self.renderer = new THREE.WebGLRenderer({ antialias: true });
		self.renderer.setClearColor(0xfffce4, 1);	
		self.renderer.setSize(self.canvasWidth, self.canvasHeight);	
		self.container.appendChild(self.renderer.domElement);
		

		//add lights			
		var dirLight1 = new THREE.DirectionalLight(0xFFFFFF, 1.0);
		dirLight1.position.set(1, 1, 1);
		self.scene.add(dirLight1);

		var dirLight2 = new THREE.DirectionalLight(0xFFFFFF, 1.0);
		dirLight2.position.set(-1, -1, 1);
		self.scene.add(dirLight2);
		
		
		//create GUI controls
		self.createControls();	    
		
		
		//init stats and append it to the DOM
		self.stats = new Stats();
		self.statsUI.appendChild(self.stats.domElement);		
		
		
		//FPS info
		self.fpsInfo = document.createElement('div');
		self.fpsInfo.setAttribute('id', 'fpsInfo');
		self.fpsInfo.appendChild(document.createTextNode("0 FPS median"));
		self.statsUI.appendChild(self.fpsInfo);

		
		//create cube geometry and place cubes
		self.cubeGeometry = new THREE.CubeGeometry(200, 200, 200);	
		placeCubes(self.guiControls.cubeCount);
		
	
		//add some event listeners
		self.container.addEventListener('DOMMouseScroll', self.onMouseWheel, false); //for firefox			
		self.container.addEventListener('mousewheel', self.onMouseWheel, false); //for others	
		self.fpsInfo.addEventListener('click', self.onFpsInfoClick, false);
		
		var presetSelect = self.controlsUI.getElementsByTagName('select')[0];
		presetSelect.addEventListener('change', self.onPresetChanged, false); 
		
	
		//render
		self.render();
	
	}; //ends init()	
	
	
	
	//###############################################################
	//SIMPLE GUI
	//###############################################################

	/**
	 * GUIControls class.
	 */	
	function GUIControls() {
		this.animationPlay = false;
		//this.spread = 0;
		this.cubeCount = 1;
	};



	/**
	 * Creates simple GUI controls for the scene.
	 */	
	self.createControls = function() {

		//tests presets
		var testPresets = {
			"remembered": {
			  "1 krychle": {
				"0": {
				  "animationPlay": false,
				  //"spread": 0,
				  "cubeCount": 1
				}
			  }, 
			  "100 krychlí": {
				"0": {
				  "animationPlay": false,
				  "spread": 0,
				  "cubeCount": 100
				}
			  }, 
			  "1000 krychlí": {
				"0": {
				  "animationPlay": false,
				  "spread": 0,
				  "cubeCount": 1000
				}
			  }, 
			  "2000 krychlí": {
				"0": {
				  "animationPlay": false,
				  "spread": 0,
				  "cubeCount": 2000
				}
			  }, 
			  "3000 krychlí": {
				"0": {
				  "animationPlay": false,
				  "spread": 0,
				  "cubeCount": 3000
				}
			  }, 
			  "5000 krychlí": {
				"0": {
				  "animationPlay": false,
				  "spread": 0,
				  "cubeCount": 5000
				}
			  },
			  "10000 krychlí": {
				"0": {
				  "animationPlay": false,
				  "spread": 0,
				  "cubeCount": 10000
				}
			  },
			  "20000 krychlí": {
				"0": {
				  "animationPlay": false,
				  "spread": 0,
				  "cubeCount": 20000
				}
			  },
			  "30000 krychlí": {
				"0": {
				  "animationPlay": false,
				  "spread": 0,
				  "cubeCount": 30000
				}
			  },
			  "50000 krychlí": {
				"0": {
				  "animationPlay": false,
				  "spread": 0,
				  "cubeCount": 50000
				}
			  }
			}
		  };
		
		//define the Dat.gui controls
		self.guiControls = new GUIControls();			
		
		//create the GUI
		var gui = new dat.GUI({ autoPlace: false, load: testPresets });
		
		//enable presets
		gui.remember(self.guiControls);
		
				

		
		//stores so we can attach events later
		var animationPlayStore = gui.add(self.guiControls, 'animationPlay').name("Animace");  
		var cubeCountStore = gui.add(self.guiControls, 'cubeCount').min(1).step(1).name("Počet krychlí");		
		//var spreadStore = gui.add(self.guiControls, 'spread', 0, 100).step(1).name("Rozestup");  
	
		
		//events on individual controllers...			
		cubeCountStore.onChange(function(value) {
			placeCubes(value);	
			updateCubesPosition();
		});
		
		
		//spreadStore.onChange(function(value) {
		//	updateCubesPosition();
		//});	
		
	
	
		//append controls UI to the DOM
		self.controlsUI.appendChild(gui.domElement);	
			
	}; //ends createControls()



			
	
	
	
	//###############################################################
	//HELP FUNCTIONS
	//###############################################################	

	/**
	 * Renders the scene and relaunches it.
	 */		
	self.render = function () {
		
		//relaunch the 'timer'
		requestAnimationFrame(self.render);		
		
		// animation of rotation	
		if(self.guiControls.animationPlay) {
			for (var i = 0; i < self.cubes.length; ++i) {
				self.cubes[i].rotation.x += 0.03;
				self.cubes[i].rotation.y += 0.02;
				self.cubes[i].rotation.z += 0.01;	
			}
		} 	
		
		//render the 3D scene
		self.renderer.render(self.scene, self.camera);
		
		//update orbit controls		
		self.orbitControls.update();
		
		//update the stats
		self.stats.update();
		
		//counting FPSs
		var deltaTime = ((new Date()).getTime() - self.startTime) / 1000;
		self.framesCount++;
		
		if (deltaTime > 1) {
			self.fpss.push(Math.floor((self.framesCount / deltaTime) * 10.0) / 10.0);
			
			if (self.fpss.length > 59) { self.fpss.shift(); }
			
            self.fpsInfo.innerHTML = Math.round(getMedian(self.fpss)) + " FPS median";
			
            self.startTime = (new Date()).getTime();
            self.framesCount = 0; 
        }
	
	}; //ends render()
			
		
		
	/**
	 * Counts median number of the given array.
	 * 
	 * @param 	{array} input Array of unsorted numbers.
	 * @return 	{number} Median number.
	 */	
	var getMedian = function(input) {
		
		input.sort( function(a, b) {return a - b;} );
		
		//even length
		if(input.length % 2 == 0) {
			var a = input[(input.length / 2) - 1];
			var b = input[input.length / 2];

			return (a + b) / 2;
		}

		//odd length
		return input[Math.floor(input.length / 2)];
		
	}
	
	
	   
	/**
	 * Places particular count of cubes to the scene.
	 * 
	 * @param	{number} countArg How many cubes is to be shown.
	 */	
	var placeCubes = function(countArg) {
		
		var countOfCubes = self.cubes.length;
		
		if(countOfCubes > countArg) {			
			//remove some cubes...		
							
			var countToRemove = countOfCubes - countArg;
			for (var i = 0; i < countToRemove; i++) {	
						
				self.scene.remove(self.cubes.pop());
				
			} 						
			
		} else {							
			//add some new cubes...		
					
			for (var i = countOfCubes; i < countArg; i++) {			
				//create the cube	
				
				var material = new THREE.MeshPhongMaterial( { color: (Math.random()*0xffffff), ambient: 0x000000, specular: 0x000000, emissive: 0x000000, shininess: 0, transparent: true } );
				
				var cube = new THREE.Mesh(self.cubeGeometry, material);
										
				//random cube rotation
				cube.rotation.x = Math.random() * 2 * Math.PI - Math.PI;
				cube.rotation.y = Math.random() * 2 * Math.PI - Math.PI;
				cube.rotation.z = Math.random() * 2 * Math.PI - Math.PI;
				
				//add the object to the scene
				self.cubes.push(cube);
				self.scene.add(cube);
									
			} //ends for
			
																
		}
				
	}; //ends placeCubes()
	
	

	/**
	 * Updates cubes position at the scene depending on spread value.
	 */
	var updateCubesPosition = function() {
		
		for (var i = 1; i < self.cubes.length; i++) {	
			var randomValue = Math.floor((Math.random() * 100) + 1);	//random number from 1 to 100
			self.cubes[i].position.x = (((randomValue % 2) == 0) ? 1 : -1) *5 * randomValue;	
			randomValue = Math.floor((Math.random() * 100) + 1);
			self.cubes[i].position.y = (((randomValue % 2) == 0) ? 1 : -1) *5 * randomValue;	
			randomValue = Math.floor((Math.random() * 100) + 1);
			self.cubes[i].position.z = (((randomValue % 2) == 0) ? 1 : -1) *5 * randomValue;		
		} 
			//nastavena hodnota rozestupu na 5 misto * self.guiControls.spread
	}; //ends updateCubesPosition()
	



	
	//###############################################################
	//EVENTS HANDLERS
	//###############################################################	
	
	/**
	 * Handler of the on mouse wheel action.
	 * 
	 * @param	{event} ev The mouse event.
	 */	
	self.onMouseWheel = function(ev) {	
		
		ev.preventDefault(); //avoids scrollbar moving when the mouse is above the container
			
	}; //ends onMouseWheel()
		
		
		
	/**
	 * Handler of the on mouse click action on FPS information.
	 */			
	self.onFpsInfoClick = function() {
		//reset FPS stats
		self.fpss = [];
		self.startTime = (new Date()).getTime();
		self.framesCount = 0;
		self.fpsInfo.innerHTML = "reseted";
	}
		
		
		
	/**
	 * Handler of the change of the test preset.
	 */	
	self.onPresetChanged = function() {
		self.onFpsInfoClick();
	}	
	
	
	
	
	//initialiaze everything
    return self.init();
    	
    	
    	
    	
} // ends DemoSample






