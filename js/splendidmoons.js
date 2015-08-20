
var CSS_DATA = "/* === js template split === */";
CSS_DATA = Base64.decode(CSS_DATA);

var TEMPLATES_DATA = "/* === js template split === */";
TEMPLATES_DATA = Base64.decode(TEMPLATES_DATA);

var MOONS_DATA = "/* === js template split === */";
MOONS_DATA = Base64.decode(MOONS_DATA);

var MOONS = [];
MOONS[2015] = JSON.parse(MOONS_DATA);

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

var SplendidMoons = {
  // TODO: persist this with LocalStore
  config: {
    year: SplendidMoons.config.year || year,
    month: SplendidMoons.config.month || month,
    listView: SplendidMoons.config.listView || false,
    showLogo: SplendidMoons.config.showLogo || false,
    showSiteTitle: SplendidMoons.config.showSiteTitle || false,
    showMenu: SplendidMoons.config.showMenu || true
  },

  Views: {}
};

// === Templates ===

var tpl = {
  templates: {},

  // TODO: couldn't afterSuccessCallback be replaced with a deferred?
  /*
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
        $('#splendidmoons').html("<div class='flash-error'><span>Error: can't retreive templates.</span></div>");
      },
    });
  },
  */

  loadTemplates: function(afterSuccessCallback) {
    var that = this;
    $('head').append("<style>" + CSS_DATA + "</style>");
    $('body').append(TEMPLATES_DATA);
    $("script[id$='-template']").each(function(){
        var name = $(this).attr('id').replace(/-template$/, '');
        that.templates[name] = $(this).html();
    });
    afterSuccessCallback();
  },

  get: function(name) {
    var ret = this.templates[name];
    if (typeof ret !== 'undefined') {
      return ret;
    } else {
      return "<span>Missing template: "+name+"</span>";
    }
  }
};

// === Helpers ===

