define ([], function () {
	var Keyboard = function () {
		this.buttons = {};
	};
	Keyboard.prototype.keydown = function (event) {
		this.buttons[event.keyCode] = 1;
	};
	Keyboard.prototype.keyup = function (event) {
		this.buttons[event.keyCode] = 0;
	};
	Keyboard.prototype.getData = function () {
		return {buttons : this.buttons};
	};

	return new Keyboard();
});