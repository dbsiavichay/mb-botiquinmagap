App.Venta = DS.Model.extend({
	fecha:    DS.attr('date'),
	valor_total: DS.attr('string'),
	cliente_nombre: DS.attr('string'),
	asociacion_nombre: DS.attr('string'),
	asociacion: DS.belongsTo('asociacion')	
});

App.Asociacion = DS.Model.extend({
  nombre: DS.attr('string'),
  responsable: DS.attr('string'),
});