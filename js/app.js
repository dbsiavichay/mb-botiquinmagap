var App = Ember.Application.create();

//App.ApplicationAdapter = DS.FixtureAdapter.extend();

App.ApplicationAdapter = DS.DjangoRESTAdapter.extend({
    host: 'http://192.168.1.31:8000'
});

Ember.Inflector.inflector.irregular('venta', 'ventas');
Ember.Inflector.inflector.irregular('detalle_venta', 'detallesventa');
Ember.Inflector.inflector.irregular('producto', 'productos');
Ember.Inflector.inflector.irregular('medida', 'medidasproducto');
Ember.Inflector.inflector.irregular('tipo', 'tiposproducto');
Ember.Inflector.inflector.irregular('grupo', 'gruposproducto');
Ember.Inflector.inflector.irregular('uso', 'usosventa');
Ember.Inflector.inflector.irregular('enfermedad', 'enfermedades');
Ember.Inflector.inflector.irregular('especie', 'especies');
Ember.Inflector.inflector.irregular('cliente', 'clientes');
Ember.Inflector.inflector.irregular('asociacion', 'asociaciones');