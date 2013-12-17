define (["debug"], function (Debug) {
	var debug = new Debug("mouse");
	var Mouse = function () {
		this.position = {
			x : 0,
			y : 0
		};
		this.buttons = {
			"left" : 0,
			"right" : 0,
			"middle" : 0
		};
		this.buttonsMap = ["middle", "left", "right"];
		this.canvas;
		this.isIn = false;
	};
	Mouse.prototype.getData = function () {
		return {
			position : this.position,
			buttons : this.buttons
		};
	};
	Mouse.prototype.enter = function (event) {
		this.isIn = true;
	};
	Mouse.prototype.out = function (event) {
		this.isIn = false;
	};
	Mouse.prototype.move = function (event) {
		var off = this.canvas.offset();
		this.position.x = event.pageX - off.left;
		this.position.y = event.pageY - off.top;
	};
	Mouse.prototype.down = function (event) {
		this.buttons[this.buttonsMap[event.which]] = 1;
	};
	Mouse.prototype.up = function (event) {
		this.buttons[this.buttonsMap[event.which]] = 0;
	}
	Mouse.prototype.windowup = function (event) {
		if (!this.isIn) {
			this.buttons[this.buttonsMap[event.which]] = 0;
		}
	};
	Mouse.prototype.setup = function (canvas) {
		this.canvas = canvas;
	}

	return new Mouse();

})