App.VentaController = Ember.ArrayController.extend({
  actions: {
    agregarDetalle: function () { 
      this.set('error', false);
      var detalle = this.store.createRecord('detalleVenta', {
        cantidad: '',
        precio_unitario: '',
        precio_total: '',
        esActual: true,
      });

      this.get('venta').get('detalles').forEach(function (item) {
        item.set('esActual', false);
      });
      this.get('venta').get('detalles').insertAt(0, detalle);
    }
  }
});

App.ProductosController = Ember.ArrayController.extend({
  actions: {
    filtrarProductos: function () {
      this.set('productos', this.store.find('producto', {keyword: this.get('keyword')}));
    },
    seleccionar: function (producto) {
      this.set('error', false);      
      this.set('producto', producto);            
    },
    aceptar: function () {
      if(!this.get('producto')){
        this.set('error', true);
        this.set('mensajeError', 'Debe seleccionar un producto.')
        return;        
      }

      var index = this.controllerFor('venta').get('venta').get('detalles').indexOf(this.get('detalle'));
      this.controllerFor('venta').get('venta').get('detalles').objectAt(index).set('producto', this.get('producto'));
      this.transitionToRoute('venta', 'nuevo');
    },
    cancelar: function () {
      this.transitionToRoute('venta', 'nuevo');
    }
  }
});

//Modal controllers
App.ModalClienteController = Ember.ArrayController.extend({  
  actions: {
    filtrar: function () {
      this.set('clientes', this.store.find('cliente', {filtro: this.get('keyword')}));
    },
    seleccionar: function (cliente) {
      this.set('error', false);      
      this.set('cliente', cliente);            
    },
    aceptar: function () {
      if(this.get('cliente')){
        this.get('venta').set('cliente', this.get('cliente'));
      }      
    }    
  }
});




