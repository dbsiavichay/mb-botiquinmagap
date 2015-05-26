App.VentasRoute = Ember.Route.extend({
  	model: function() { 
  		return $.ajax('http://localhost:8000/ventas/');
  	}
});

App.VentaRoute = Ember.Route.extend({
	model: function (params) {
		return {}	
	}
});
