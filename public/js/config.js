define ([], function () {
	var config = {
		mainContainer : "#mainContainer",
		canvasId : "gameScreen",
		hudId : "gameHud",
		screenSize :  {
			x : 800,
			y : 600
		},
		camera : {
			fov : 45,
			aspect : 800/600,
			near : 0.1,
			far : 10000
		},
		player : {
			radius : 10,
			segments : 16,
			rings : 16
		},
		axisLength : 100
	};

	return config;
});