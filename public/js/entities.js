define(['underscore'], function (_) {


	var Entities = function () {
		this.dataModels = {};
		this.assemblages = {};
		this.entities = {};
		this.ids = [0];
		this.entityCounter = 0;
	};
	Entities.prototype.createEntity = function (label) {
		//var id = mongoose.Types.ObjectId();
		var id = this.ids.length;
		this.ids.push(0);
		var entity = {
			_id : id, 
			label : label,
			components : [],
			data : []
		};
		/*
		var entity = new Entity({
			label : label,
			"_id" : id
		});
		*/
		this.entities[id] = entity;
		return entity;
	};
	Entities.prototype.destroyEntity = function (entity) {
		for (var i = 0; i < entity.components.length; i++) {
			compo = entity.components[i] + 'datas';
			var dataId = entity.data[i];
			this[compo][dataId].remove();
			delete this[compo][dataId];
		}
		//entity.remove();
		delete this.entities[entity._id];
	};
	Entities.prototype.createComponent = function (component, data) {
		//var dataId = mongoose.Types.ObjectId();
		var dataId = this.ids.length;
		this.ids.push (0);
		var d = _.extend({"_id" : dataId}, data);

		if (!this.dataModels[component]) {
			return false;
		}
		/*
		var comp = new this.dataModels[component](d);
		*/
		var comp = d;
		this[component + 'datas'][dataId] = comp
		return comp;
	};
	Entities.prototype.destroyComponent = function (component, id) {
		//this[component + 'datas'][id].remove();
		delete this[component + 'datas'][id];
	};
	Entities.prototype.createComponentAndAddTo = function (component, entity, data) {
		var comp = this.createComponent (component, data)
		comp._entityId = entity._id;
		entity.components.push (component);
		entity.data.push (comp._id);
		return entity;
	};
	Entities.prototype.addMultipleComponents = function (components, entity, data) {
		for (var i = 0; i < components.length; i++) {
			var d = (typeof data == 'object') ? data[i] : false;
			var comp = this.createComponent (components[i], d);
			entity.components.push (components[i]);
			entity.data.push (comp._id);
		};
		return entity;
	}
	Entities.prototype.createAssemblage = function (asm, data, label) {
		var components = this.assemblages[asm].components;
		var lab = label ? label : this.assemblages[asm].defaultLabel;
		var entity = this.createEntity(label);
		this.addMultipleComponents (components, entity, data);
		return entity;
	};
	Entities.prototype.getComponentId = function (entity, component) {
		var dataId = 0;
		return _.indexOf(entity.components, component);
	};
	Entities.prototype.getComponentsForEntity = function (entity, components) {
		var results = {};
		for (var i = 0; i < entity.components.length; i++) {
			if (components.indexOf(entity.components[i]) != -1) {
				var compo = entity.components[i];
				results[compo] = this.getComponentData (compo, entity.data[i]);
			};
		};
		return  results;
	};

	Entities.prototype.getComponentForEntity = function (entity, component) {
		var dataId = this.getComponentId(entity, component);
		return this.getComponentData (component, dataId);
	};
	Entities.prototype.setComponentForEntity = function (entity, component, data) {
		var dataId = this.getComponentId(entity, component);
		this.setComponentData (component, _.extend(data, {"_id" : dataId}));
	};
	Entities.prototype.getComponentData = function (component, id) {
		return this[component + 'datas'][id];
	}
	Entities.prototype.setComponentData = function (component, data) {
		_.extend(this[component + 'datas'][data._id], data);
		//this[component + 'datas'][data._id].save();
	};
	Entities.prototype.getComponentsData = function (component) {
		return this[component + 'datas'];
	};
	Entities.prototype.setComponentsData = function (component, data) {
		for (var i = 0; i < data.length; i++) {
			this.setComponentData (component, data[i]);
		};
	};
	Entities.prototype.registerComponent = function (data) {
		var dataModel = mongoose.model(data.name + 'datas', data.schema);
		this.dataModels[data.name] = dataModel;
		this[data.name + 'datas'] = {};
	}
	Entities.prototype.registerAssemblages = function (assemblages) {
		for (var i in assemblages) {
			this.assemblages[i] = assemblages[i];
		};
	};
	return new Entities();
});
