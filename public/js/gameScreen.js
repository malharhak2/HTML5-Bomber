define (["debug", "config"], function (Debug, config) {
	var debug = new Debug("gScreen")
	var GameScreen = function () {

	};

	GameScreen.prototype.setup = function () {
		debug.log("Setup");
		this.mainContainer = $(config.mainContainer);
		/*
		this.canvas = $("<canvas />").attr ({
			"width" : config.canvasSize.x,
			"height" : config.canvasSize.y
		}).css({

		}).appendTo(this.mainContainer);
		this.ctx = this.canvas[0].getContext('2d');
		*/
	};
	GameScreen.prototype.getCanvas = function () {
		return this.canvas;
	};

	GameScreen.prototype.getContainer = function () {
		return this.mainContainer;
	};
	
	return new GameScreen();
});