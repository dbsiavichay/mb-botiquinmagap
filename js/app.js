var App = Ember.Application.create();

//App.ApplicationAdapter = DS.FixtureAdapter.extend();

App.ApplicationAdapter = DS.DjangoRESTAdapter.extend({
    host: 'http://127.0.0.1:8000'
});

Ember.Inflector.inflector.irregular('venta', 'ventas');
Ember.Inflector.inflector.irregular('asociacion', 'asociaciones');
Ember.Inflector.inflector.irregular('provincia', 'provincias');
Ember.Inflector.inflector.irregular('canton', 'cantones');
