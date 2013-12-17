define(["debug", "three", "config", "network"], function (Debug, three, config, network) {
	var debug = new Debug("scene");
	var v = function (x, y, z) {
		return new three.Vertex (new three.Vector3(x, y, z));
	};
	var SceneManager = function () {
		this.entities = {};
	};
	SceneManager.prototype.setup = function (container) {
		this.container = container;
		this.renderer = new three.WebGLRenderer();
		this.camera = new three.PerspectiveCamera (
			config.camera.fov,
			config.camera.aspect,
			config.camera.near,
			config.camera.far );
		this.camera.position.set(30, 100, 300);
		this.camera.up = new three.Vector3 (0, 1, 0);
		this.camera.lookAt (new three.Vector3(0, 0, 0));
		this.scene = new three.Scene();
		this.scene.add (this.camera);

		this.camera.position.z = 300;
		this.renderer.setSize (config.screenSize.x, config.screenSize.y);
		var pointLight = new three.PointLight(0xFFFFFF);

		pointLight.position.x = 10;
		pointLight.position.y = 50;
		pointLight.position.z = 130;

		this.scene.add (pointLight);



		var planeGeometry = new three.PlaneGeometry(300, 300);
		var planeMat = new three.MeshNormalMaterial();

		this.plane = new three.Mesh(planeGeometry, planeMat);
		this.plane.overDraw = true;
		//this.scene.add (this.plane);
		this.container.append (this.renderer.domElement);

		this.createAxis(v(-config.axisLength, 0, 0), v(config.axisLength, 0, 0), 0xFF0000);
		this.createAxis(v(0, -config.axisLength, 0), v(0, config.axisLength, 0), 0x00FF00);
		this.createAxis(v(0, 0, -config.axisLength), v(0, 0, config.axisLength), 0x0000FF);
		var that = this;
		network.subscribe ('gametick', function (data) {
			that.updateScene(data);
		});
	};

	SceneManager.prototype.updateScene = function (entities) {
		for (var i in entities) {
			var entity = entities[i];
			if (!this.entities[i]) {
				this.entities[i] = this.createEntity (entity.position, entity.renderer);
			} else {
				this.updateEntity (i, entity.position, entity.renderer);
			}
		}
	};

	SceneManager.prototype.createAxis = function (p1, p2, color) {
		var line, lineGeometry = new three.Geometry(),
		lineMat = new three.LineBasicMaterial ({color : color, lineWidth : 1});
		lineGeometry.vertices.push (p1, p2);
		line = new three.Line(lineGeometry, lineMat);
		this.scene.add (line);
	};

	SceneManager.prototype.createEntity = function (position, renderer) {
		var material = new three.MeshLambertMaterial ({
			color : parseInt(renderer.color, 16)
		});
		var sphere = new three.Mesh (
			new three.SphereGeometry (
				config.player.radius,
				config.player.segments,
				config.player.rings),
			material);
		this.scene.add(sphere);
		return sphere;
	};

	SceneManager.prototype.updateEntity = function (i, position, renderer) {
		var sphere = this.entities[i];
		sphere.position.x = position.x;
		sphere.position.y = position.y;
		sphere.position.z = position.z;
	};

	SceneManager.prototype.render = function () {
		this.renderer.render (this.scene, this.camera);
	};

	return new SceneManager();
});