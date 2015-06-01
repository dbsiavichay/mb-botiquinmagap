App.VentaController = Ember.ArrayController.extend({
  actions: {
    buscarCliente: function () {      
      this.controllerFor('clientes').set('clientes', this.store.find('cliente'));
      this.controllerFor('clientes').set('error', false);
      this.controllerFor('clientes').set('mensajeError', '');      
      this.transitionToRoute('clientes');
    },
  }
});

App.ClientesController = Ember.ArrayController.extend({
  actions: {
    filtrarClientes: function () {
      this.set('clientes', this.store.find('cliente', {filtro: this.get('keyword')}));
    },
    seleccionar: function (cliente) {
      this.set('error', false);      
      this.set('cliente', cliente);            
    },
    aceptar: function () {
      if(!this.get('cliente')){
        this.set('error', true);
        this.set('mensajeError', 'Debe seleccionar un cliente.')
        return;        
      }
      
      this.controllerFor('venta').set('clienteSeleccionado', this.get('cliente'));
      this.transitionToRoute('venta', 'nuevo');
    },
    cancelar: function () {
      this.transitionToRoute('venta', 'nuevo');
    }
  }
});

