
var App = App || {};

App.Main = (function(App) {
  var init = function() {
    this.clinicsView = new App.View.Clinics();
  };

  return {
    init: init
  };
}(App));

$(function() {
  App.Main.init();
});