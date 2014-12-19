// vim: foldmethod=indent foldlevel=0

// Some useful data

var monthNames = [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ];
var monthNamesShort = [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ];
var weekdayNamesShort = [ 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun' ];
var phaseNames = [];
phaseNames['new'] = 'New Moon';
phaseNames['waxing'] = 'Waxing Moon';
phaseNames['full'] = 'Full Moon';
phaseNames['waning'] = 'Waning Moon';

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
    //nikaya: 'mahanikaya',
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

// === Helpers ===

function dateText(date) {
  var out = '';
  var isodate = date.toISOString().substr(0, 10);

  if (typeof MOONS[date.getFullYear()] === 'undefined') {
    return '<div class="datetext">'+date.getDate()+'</div>';
  }

  var moon = _.find(MOONS[date.getFullYear()].mahanikaya.phases, function(d){ return d.date === isodate; });
  var astro = _.find(MOONS[date.getFullYear()].astro.phases, function(d){ return d.date === isodate; });
  var major = _.find(MOONS[date.getFullYear()].mahanikaya.major, function(d){ return d.date === isodate; });

  if (typeof moon !== 'undefined') {
    out += '<div class="datetext '+moon.phase+'">&nbsp;</div>';
  } else {
    out += '<div class="datetext">'+date.getDate()+'</div>';
  }

  if (typeof astro !== 'undefined') {
    out += '<div class="astro '+astro.phase+'">&nbsp;</div>';
  }

  if (typeof major !== 'undefined') {
    out += '<div class="major">'+major.text+'</div>';
  }

  if (typeof moon !== 'undefined' && typeof moon.season !== 'undefined') {
    out += '<div class="season">'+moon.season;
    if (typeof moon.catudassi !== 'undefined' && moon.catudassi ) {
     out += '<br/>Cātudassī</div>';
    }
  }

  return out;
}

function dateTextListItem(date) {
  var out = '';
  var isodate = date.toISOString().substr(0, 10);

  out += '<ul class="datetext">';

  if (date.getDay() === 0) {
    out += '<li class="weekday">'+weekdayNamesShort[6]+'</li>';
  } else {
    out += '<li class="weekday">'+weekdayNamesShort[date.getDay()-1]+'</li>';
  }
  out += '<li class="date">'+monthNamesShort[date.getMonth()]+' '+date.getDate()+'</li>';

  if (typeof MOONS[date.getFullYear()] === 'undefined') {
    return out + '</ul>';
  }

  var moon = _.find(MOONS[date.getFullYear()].mahanikaya.phases, function(d){ return d.date === isodate; });
  var astro = _.find(MOONS[date.getFullYear()].astro.phases, function(d){ return d.date === isodate; });
  var major = _.find(MOONS[date.getFullYear()].mahanikaya.major, function(d){ return d.date === isodate; });

  if (typeof moon !== 'undefined') {
    out += '<li class="'+moon.phase+'">&nbsp;</li>';
  }

  if (typeof astro !== 'undefined') {
    out += '<li class="astro '+astro.phase+'">&nbsp;</li>';
  }

  if (typeof major !== 'undefined') {
    out += '<li class="major">'+major.text+'</li>';
  }

  if (typeof moon !== 'undefined' && typeof moon.season !== 'undefined') {
    out += '<li class="season">'+moon.season;
    if (typeof moon.catudassi !== 'undefined' && moon.catudassi ) {
     out += ' Cātudassī';
    }
    out += '</li>';
  }

  out += '</ul>';

  return out;
}

function calendarMonthTable(year, month) {
  month--;
  var monthStart = new Date(year, month, 1);
  if (month < 11) {
    var monthEnd = new Date(year, month+1, 0);
  } else {
    var monthEnd = new Date(year+1, 0, 0);
  }

  var out = "";

  out += '<table><thead>';

  // header with weekdays

  out += '<tr><th>' + weekdayNamesShort.join('</th><th>') + '</th></tr></thead>';

  out += '<tbody>';

  var d = new Date(monthStart);

  // first row with empties until month begins

  out += '<tr>';
  if (monthStart.getDay() === 0) {
    var empties = 6;
  } else {
    var empties = monthStart.getDay()-1;
  }

  for (i=0; i<empties; i++) {
    out += '<td></td>';
  }

  for (i=0; i<7-empties; i++) {
    out += '<td>'+dateText(d)+'</td>';
    d.setDate(d.getDate()+1);
  }

  out += '</tr>';

  // middle rows

  var untilDate = monthEnd.getDate() - monthEnd.getDay();

  d.setDate(d.getDate()-1);
  while (d.getDate()+6 <= untilDate) {
    out += '<tr>';
    for (i=0; i<7; i++) {
      d.setDate(d.getDate()+1);
      out += '<td>'+dateText(d)+'</td>';
    }
    out += '</tr>';
  }

  // last row with empties

  if (d < monthEnd) {
    out += '<tr>';
    empties = 7-monthEnd.getDay();
    for (i=0; i<7; i++) {
      if (i<7-empties) {
        d.setDate(d.getDate()+1);
        out += '<td>'+dateText(d)+'</td>';
      } else {
        out += '<td></td>';
      }
    }
    out += '</tr>';
  }

  out += '</tbody></table>';

  return out;
}

function calendarMonthList(year, month) {
  month--;
  var monthStart = new Date(year, month, 1);
  if (month < 11) {
    var monthEnd = new Date(year, month+1, 0);
  } else {
    var monthEnd = new Date(year+1, 0, 0);
  }

  var out = "";

  out += "<ul>";

  var d = new Date(monthStart);
  d.setDate(d.getDate()-1);
  while (d < monthEnd) {
    d.setDate(d.getDate()+1);
    out += '<li>'+dateTextListItem(d)+'</li>';
  }

  out += "</ul>";

  return out;
}

function calendarYearTable(year) {
  var out = "";
  var omega = "";

  for (month = 1; month <= 12; month++) {
    omega = "";
    if (month % 3 === 0) {
      omega = ' omega';
      out += "<section>";
    }
    out += "<div class='month_wrap"+omega+"'>";
    out += "<h3>"+monthNames[month-1]+"</h3>";
    out += calendarMonthTable(year, month);
    out += "</div>";
    if (month % 3 === 0) {
      out += "</section>";
    }
  }

  return out;
}

// TODO: almost the same as calendarYearTable()
function calendarYearList(year) {
  var out = "";
  var omega = "";

  for (month = 1; month <= 12; month++) {
    omega = "";
    if (month % 3 === 0) {
      omega = ' omega';
      out += "<section>";
    }
    out += "<div class='month_wrap"+omega+"'>";
    out += "<h3>"+monthNames[month-1]+"</h3>";
    out += calendarMonthList(year, month);
    out += "</div>";
    if (month % 3 === 0) {
      out += "</section>";
    }
  }

  return out;
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

App.Views.CalendarMessage = Backbone.View.extend({
  initialize: function(type) {
    this.template = _.template(tpl.get(type));
  },

  render: function(message) {
    this.$el.html(this.template({ message: message }));
    return this;
  },
});

App.Views.Calendar = Backbone.View.extend({
  initialize: function(view) {
    this.view = view;
  },
  render: function(data) {
    var html = "";
    if (App.config.period === 'Month') {
      if (this.view === 'Table') {
       html = calendarMonthTable(App.config.year, App.config.month);
      } else {
       html = calendarMonthList(App.config.year, App.config.month);
      }
    } else {
      if (this.view === 'Table') {
       html = calendarYearTable(App.config.year);
      } else {
       html = calendarYearList(App.config.year);
      }
    }
    this.$el.html(html);
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

    if (typeof MOONS[App.config.year] !== 'undefined' && MOONS[App.config.year].status !== 'confirmed') {
      var message = "";
      switch(MOONS[App.config.year].status) {
        case 'provisional':
        default:
          var message = "Provisional uposatha dates";
      }
      $('#calendar_message').html(new App.Views.CalendarMessage('flash-info').render(message).el);
    } else {
      $('#calendar_message').html('');
    }

    var view = (App.config.listView === true) ? 'List' : 'Table';
    $('#calendar').html(new App.Views.Calendar(view).render(App.config).el);

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

        default:
          console.log(e.keyCode);
          return;
      }
    } else {
      switch (e.keyCode) {
        // left, up, k
        case 37:
        case 38:
        case 75:
          this.prevYear();
          break;

        // right, down, j
        case 39:
        case 40:
        case 74:
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

