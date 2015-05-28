App.Venta = DS.Model.extend({	
    fecha: DS.attr('string'),
    valor_total: DS.attr('string'),
    cliente: DS.belongsTo('cliente', {async: true}),
    asociacion: DS.belongsTo('asociacion', {async: true})
});


App.Cliente = DS.Model.extend({
	cedula: DS.attr('string'),
	nombre: DS.attr('string'),
	apellido: DS.attr('string')
});

App.Asociacion = DS.Model.extend({	
	nombre: DS.attr('string'),
	responsable: DS.attr('string')
});

App.Provincia = DS.Model.extend({
	codigo: DS.attr('string'),
	nombre: DS.attr('string'),
	cantones: DS.hasMany('canton', {async: true})
});

App.Canton = DS.Model.extend({
	codigo: DS.attr('string'),
	nombre: DS.attr('string'),
	provincia: DS.belongsTo('provincia', {async: true})
});

// App.ProvinciasController = Ember.ArrayController.extend({
//   actions: {
//     crear: function() {       
//       var codigo = this.get('codigo');
//       var nombre = this.get('nombre');
            
//       var provincia = this.store.createRecord('provincia', {
//         codigo: codigo,
//         nombre: nombre
//       });
      
//       this.set('codigo', '');
//       this.set('nombre', '');

      
//       provincia.save();
//     }
//   }
// });