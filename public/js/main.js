$(window).on('ready', function () {
	require.config({
		baseUrl : "/js",
		paths : {
			"io" : "/socket.io/socket.io",
			"debug" : "/libs/debug",
			"three" : "/libs/three"
		},
		shim : {
			"io" : {
				exports: "io"
			},
			"three" : {
				exports : "THREE"
			}
		}
	});
	require(["gameloop"], function (gameloop) {
		gameloop.setup(function () {
			gameloop.launch();
		});
	});
});