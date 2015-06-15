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

      var calcularTotal = function () {
        var t = parseFloat(this.get('cantidad')) * parseFloat(this.get('precio_unitario'))
        if(isNaN(t)) t = 0;
        this.set('precio_total', t);
      }

      detalle.addObserver('cantidad', calcularTotal);
      detalle.addObserver('precio_unitario', calcularTotal);

      this.get('venta').get('detalles').forEach(function (item) {
        item.set('esActual', false);
      });

      this.get('venta').get('detalles').insertAt(0, detalle);
    },
    editarDetalle: function (detalle) {
      this.set('error', false);
      this.get('venta').get('detalles').forEach(function (item) {
        item.set('esActual', false);
      });
      detalle.set('esActual', true);
    },
    eliminarDetalle: function (detalle) {
      this.set('error', false);
      this.get('venta').get('detalles').removeObject(detalle);
    },
    guardar: function (router) {      
      var venta = this.get('venta');
      var total = 0;      
      var promises = [];
      venta.get('detalles').forEach(function (detalle) {
        total+= parseFloat(detalle.get('precio_total'));
      })

      venta.set('valor_total', total);        

      venta.save().then(function (_venta) {
        venta.get('detalles').forEach(function (detalle) {
          detalle.set('venta', _venta);

          detalle.save().then(function (_detalle) {

            detalle.get('usos').forEach(function (uso) {              
              var data = {
                cantidad: uso.get('cantidad'),
                enfermedad: uso.get('enfermedad').get('id'),
                especie: uso.get('especie').get('id'),
                detalle_venta: _detalle.get('id')
              }
              $.post('http://192.168.1.30:8000/usosventa/', data);
            });

          });                    
        });        
      });
      this.replaceRoute('ventas');
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
      this.set('cliente', cliente);            
    },
    aceptar: function () {
      if(this.get('cliente')){
        this.get('venta').set('cliente', this.get('cliente'));
      }      
    }    
  }
});

App.ModalProductoController = Ember.ArrayController.extend({  
  actions: {
    filtrar: function () {
      this.set('productos', this.store.find('producto', {keyword: this.get('keyword')}));
    },
    seleccionar: function (producto) {      
      this.set('producto', producto);           
    },
    aceptar: function () {
      if(this.get('producto')){
        this.get('detalle').set('producto', this.get('producto'));
        this.get('detalle').set('precio_unitario', this.get('producto').get('precio_referencial'));
      }      
    }    
  }
});

App.ModalUsoController = Ember.ArrayController.extend({  
  actions: {
    agregar: function () {
      this.set('error', false);
      this.get('detalle').get('usos').forEach(function (item) {
        item.set('esActual', false);
      });

      if(!this.get('uso').cantidad || !this.get('uso').enfermedad || !this.get('uso').especie){
        this.set('error', true);
        this.set('mensajeError', 'Todos los campos son obligatorios');
        return;
      }

      var u = this.store.createRecord('uso');
      u.set('cantidad', this.get('uso').cantidad);
      u.set('enfermedad', this.get('uso').enfermedad);
      u.set('especie', this.get('uso').especie);
      this.get('detalle').get('usos').addObject(u);
      this.set('uso', {});
    },
    editar: function (uso) {      
      var index = this.get('detalle').get('usos').indexOf(uso);
      this.get('detalle').get('usos').forEach(function (item) {
        item.set('esActual', false);
      });
      this.get('detalle').get('usos').objectAt(index).set('esActual', true);
    },
    eliminar: function (uso) {
      this.get('detalle').get('usos').removeObject(uso);
    },
    aceptar: function () {
      if(this.get('producto')){
        this.get('detalle').set('producto', this.get('producto'));
        this.get('detalle').set('precio_unitario', this.get('producto').get('precio_referencial'));
      }      
    }    
  }
});

