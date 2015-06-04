App.Router.map(function () {  
  this.route('ventas');
  this.route('venta', {path: 'ventas/:venta_id'});
});

App.ApplicationRoute = Ember.Route.extend({
  actions: {
    openModal: function(name, model) {
      var controller;
      if(name==='modal-cliente'){
        controller = this.controllerFor('modalCliente');
        controller.set('clientes', this.store.find('cliente'));
        controller.set('venta', model)
      }      
      this.render(name, {
        into: 'application',
        outlet: 'modal',
        controller: controller
      });
    },   
    closeModal: function() {
      this.disconnectOutlet({
        outlet: 'modal',
        parentView: 'application'
      });
    }
  }
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
    return this.store.createRecord('venta', {});
  },
  setupController: function(controller, model) {     
    controller.set('venta', model);
    controller.set('asociaciones', this.store.find('asociacion')); 
  },
});






