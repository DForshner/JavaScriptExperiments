
// TODO: one view per file

// Add close method to backbone view
Backbone.View.prototype.close = function(){
  this.remove();
  this.unbind();
  if (this.onClose) {
    this.onClose();
  }
}

var App = App || {};

(function (App, $, _, Backbone) {

  App.View = App.View || {}

  App.View.Comment = Backbone.View.extend({

    tagName: "li",

    className: "comment-line",

    template: _.template("<%= name %> - <%= content %> <button id=collapseBtn>-</button>"),

    events: {
      'click #collapseBtn': 'collapse'
    },

    render: function () {
      $(this.el).html(this.template(this.model.toJSON()));
      return this;
    },

    collapse: function() {
      this.trigger('comment-toggled', this.model.get('id'));
    },

    onClose: function() {
      console.log("Closing comment view", this.model.get('id'));
    }
  });

  App.View.Comments = Backbone.View.extend({

    tagName: "div", 

    className: "comments",

    initialize: function(option) {
      this.views = [];
      this.collection = option.collection;
    },

    render: function() {
      // Clean up old views before rendering new ones
      this.closeSubViews();
      // Create new views
      this.views = this.collection.map(this.createView, this);

      // Avoid multiple reflows
      var container = document.createDocumentFragment();
      _.each(this.views, function (view) {
        container.appendChild(view.render().el);
      });
      
      this.$el.append(container);

      return this;
    },

    createView: function (model) {
      return new App.View.Comment({model: model });
    },

    closeSubViews: function() {
      _.invoke(this.views, 'close');
      this.views.length = 0;
    },

    onClose: function() {
      console.log("Closing comments view");
      this.closeSubViews();
    }
  });

  App.View.Clinic = Backbone.View.extend({

    tagName: "div",
             
    template: _.template("Name: <%= name %> Location: <%= address %>"),

    initialize: function() {
      this.view = null;
      this.model.listenTo(this.model, "change", this.render);
    },

    render: function () {
      this.closeSubView();
      this.view = this.createView();

      $(this.el).html(this.template(this.model.toJSON()));
      this.$el.append(this.view.render().el);

      return this;
    },

    createView: function() {
      return new App.View.Comments({ collection: this.model.get("comments") }); 
    },

    closeSubView: function() {
      if (!this.view) {
        return;
      }
      this.view.close();
      this.view = null;
    },

    onClose: function() {
      console.log("Closing clinic view ", this.model.get("id"));
      this.closeSubView();
    }
  });

  App.View.Clinics = Backbone.View.extend({

    el: "#content",

    template: _.template("<div>Local Pet Clinics:</div><select id='clinicsDDL'></select><div id='clinic></div>'"),

    events: {
      'change #clinicsDDL': 'handleClinicSelected'
    },

    initialize: function() {
      this.clinicView = null;
      this.reset();
    },

    render: function (){
      this.$el.html(this.template());
      return this;
    },

    renderClinic: function(model) {
      this.closeSubView();
      this.clinicView = new App.View.Clinic({model: model});
      var dom = this.clinicView.render().el;
      this.$el.append(dom);
    },

    renderDropDown: function(){
      var clinics = { 0: "", 1: "Pet Health +", 2: "Anderson Pet Hospital", 3: "The Discount Pet Doctor" };
      $.each(clinics, function (key, value) {
        $("#clinicsDDL").append($("<option>", { value: key}).text(value)); 
      });
    },

    handleClinicSelected: function(evt) {
      var clinicId = $(evt.currentTarget).val();
      console.log("Clinic selected: ", clinicId);

      if (clinicId === "0") {
        this.closeSubView();
        this.$el.empty();
        this.reset();
        return;
      }

      var clinic = this.getFakeClinicData(clinicId);
      this.renderClinic(clinic);
    },

    reset: function() {
        this.render();
        this.renderDropDown();
    },

    getFakeClinicData: function(clinicId) {
      switch (parseInt(clinicId)) {
        case 1:
          var clinicComments = new App.Collection.Comments([
              new App.Model.Comment({ id: 11, content: "Great", name: "Dog Owner", data: "2014-01-01T00:00:00" }),
              new App.Model.Comment({ id: 12, content: "Awesome", name: "Cat Owner", data: "2014-02-02T00:00:00" })
          ]);
          return new App.Model.Clinic({ id: 1, name:  "Pet Health +", address: "Someplace expensive", comments: clinicComments });
          break;
        case 2: 
          var clinicComments = new App.Collection.Comments([
              new App.Model.Comment({ id: 21, content: "OK", name: "Dog Owner", data: "2014-01-01T00:00:00" }),
              new App.Model.Comment({ id: 22, content: "Decent", name: "Cat Owner", data: "2014-02-02T00:00:00" })
          ]);
          return new App.Model.Clinic({ id: 2, name: "Anderson Pet Hospital", address: "Mall", comments: clinicComments });
          break;
        case 3:
          var clinicComments = new App.Collection.Comments([
              new App.Model.Comment({ id: 31, content: "Questionable", name: "Dog Owner", data: "2014-01-01T00:00:00" }),
              new App.Model.Comment({ id: 32, content: "Meh", name: "Cat Owner", data: "2014-02-02T00:00:00" })
          ]);
          return new App.Model.Clinic({ id: 3, name: "The Discount Pet Doctor", address: "Slum", comments: clinicComments });
          break;
        default:
          throw "Unknown clinic Id: " + clinicId;
      }
    },

    closeSubView: function () {
      if (!this.clinicView) {
        return;
      }
      this.clinicView.close();
      this.clinicView = null;
    }
  });

})(App, $, _, Backbone);