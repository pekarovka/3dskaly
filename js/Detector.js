/**
 *prevzato od mr.doob / http://mrdoob.com/
 */

var Detector = {

	canvas: !! window.CanvasRenderingContext2D,
	webgl: ( function () { try { return !! window.WebGLRenderingContext && !! document.createElement( 'canvas' ).getContext( 'experimental-webgl' ); } catch( e ) { return false; } } )(),
	workers: !! window.Worker,
	fileapi: window.File && window.FileReader && window.FileList && window.Blob,

	getWebGLErrorMessage: function () {

		var element = document.createElement( 'div' );
		element.className = "stripes";
		var innerElement = document.createElement( 'div' );
		innerElement.id = 'webgl-error-message';
		element.appendChild(innerElement);
		/*element.id = 'webgl-error-message';
		element.style.fontFamily = 'monospace';
		element.style.fontSize = '13px';
		element.style.fontWeight = 'normal';
		element.style.textAlign = 'left';
		element.style.background = '#fff';
		element.style.color = '#000';
		element.style.padding = '1.5em';
		element.style.width = '500px';
		element.style.margin = '5em auto 0';*/

		if ( ! this.webgl ) {

			/*element.innerHTML = window.WebGLRenderingContext ? [
				'Your graphics card does not seem to support <a href="http://khronos.org/webgl/wiki/Getting_a_WebGL_Implementation" style="color:#000">WebGL</a>.<br />',
				'Find out how to get it <a href="http://get.webgl.org/" style="color:#000">here</a>.'
			].join( '\n' ) : [
				'Your browser does not seem to support <a href="http://khronos.org/webgl/wiki/Getting_a_WebGL_Implementation" style="color:#000">WebGL</a>.<br/>',
				'Find out how to get it <a href="http://get.webgl.org/" style="color:#000">here</a>.'
			].join( '\n' );*/
			
			//czech version
			innerElement.innerHTML = window.WebGLRenderingContext ? [				
				'<p class="message"><strong>K zobrazení tohoto 3D obsahu je potřeba technologie <a target="_blank" class="ext_blank" href="http://www.khronos.org/webgl/wiki/BlacklistsAndWhitelists">WebGL</a></strong>, která Vašim prohlížečem není podporována nebo v prohlížeči není aktivována a případně není podporována Vaší grafickou kartou.</p><p class="topmargin">Nyní máte následující možnosti:</p>',
				'<ol><li><h4>Změnit internetový prohlížeč</h4><p>Pokud používáte internetový prohlížeč, který technologii WebGL nepodporuje (např.&nbsp;Internet Explorer verze 10 a nižší), doporučujeme nainstalovat a použít jeden z prohlížečů <a target="_blank" class="ext_blank" href="www.google.com/intl/cs/chrome/"><strong>Google Chrome</strong></a> nebo <a target="_blank" class="ext_blank" href="http://www.mozilla.org/cs/firefox/new/"><strong>Mozilla Firefox</strong></a>.</p></li>',
				'<li><h4>Aktivace WebGL</h4><p>Pokud již používáte Google Chrome nebo Mozilla Firefox, můžete se pokusit WebGL ve Vašem prohlížeči aktivovat podle jednoho z těchto postupů:</p><p><strong>Chrome</strong> &ndash; Do řádku pro zadání internetové adresy zadejte chrome://flags a stiskněte klávesu Enter. Povolte pomocí příslušného nastavení WebGL. Restartujte prohlížeč.</p><p><strong>FireFox</strong> &ndash; Do řádku pro zadání internetové adresy zadejte about:config a stiskněte klávesu Enter. Do vyhledávacího řádku napište webgl.force-enabled. Povolte pomocí příslušného nastavení WebGL. </p></li></ol>',
				'<p class="topmargin">Jestliže se Vám nepodařilo 3D obsah zprovoznit podle bodu 1. ani 2., WebGL pravděpodobně není podporováno Vaší grafickou kartou (<a target="_blank" class="ext_blank" href="http://www.khronos.org/webgl/wiki/BlacklistsAndWhitelists">seznam nepodporovaných GPU</a>).</p>'				
				
			].join( '\n' ) : [
				'<p class="message"><strong>K zobrazení tohoto 3D obsahu je potřeba technologie <a target="_blank" class="ext_blank" href="http://www.khronos.org/webgl/wiki/BlacklistsAndWhitelists">WebGL</a></strong>, která ve Vašem prohlížeči pravděpodobně není podporována.</p><p class="topmargin">Nyní máte následující možnosti:</p>',
				'<ol><li><h4>Změnit internetový prohlížeč</h4><p>Pokud používáte internetový prohlížeč, který technologii WebGL nepodporuje (např.&nbsp;Internet Explorer verze 10 a nižší), doporučujeme nainstalovat a použít jeden z prohlížečů <a target="_blank" class="ext_blank" href="www.google.com/intl/cs/chrome/"><strong>Google Chrome</strong></a> nebo <a target="_blank" class="ext_blank" href="http://www.mozilla.org/cs/firefox/new/"><strong>Mozilla Firefox</strong></a>.</p></li></ol>',
				'<p class="topmargin">Jestliže se Vám nepodařilo 3D obsah zprovoznit podle bodu 1., WebGL pravděpodobně není podporováno Vaší grafickou kartou (<a target="_blank" class="ext_blank" href="http://www.khronos.org/webgl/wiki/BlacklistsAndWhitelists">seznam nepodporovaných GPU</a>).</p>'
			].join( '\n' );					

		}

		return element;

	},

	addGetWebGLMessage: function ( parameters ) {

		var parent, id, element;

		parameters = parameters || {};

		parent = parameters.parent !== undefined ? parameters.parent : document.body;
		id = parameters.id !== undefined ? parameters.id : 'oldie';

		element = Detector.getWebGLErrorMessage();
		element.id = id;

		parent.appendChild( element );

	}

};
