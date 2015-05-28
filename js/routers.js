App.VentasRoute = Ember.Route.extend({
  	model: function() { 
  		return this.store.find('venta');
  	}
});



// App.VentaRoute = Ember.Route.extend({
// 	model: function (params) {    
//     return this.store.find('provincia');
// 	}
// });

App.Router.map(function () {  
  this.route('ventas');
  // this.route('venta', {path: 'ventas/:venta_id'}),  
});


