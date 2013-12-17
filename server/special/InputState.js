var InputState = function (inputs) {
	this.mouse = {
		position : {
			x : inputs.mouse.position.x | 0,
			y : inputs.mouse.position.y | 0
		},
		buttons : {
			left : inputs.mouse.buttons.left | 0,
			right : inputs.mouse.buttons.right | 0,
			middle : inputs.mouse.buttons.middle | 0
		}
	};
	this.keyboard = {
		buttons : inputs.buttons
	};
	this.gamepad = inputs.gamepad;
};

module.exports = InputState;