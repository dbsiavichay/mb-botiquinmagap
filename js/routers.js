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
      if(name==='modal-producto'){
        controller = this.controllerFor('modalProducto');
        controller.set('productos', this.store.find('producto'));
        controller.set('detalle', model);        
      } 

      if(name==='modal-uso'){
        controller = this.controllerFor('modalUso');
        controller.set('enfermedades', this.store.find('enfermedad'));
        controller.set('especies', this.store.find('especie'));
        controller.set('detalle', model);
        controller.get('detalle').get('usos').pushObjects(this.store.find('uso', {detalleventa: model.get('id')}));
        controller.set('uso', {});        
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
    //return this.store.createRecord('venta', {});
  },
  setupController: function(controller, model) {    
    controller.set('venta', model);
    controller.get('venta').get('detalles').pushObjects(this.store.find('detalleVenta', {venta: model.get('id')}));    
    controller.set('asociaciones', this.store.find('asociacion')); 
  },
});






