var App = Ember.Application.create();

App.Router.map(function () {	
	this.route('ventas');
	this.route('venta', {path: 'ventas/:venta_id'});
});