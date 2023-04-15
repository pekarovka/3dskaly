window.onload = function(){
		
	//test if webgl is supported
	if (!Detector.webgl) {
		Detector.addGetWebGLMessage({
			parent: document.getElementById('webgl-not-supported')
		});
	} else {
	    //create CubeSample
	    var cubeSample = new X3DOMCubeSample();   		
	} 		
	
};
	




function X3DOMCubeSample() {

	//###############################################################
	//CLASS PROPERTIES
	//###############################################################  
    
    var self = this; //"Getting Out of Binding Situations in JavaScript" -- http://alistapart.com/article/getoutbindingsituations   
    		
	self.guiControls; self.stats; 

	self.container; self.controlsUI; self.statsUI;
	
	self.x3d; self.scene; self.content; self.viewpoint; 
	
	self.cubes = []; 
	
	self.canvasWidth; self.canvasHeight;	
	
	//FPS median stats
	self.fpss = []; self.startTime = (new Date()).getTime(); self.framesCount = 0;	self.fpsInfo;	
	
	
	


	//###############################################################
	//CLASS METHODS
	//###############################################################	

	/**
	 * Constructor of the class X3DOMjsCubeSample which initiate the class instance.
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
		
		
		//first the x3d element        
		self.x3d = document.createElement('x3d');
		self.x3d.setAttribute('id', 'x3d');
		self.x3d.setAttribute('xmlns', 'http://www.web3d.org/specifications/x3d-namespace');
		self.x3d.setAttribute('showstat', 'false');
		self.x3d.setAttribute('showlog', 'false');
		self.x3d.setAttribute('width', 'canvasWidth');
		self.x3d.setAttribute('height', 'canvasHeight');
		

		//set scene
		self.scene = document.createElement('scene');
		self.scene.setAttribute('id', 'theScene');	
		self.scene.setAttribute('def', 'scene');	
		self.x3d.appendChild(self.scene);	
		
		//set background
		var background = document.createElement('background');
		background.setAttribute('skyColor', '1.0 0.99 0.89');	
		self.scene.appendChild(background);		
		
		//set viewpoint
		self.viewpoint = document.createElement('viewpoint');
		self.viewpoint.setAttribute('id', 'theViewpoint');
		self.viewpoint.setAttribute('centerOfRotation', '0 0 0');
		self.viewpoint.setAttribute('fieldOfView', self.canvasWidth / self.canvasHeight);
		self.viewpoint.setAttribute('position', '0 0 600');
		self.viewpoint.setAttribute('orientation', '0 0 0 0');
		self.viewpoint.setAttribute('zNear', '1');
		self.viewpoint.setAttribute('zFar', '50000');
		self.scene.appendChild(self.viewpoint);		
		
		//create lights
		var dirLight01 = document.createElement('directionalLight');
		dirLight01.setAttribute('direction', '1 1 1');
		dirLight01.setAttribute('ambientIntensity', '0');
		dirLight01.setAttribute('intensity', '0');
		dirLight01.setAttribute('color', '1 1 1');
		self.scene.appendChild(dirLight01);		
		
		var dirLight02 = document.createElement('directionalLight');
		dirLight02.setAttribute('direction', '-1 -1 1');
		dirLight01.setAttribute('ambientIntensity', '0');
		dirLight02.setAttribute('intensity', '0');
		dirLight02.setAttribute('color', '1 1 1');
		self.scene.appendChild(dirLight02);	
		
		//create content container
		self.content = document.createElement('group');
		self.content.setAttribute('id', 'theContent');
		self.scene.appendChild(self.content);
		
		
		//append scene and reload x3dom
		self.container.appendChild(self.x3d);
		x3dom.reload();
		
		
		//create GUI controls
		self.createControls();	
	
		
		//init the Stats and append it to the DOM
		self.stats = new Stats();
		self.statsUI.appendChild(self.stats.domElement);
		
		self.fpsInfo = document.createElement('div');
		self.fpsInfo.setAttribute('id', 'fpsInfo');
		self.fpsInfo.appendChild(document.createTextNode("0 FPS median"));
		self.statsUI.appendChild(self.fpsInfo);
		
		
		//place cube
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
		//this.spread = 5;
		this.cubeCount = 1;
	};



	/**
	 * Creates simple GUI controls for the scene.
	 */	
	self.createControls = function(){

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
		    
		  }
		};
		
		
		//define the Dat.gui controls
		self.guiControls = new GUIControls();			
		
		//create the GUI
		var gui = new dat.GUI({ autoPlace : false, load : testPresets });
		
		//enable presets
		gui.remember(self.guiControls);
				
		
		//stores so we can attach events later
		var animationPlayStore = gui.add(self.guiControls, 'animationPlay').name("Animace");  
		var cubeCountStore = gui.add(self.guiControls, 'cubeCount').min(1).step(1).name("Počet krychlí");		
		//var spreadStore = gui.add(self.guiControls, 'spread', 0, 100).name("Rozestup").step(1);   
		
		

		//events on individual controllers...	
		cubeCountStore.onChange(function(value) {
			placeCubes(value);	
			updateCubesPosition();
		});
			
	
	/*	spreadStore.onChange(function(value) {	
			updateCubesPosition();
		});*/	
		
	
		//append controls UI to the Dom
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
			for (var i = 0; i < self.cubes.length; i++) {										
				var boxRotationX = document.getElementById('boxRotationX_' + i);
				var rotationXArray = boxRotationX.getAttribute('rotation').split(' ');
				boxRotationX.setAttribute('rotation', '1 0 0 ' + (+rotationXArray[3] + 0.03));
				
				var boxRotationY = document.getElementById('boxRotationY_' + i);
				var rotationYArray = boxRotationY.getAttribute('rotation').split(' ');
				boxRotationY.setAttribute('rotation', '0 1 0 ' + (+rotationYArray[3] + 0.02));
				
				var boxRotationZ = document.getElementById('boxRotationZ_' + i);
				var rotationZArray = boxRotationZ.getAttribute('rotation').split(' ');
				boxRotationZ.setAttribute('rotation', '0 0 1 ' + (+rotationZArray[3] + 0.01));
			}
		} 

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
				
				var element = document.getElementById(self.cubes.pop());
				var parent = element.parentNode; //element.parentNode.id;
  				element.parentNode.removeChild(element);
  					
			} 						
		} else {	
			
   			var documentFragment = document.createDocumentFragment();
   			
			
			for (var i = countOfCubes; i < countArg; i++) {						
				var cube = document.createElement('box');
				cube.setAttribute('size', '200 200 200');
				
				
				var appearance = document.createElement('appearance');
				
				
				var material = document.createElement('material');
				material.setAttribute('id', 'boxMaterial_' + i);
				material.setAttribute('diffuseColor', Math.random() + ' ' + Math.random() + ' ' + Math.random());
				material.setAttribute('ambientIntensity', '0');
				material.setAttribute('emissiveColor', '0 0 0');
				material.setAttribute('specularColor', '0 0 0');
				material.setAttribute('shininess', '0');				
				
				appearance.appendChild(material);
				
								
				var shape = document.createElement('shape');							
				shape.appendChild(cube);
				shape.appendChild(appearance);
									
				
				//transformations	
				var boxRotationZ = document.createElement('transform');
				boxRotationZ.setAttribute('id', 'boxRotationZ_' + i);
				boxRotationZ.setAttribute('rotation', '0 0 1 ' + (Math.random() * 2 * Math.PI - Math.PI));
				boxRotationZ.appendChild(shape);
						
				
				var boxRotationY = document.createElement('transform');
				boxRotationY.setAttribute('id', 'boxRotationY_' + i);
				boxRotationY.setAttribute('rotation', '0 1 0 ' + (Math.random() * 2 * Math.PI - Math.PI));
				boxRotationY.appendChild(boxRotationZ);	
				
				
				var boxRotationX = document.createElement('transform');
				boxRotationX.setAttribute('id', 'boxRotationX_' + i);
				boxRotationX.setAttribute('rotation', '1 0 0 ' + (Math.random() * 2 * Math.PI - Math.PI));
				boxRotationX.appendChild(boxRotationY);
				

				var boxTranslation = document.createElement('transform');
				boxTranslation.setAttribute('id', 'box_' + i);
				boxTranslation.setAttribute('translation', '0 0 0');
				boxTranslation.appendChild(boxRotationX);			
				
				
				documentFragment.appendChild(boxTranslation);		
				self.cubes.push('box_' + i); 
			} //ends for
			
			
			//boxes.setAttribute('id', 'lastBox_' + i);
			
			self.content.appendChild(documentFragment);
			
			
			
		}	
		
	}; //ends placeCubes()
	
	
	
	/**
	 * Updates cubes position at the scene depending on spread value.
	 */		
	var updateCubesPosition = function() {
		
		for (var i = 1; i < self.cubes.length; i++) {	
			var randomValue = Math.floor((Math.random() * 100) + 1);	//random number from 1 to 100
			var randomX = (((randomValue % 2) == 0) ? 1 : -1) * 5 * randomValue;
			
			randomValue = Math.floor((Math.random() * 100) + 1);	
			var randomY = (((randomValue % 2) == 0) ? 1 : -1) *5 * randomValue;
			
			randomValue = Math.floor((Math.random() * 100) + 1);	
			var randomZ = (((randomValue % 2) == 0) ? 1 : -1) * 5 * randomValue;
			
			document.getElementById('box_' + i).setAttribute('translation', randomX + ' ' + randomY + ' ' + randomZ);	
		} //ends for i
			
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
		
		ev.preventDefault(); //avoids scrollbar moving when the mouse is above the containeR
			
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
	
	
	

} // ends CubeSample
