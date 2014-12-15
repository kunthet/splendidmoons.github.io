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
  // TODO: override with local config
  config: {
    year: year,
    month: month,
    listView: false,
    showLogo: true,
    showSiteTitle: true,
    showMenu: true,
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

App.Views.Calendar = Backbone.View.extend({
  initialize: function(view) {
    this.template = _.template(tpl.get('calendar'+view));
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
    App.config.period = 'Month';
    this.template = _.template(tpl.get('appview'));
    $('#thaimoons').html(this.template(App.config));
  },

  index: function() {
    this.navigate('calendar/'+App.config.year+'/'+App.config.month, { trigger: true });
  },

  calendarRender: function() {
    $('#calendar_nav').html(new App.Views.CalendarNav().render(App.config).el);
    var view = (App.config.listView === true) ? 'List' : 'Table';
    $('#calendar').html(new App.Views.Calendar(App.config.period + view).render(App.config).el);

    var that = this;
    $('#calendar_period > ul > li.year > label > span.prev').parent().click(function(){ that.prevYear(); });
    $('#calendar_period > ul > li.year > label > span.next').parent().click(function(){ that.nextYear(); });
    $('#calendar_period > ul > li.month > label > span.prev').parent().click(function(){ that.prevMonth(); });
    $('#calendar_period > ul > li.month > label > span.next').parent().click(function(){ that.nextMonth(); });
    $('input:checkbox[name=list_view]').change(function(){ that.listViewChanged($(this)); });
    $('input:radio[name=period]').change(function(){ that.periodChanged($(this)); });
  },

  calendarMonth: function(year, month) {
    if (typeof year !== 'number') { year = new Number(year); }
    if (typeof month !== 'number') { month = new Number(month); }
    App.config.year = year;
    App.config.month = month;
    App.config.period = 'Month';
    this.calendarRender();
  },

  calendarYear: function(year) {
    if (typeof year !== 'number') { year = new Number(year); }
    App.config.year = year;
    App.config.period = 'Year';
    this.calendarRender();
  },

  listViewChanged: function(obj) {
    App.config.listView = obj.prop('checked');
    this.calendarRender();
  },

  periodChanged: function(obj) {
    App.config.period = obj.val();
    this.calendarRender();
  },

  go: function() {
    if (App.config.period === 'Month') {
      this.navigate('calendar/'+App.config.year+'/'+App.config.month, { trigger: true, replace: true });
    } else {
      this.navigate('calendar/'+App.config.year, { trigger: true, replace: true });
    }
  },

  prevYear: function() {
    App.config.year--;
    this.go();
  },

  nextYear: function() {
    App.config.year++;
    this.go();
  },

  prevMonth: function() {
    App.config.month--;
    if (App.config.month < 1) { App.config.year--; App.config.month = 12; }
    this.go();
  },

  nextMonth: function() {
    App.config.month++;
    if (App.config.month > 12) { App.config.year++; App.config.month = 1; }
    this.go();
  },

  keyNav: function(e) {
    if (App.config.period === 'Month') {
      switch (e.keyCode) {
        // left, up, k
        case 37:
        case 38:
        case 75:
          this.prevMonth();
          break;

        // right, down, j
        case 39:
        case 40:
        case 74:
          this.nextMonth();
          break;

        // PgUp
        case 33:
          this.prevYear();
          break;

        // PgDown
        case 34:
          this.nextYear();
          break;

        default:
          console.log(e.keyCode);
          return;
      }
    } else {
      switch (e.keyCode) {
        // left, up, k, PgUp
        case 37:
        case 38:
        case 75:
        case 33:
          this.prevYear();
          break;

        // right, down, j, PgDown
        case 39:
        case 40:
        case 74:
        case 34:
          this.nextYear();
          break;

        default:
          console.log(e.keyCode);
          return;
      }
    }
  },

});

// === It lives! ===

tpl.loadTemplates(function(){
  App.theRouter = new App.Router;
  Backbone.history.start();

  $('body').keydown(function(e){ App.theRouter.keyNav(e); });

  // refills/vertical_tabs.js

  $(".js-vertical-tab-content").hide();
  $(".js-vertical-tab-content:first").show();

  /* if in tab mode */
  $(".js-vertical-tab").click(function(event) {
    event.preventDefault();

    $(".js-vertical-tab-content").hide();
    var activeTab = $(this).attr("rel");
    $("#"+activeTab).show();

    $(".js-vertical-tab").removeClass("is-active");
    $(this).addClass("is-active");

    $(".js-vertical-tab-accordion-heading").removeClass("is-active");
    $(".js-vertical-tab-accordion-heading[rel^='"+activeTab+"']").addClass("is-active");
  });

  /* if in accordion mode */
  $(".js-vertical-tab-accordion-heading").click(function(event) {
    event.preventDefault();

    $(".js-vertical-tab-content").hide();
    var accordion_activeTab = $(this).attr("rel");
    $("#"+accordion_activeTab).show();

    $(".js-vertical-tab-accordion-heading").removeClass("is-active");
    $(this).addClass("is-active");

    $(".js-vertical-tab").removeClass("is-active");
    $(".js-vertical-tab[rel^='"+accordion_activeTab+"']").addClass("is-active");
  });

});