function dateTd(date) {
  var out = '';
  var isodate = date.toISOString().substr(0, 10);
  var today = new Date();

  var tdclasses = [];

  if (isodate === today.toISOString().substr(0, 10)) {
    tdclasses.push('today');
  }

  if (tdclasses.length > 0) {
    out += '<td class="'+tdclasses.join(' ')+'">';
  } else {
    out += '<td>';
  }

  if (typeof MOONS[date.getFullYear()] === 'undefined') {
    return out+'<div class="datetext">'+date.getDate()+'</div></td>';
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

  out += '</td>';

  return out;
}

function dateLi(date) {
  var out = '';
  var isodate = date.toISOString().substr(0, 10);

  out += '<li>';

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
  out += '</li>';

  return out;
}

function calendarMonthTable(year, month) {
  month--;
  var monthStart = new Date(year, month, 1);
  var monthEnd;
  if (month < 11) {
    monthEnd = new Date(year, month+1, 0);
  } else {
    monthEnd = new Date(year+1, 0, 0);
  }

  var out = "";

  out += '<table><thead>';

  // header with weekdays

  out += '<tr><th>' + weekdayNamesShort.join('</th><th>') + '</th></tr></thead>';

  out += '<tbody>';

  var d = new Date(monthStart);

  // first row with empties until month begins

  out += '<tr>';
  var empties;
  if (monthStart.getDay() === 0) {
    empties = 6;
  } else {
    empties = monthStart.getDay()-1;
  }

  for (i=0; i<empties; i++) {
    out += '<td></td>';
  }

  for (i=0; i<7-empties; i++) {
    out += dateTd(d);
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
      out += dateTd(d);
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
        out += dateTd(d);
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
  var monthEnd;
  if (month < 11) {
    monthEnd = new Date(year, month+1, 0);
  } else {
    monthEnd = new Date(year+1, 0, 0);
  }

  var out = "";

  out += "<ul>";

  var d = new Date(monthStart);
  d.setDate(d.getDate()-1);
  while (d < monthEnd) {
    d.setDate(d.getDate()+1);
    out += dateLi(d);
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
    out += "<div class='yeartable_month_wrap"+omega+"'>";
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
    out += "<div class='yearlist_month_wrap"+omega+"'>";
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

SplendidMoons.Views.CalendarNav = Backbone.View.extend({
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

SplendidMoons.Views.CalendarMessage = Backbone.View.extend({
  initialize: function(type) {
    this.template = _.template(tpl.get(type));
  },

  render: function(message) {
    this.$el.html(this.template({ message: message }));
    return this;
  },
});

SplendidMoons.Views.Calendar = Backbone.View.extend({
  initialize: function(view) {
    this.view = view;
  },
  render: function(data) {
    var html = "";
    if (SplendidMoons.config.period === 'Month') {
      if (this.view === 'Table') {
        html = calendarMonthTable(SplendidMoons.config.year, SplendidMoons.config.month);
      } else {
        html = calendarMonthList(SplendidMoons.config.year, SplendidMoons.config.month);
      }
    } else {
      if (this.view === 'Table') {
       html = calendarYearTable(SplendidMoons.config.year);
      } else {
       html = calendarYearList(SplendidMoons.config.year);
      }
    }
    this.$el.html(html);
    return this;
  },
});

// === Router ===

SplendidMoons.Router = Backbone.Router.extend({
  routes: {
    "": "index",
    "calendar/:year/:month": "calendarMonth",
    "calendar/:year": "calendarYear",
  },

  initialize: function() {
    SplendidMoons.config.period = 'Month';
    this.template = _.template(tpl.get('appview'));
    $('#splendidmoons').html(this.template(SplendidMoons.config));
    $('#splendidmoons > nav li.print').click(function(e){ e.preventDefault(); window.print(); });
  },

  index: function() {
    this.navigate('calendar/'+SplendidMoons.config.year+'/'+SplendidMoons.config.month, { trigger: true });
  },

  calendarDoRender: function() {
    $('#calendar_message').html('');

    if (typeof MOONS[SplendidMoons.config.year] !== 'undefined') {
      $("#calendar").removeClass('nodata');

      var messages = [];
      if (MOONS[SplendidMoons.config.year].mahanikaya.properties.status !== 'confirmed') {
        switch(MOONS[SplendidMoons.config.year].mahanikaya.properties.status) {
          case 'provisional':
            messages.push([ 'flash-info', "Provisional uposatha dates" ]);
        }
      }

      /* TODO: find a less obtrusive way to display these.
      if (MOONS[SplendidMoons.config.year].mahanikaya.properties.adhikamasa === true) {
        messages.push([ 'flash-info', SplendidMoons.config.year+" has an adhikamāsa extra month." ]);
      }

      if (MOONS[SplendidMoons.config.year].mahanikaya.properties.adhikavara === true) {
        messages.push([ 'flash-info', SplendidMoons.config.year+" has an adhikavāra extra day." ]);
      }
      */

      for (i=0; i<messages.length; i++) {
        $('#calendar_message').append(new SplendidMoons.Views.CalendarMessage(messages[i][0]).render(messages[i][1]).el);
      }
    } else {
      $("#calendar").addClass('nodata');
    }

    var view = (SplendidMoons.config.listView === true) ? 'List' : 'Table';
    // TODO: it adds an extra div as the default el
    $('#calendar').html(new SplendidMoons.Views.Calendar(view).render(SplendidMoons.config).el);

    var that = this;
    $('#calendar_period > ul > li.year > label > span.prev').parent().click(function(){ that.prevYear(); });
    $('#calendar_period > ul > li.year > label > span.next').parent().click(function(){ that.nextYear(); });
    $('#calendar_period > ul > li.month > label > span.prev').parent().click(function(){ that.prevMonth(); });
    $('#calendar_period > ul > li.month > label > span.next').parent().click(function(){ that.nextMonth(); });
    $('input:checkbox[name=list_view]').change(function(){ that.listViewChanged($(this)); });
    $('input:radio[name=period]').change(function(){ that.periodChanged($(this)); });
  },

  calendarRender: function() {
    $('#calendar_nav').html(new SplendidMoons.Views.CalendarNav().render(SplendidMoons.config).el);

    if (typeof MOONS[SplendidMoons.config.year] === 'undefined') {
      var that = this;
      $.ajax({
        url: '/data/moons-'+SplendidMoons.config.year+'.json',
        success: function(data) {
          MOONS[SplendidMoons.config.year] = data;
        },
        complete: function() {
          that.calendarDoRender();
        },
        dataType: 'json',
      });
    } else {
      this.calendarDoRender();
    }
  },

  calendarMonth: function(year, month) {
    if (typeof year !== 'number') { year = Number(year); }
    if (typeof month !== 'number') { month = Number(month); }
    SplendidMoons.config.year = year;
    SplendidMoons.config.month = month;
    SplendidMoons.config.period = 'Month';
    this.calendarRender();
  },

  calendarYear: function(year) {
    if (typeof year !== 'number') { year = Number(year); }
    SplendidMoons.config.year = year;
    SplendidMoons.config.period = 'Year';
    this.calendarRender();
  },

  listViewChanged: function(obj) {
    SplendidMoons.config.listView = obj.prop('checked');
    this.calendarRender();
  },

  periodChanged: function(obj) {
    SplendidMoons.config.period = obj.val();
    this.calendarRender();
  },

  go: function() {
    if (SplendidMoons.config.period === 'Month') {
      this.navigate('calendar/'+SplendidMoons.config.year+'/'+SplendidMoons.config.month, { trigger: true, replace: true });
    } else {
      this.navigate('calendar/'+SplendidMoons.config.year, { trigger: true, replace: true });
    }
  },

  prevYear: function() {
    SplendidMoons.config.year--;
    this.go();
  },

  nextYear: function() {
    SplendidMoons.config.year++;
    this.go();
  },

  prevMonth: function() {
    SplendidMoons.config.month--;
    if (SplendidMoons.config.month < 1) { SplendidMoons.config.year--; SplendidMoons.config.month = 12; }
    this.go();
  },

  nextMonth: function() {
    SplendidMoons.config.month++;
    if (SplendidMoons.config.month > 12) { SplendidMoons.config.year++; SplendidMoons.config.month = 1; }
    this.go();
  },

  keyNav: function(e) {
    if (SplendidMoons.config.period === 'Month') {
      switch (e.keyCode) {
        // left, k
        case 37:
        case 75:
          this.prevMonth();
          break;

        // right, j
        case 39:
        case 74:
          this.nextMonth();
          break;

        default:
          console.log(e.keyCode);
          return;
      }
    } else {
      switch (e.keyCode) {
        // left, k
        case 37:
        case 75:
          this.prevYear();
          break;

        // right, j
        case 39:
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
  SplendidMoons.theRouter = new SplendidMoons.Router();
  Backbone.history.start();

  $('body').keydown(function(e){ SplendidMoons.theRouter.keyNav(e); });

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

