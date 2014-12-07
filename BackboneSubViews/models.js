
// TODO: one model per file

var App = App || {};

(function (App, $, _, Backbone) {

  App.Model = App.Model || {}

  App.Model.Clinic = Backbone.Model.extend({
    defaults: {
      id: 0,
      name: "",
      address: "",
      comments: void 0,
    }
  });

  App.Collection = App.Collection || {}

  App.Collection.Clinics = Backbone.Collection.extend({
    model: App.Model.Clinic
  });

  App.Model.Comment = Backbone.Model.extend({
    defaults: {
      id: 0,
      content: "",
      name: "",
      date: ""
    }
  });

  App.Collection.Comments = Backbone.Collection.extend({
    model: App.Model.Comment
  });

})(App, $, _, Backbone);