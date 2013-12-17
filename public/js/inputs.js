define (["debug", "keyboard", "mouse"], function (Debug, keyboard, mouse) {
	var debug = new Debug('inputs');
	var InputManager = function () {
		this.keyboard = keyboard;
		this.mouse = mouse;
		this.gamepad = {};
	};
	InputManager.prototype.setup = function (canvas) {
		var that = this;
		debug.log("Setup");
		that.mouse.setup (canvas);
		canvas.on('keydown', function (event) {
			that.keyboard.keydown(event);
		});
		canvas.on('keyup', function (event) {
			that.keyboard.keyup(event);
		});
		$(window).on('mouseup', function (event) {
			that.mouse.windowup(event);
		});
		canvas.on('mouseenter', function (event) {
			that.mouse.enter(event);
		})
		canvas.on('mouseout', function (event) {
			that.mouse.out (event);
		});
		canvas.on('mousemove', function (event) {
			that.mouse.move (event);
		});
		canvas.on('mousedown', function (event) {
			that.mouse.down (event);
			event.preventDefault();
			return false;
		});
		canvas.bind('contextmenu', function (e) {
			return false;
		})
		canvas.on('mouseup', function (event) {
			that.mouse.up(event);
		});

	};

	return new InputManager();
});