define (["debug", "config", "inputs", "gameScreen", "network", "sceneManager"], 
	function (Debug, config, inputManager, gameScreen, network, sceneManager) {
	var debug =  new Debug('gameloop');
	var inputs = function () {

	}
	var sendData = function () {

	};
	var animate = function () {

	};
	var render = function () {
		sceneManager.render();
	};
	var sendInputs = function () {
		var inputs = {
			keyboard : inputManager.keyboard.getData(),
			mouse : inputManager.mouse.getData(),
			gamepad : inputManager.gamepad
		};
		network.emit('input', inputs);
	}
	var gameloop = function () {
		inputs();
		sendData();
		animate();
		render();

		window.requestAnimationFrame (gameloop);
	};
	var setup = function (callback) {
		gameScreen.setup();
		var container = gameScreen.getContainer();
		network.setup(function () {
			sceneManager.setup(container);
			inputManager.setup(container);
			callback();
		});
	};
	var launch = function () {
		gameloop();
		setInterval(function () {
			sendInputs();
		}, 15);
	};
	return {
		setup : setup,
		launch : launch
	};
});