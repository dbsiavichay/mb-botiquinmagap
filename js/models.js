App.Venta = DS.Model.extend({	
    fecha: DS.attr('string'),
    valor_total: DS.attr('string'),
    cliente: DS.belongsTo('cliente', {async: true}),
    asociacion: DS.belongsTo('asociacion', {async: true}),
    detalles: DS.hasMany('detalleVenta', {async: true})
});

App.DetalleVenta = DS.Model.extend({
	cantidad: DS.attr('string'),
	precio_unitario: DS.attr('string'),
	precio_total: DS.attr('string'),
	producto: DS.belongsTo('producto', {async: true}),
	venta: DS.belongsTo('venta', {async: true}),
	usos: DS.hasMany('uso', {async: true})
});

App.Producto = DS.Model.extend({
	nombre: DS.attr('string'),
	compuesto: DS.attr('string'),
	presentacion: DS.attr('string'),
	precio_referencial: DS.attr('string'),
	registro_sanitario: DS.attr('string'),
	medida: DS.belongsTo('medida', {async: true}),
	tipo: DS.belongsTo('tipo', {async: true}),
	grupo: DS.belongsTo('grupo', {async: true})
});

App.Medida = DS.Model.extend({
	nombre: DS.attr('string'),
});

App.Tipo = DS.Model.extend({
	nombre: DS.attr('string'),
});

App.Grupo = DS.Model.extend({
	nombre: DS.attr('string'),
});

App.Uso = DS.Model.extend({
	cantidad: DS.attr('string'),
	enfermedad: DS.belongsTo('enfermedad', {async: true}),
	especie: DS.belongsTo('especie', {async:true}),
	detalleVenta: DS.belongsTo('detalleVenta', {async: true})
});

App.Enfermedad = DS.Model.extend({
	nombre: DS.attr('string'),
});

App.Especie = DS.Model.extend({
	nombre: DS.attr('string'),
});

App.Cliente = DS.Model.extend({
	cedula: DS.attr('string'),
	nombre: DS.attr('string'),
	apellido: DS.attr('string'),
	nombre_completo: DS.attr('string'),
});

App.Asociacion = DS.Model.extend({	
	nombre: DS.attr('string'),
	responsable: DS.attr('string')
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