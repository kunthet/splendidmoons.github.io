// vim: foldmethod=indent foldlevel=1

// Some useful data

var monthNames = [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ];
var weekdayNamesShort = [ 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun' ];

var today = new Date();
var year = today.getFullYear();
var month = today.getMonth();
month++;

var App = {
  // TODO: persist this with LocalStore
  config: {
    year: year,
    month: month,
    yearAsList: false,
    nikaya: 'mahanikaya',
  },

  Views: {},
};

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

App.Views.CalendarNav = Backbone.View.extend({
  initialize: function() {
    this.template = _.template(tpl.get('calendarNav'));
  },

  render: function(data) {
    if (typeof data.month !== 'undefined') {
      data.monthName = monthNames[data.month-1];
    }
    data.yearBE = data.year + 543;

    this.$el.html(this.template(data));

    return this;
  },
});

App.Views.CalendarMonthTable = Backbone.View.extend({
  initialize: function() {
    this.template = _.template(tpl.get('calendarMonthTable'));
  },
  render: function(data) {
    this.$el.html(this.template(data));
    return this;
  },
});

App.Views.CalendarYearAsList = Backbone.View.extend({
  initialize: function() {
    this.template = _.template(tpl.get('calendarYearAsList'));
  },
  render: function(data) {
    this.$el.html(this.template(data));
    return this;
  },
});

// === Router ===

App.Router = Backbone.Router.extend({
  routes: {
    "": "index",
    "calendar/:year/:month": "calendarMonth",
    "calendar/:year": "calendarYear",
  },

  initialize: function() {
    $('#thaimoons').html(tpl.get('appview'));
  },

  // Controllers

  index: function() {
    this.navigate('calendar/'+App.config.year+'/'+App.config.month, { trigger: true });
  },

  calendarRender: function() {
    $('#calendar_nav').html(new App.Views.CalendarNav().render(App.config).el);
    if (App.config.yearAsList) {
      $('#calendar').html(new App.Views.CalendarYearAsList().render(App.config).el);
    } else {
      $('#calendar').html(new App.Views.CalendarMonthTable().render(App.config).el);
    }

    var that = this;
    $('input:checkbox[name=year_as_list]').change(function(){ that.yearAsListChanged($(this)); });
    $('select[name=nikaya]').change(function(){ that.nikayaChanged($(this)); });
  },

  calendarMonth: function(year, month) {
    App.config.yearAsList = false;
    if (typeof year !== 'number') { year = new Number(year); }
    if (typeof month !== 'number') { month = new Number(month); }
    App.config.year = year;
    App.config.month = month;
    this.calendarRender();
  },

  calendarYear: function(year) {
    App.config.yearAsList = true;
    if (typeof year !== 'number') { year = new Number(year); }
    App.config.year = year;
    this.calendarRender();
  },

  yearAsListChanged: function(obj) {
    App.config.yearAsList = obj.prop('checked');
    if (App.config.yearAsList) {
      this.navigate('calendar/'+App.config.year, { trigger: true });
    } else {
      this.navigate('calendar/'+App.config.year+'/'+App.config.month, { trigger: true });
    }
  },

  nikayaChanged: function(obj) {
    App.config.nikaya = obj.children('option:selected').first().val();
    this.calendarRender();
  },

  keyNav: function(e) {
    var year = App.config.year;
    var month = App.config.month;

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
        year--;
        break;

      // PgDown
      case 34:
        year++;
        break;

      default:
        console.log(e.keyCode);
        return;
    }

    if (App.config.yearAsList) {
      this.navigate('calendar/'+year, { trigger: true });
    } else {
      this.navigate('calendar/'+year+'/'+month, { trigger: true });
    }
  },
});

// === It lives! ===

tpl.loadTemplates(function(){
  App.theRouter = new App.Router;
  Backbone.history.start();

  $('#thaimoons > nav li.menu').click(function(){
    $(this).toggleClass('active');
    $('#pages').fadeToggle();
  });

  $('body').keydown(function(e){ App.theRouter.keyNav(e); });

});

