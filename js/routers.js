App.Router.map(function () {  
  this.route('ventas');
  this.route('venta', {path: 'ventas/:venta_id'});
  this.route('clientes');
});

App.VentasRoute = Ember.Route.extend({
    model: function() { 
      return this.store.find('venta');
    },    
});

App.VentaRoute = Ember.Route.extend({
  model: function (params) {
    var id = params.venta_id;
    if(id!='nuevo'){
      return this.store.find('venta', id);
    }    
  },
  setupController: function(controller, model) {     
    controller.set('venta', model);
    controller.set('asociaciones', this.store.find('asociacion')); 
  },
});



