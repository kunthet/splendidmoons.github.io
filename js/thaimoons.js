// vim: foldmethod=indent foldlevel=1

// === Templates ===

var tpl = {
  templates: {},

  // TODO: couldn't afterSuccessCallback be replaced with a deferred?
  loadTemplates: function(afterSuccessCallback) {
    var that = this;
    $.ajax({
      url: '/templates.html',
      success: function(data) {
        $('body').append(data);
        $("script[id$='-template']").each(function(){
          var name = $(this).attr('id').replace(/-template$/, '');
          that.templates[name] = $(this).html();
        });
        afterSuccessCallback();
      },
      error: function() {
        $('#thaimoons').html("<div class='flash-error'><span>Error: can't retreive templates.</span></div>");
      },
    });
  },

  get: function(name) {
    var ret = this.templates[name];
    if (typeof ret !== 'undefined') {
      return ret;
    } else {
      return "<span>Missing template: "+name+"</span>";
    }
  },
}

// === Views ===

var CalendarNavView = Backbone.View.extend({
  initialize: function() {
    this.template = _.template(tpl.get('calendarnav'));
  },
  render: function(year, month) {
    this.$el.html(this.template({ year: year, month: month }));
    return this;
  },
});

var CalendarMonthTableView = Backbone.View.extend({
  initialize: function() {
    this.template = _.template(tpl.get('calendarmonthtable'));
  },
  render: function(year, month) {
    this.$el.html(this.template({ year: year, month: month }));
    return this;
  },
});

// === Router ===

var AppRouter = Backbone.Router.extend({
  routes: {
    "": "index",
    "calendar/:year/:month": "calendarMonth",
    "calendar/:year": "calendarYear",
  },

  initialize: function() {
    $('#thaimoons').html(tpl.get('appview'));

    var today = new Date();
    this.year = today.getFullYear();
    this.month = today.getMonth();
    this.month++;
  },

  index: function() {
    this.navigate('calendar/'+this.year+'/'+this.month, { trigger: true });
  },

  calendarMonth: function(year, month) {
    this.year = year;
    this.month = month;
    $('#calendar_nav').html(new CalendarNavView().render(year, month).el);
    $('#calendar').html(new CalendarMonthTableView().render(year, month).el);
  },

  calendarYear: function(year) {
  },
});

// === It lives! ===

var App = '';

tpl.loadTemplates(function(){
  App = new AppRouter;
  Backbone.history.start();
});

// === Key bindings for navigation ===

function keyNav(e) {
  var year = App.year;
  var month = App.month;

  switch (e.keyCode) {

    // left
    case 37:
    // up
    case 38:
    // k
    case 75:
      month = --month;
      if (month < 1) { year--; month = 12; }
      break;

    // right
    case 39:
    // down
    case 40:
    // j
    case 74:
      month = ++month;
      if (month > 12) { year++; month = 1; }
      break;

    // PgUp
    case 33:
      var year = --year;
      break;

    // PgDown
    case 34:
      var year = ++year;
      break;

    default:
      console.log(e.keyCode);
      return;
  }
  App.navigate('calendar/'+year+'/'+month, { trigger: true });
}

// === DOM ready ===

$(function() {

  $('body').keydown(function(e){ keyNav(e); });

});

