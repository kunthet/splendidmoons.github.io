
var HTML_HEAD_DATA = '';

// The user might have FontAwesome in their CSS already. Just add info in README.md to load it if not.
//var HTML_HEAD_DATA = '<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css">'

var CSS_DATA = "/* === js template split === */";
CSS_DATA = Base64.decode(CSS_DATA);

var TEMPLATES_DATA = "/* === js template split === */";
TEMPLATES_DATA = Base64.decode(TEMPLATES_DATA);

var DAYS_DATA = "/* === js template split === */";
DAYS_DATA = Base64.decode(DAYS_DATA);

var DAYS = [];
DAYS = JSON.parse(DAYS_DATA);

// Some useful data

var monthNames = [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ];
var monthNamesShort = [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ];
var weekdayNamesShort = [ 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun' ];
var phaseNames = [];
phaseNames['new'] = 'New Moon';
phaseNames['waxing'] = 'Waxing Moon';
phaseNames['full'] = 'Full Moon';
phaseNames['waning'] = 'Waning Moon';

var seasonName = [ "", "Hemanta", "Gimha", "Vassāna" ];

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
    $('head').append(HTML_HEAD_DATA);
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

// Timezone offset problem:
// date:               Wed Jul 01 2015 00:00:00 GMT+0100 (WEST)
// date.toISOString(): 2015-06-30T23:00:00.000Z

Date.prototype.isoShort = function() {
  var year = this.getFullYear();
  // January is 0
  var month = this.getMonth() + 1;
  if (month < 10) { month = "0" + month; }
  var date = this.getDate();
  if (date < 10) { date = "0" + date; }
  return [ year, month, date ].join("-");
}

function seasonText(day) {
  return day.UposathaMoon[0].U_Days +
    " days, " +
    seasonName[day.UposathaMoon[0].LunarSeason] +
    " " +
    day.UposathaMoon[0].S_Number +
    "/" +
    day.UposathaMoon[0].S_Total;
}

function dateTd(date) {
  var out = '';

  var isodate = date.isoShort();
  var today = new Date();

  var tdclasses = [];

  if (isodate === today.isoShort()) {
    tdclasses.push('today');
  }

  if (tdclasses.length > 0) {
    out += '<td class="'+tdclasses.join(' ')+'">';
  } else {
    out += '<td>';
  }

  if (typeof DAYS[date.getFullYear()] === 'undefined') {
    return out+'<div class="datetext">'+date.getDate()+'</div></td>';
  }

  var day = _.find(DAYS[date.getFullYear()], function(d){ return d.Date.substr(0, 10) === isodate; });

  if (typeof day === 'undefined') {
    out += '<div class="datetext">'+date.getDate()+'</div>';
    out += '</td>';
    return out;
  }

  var addDateText = true;

  if (typeof day.UposathaMoon !== 'undefined') {
    addDateText = false;
    out += '<div class="datetext '+day.UposathaMoon[0].Phase+'">&nbsp;</div>';
  }

  if (typeof day.HalfMoon !== 'undefined') {
    addDateText = false;
    out += '<div class="datetext '+day.HalfMoon[0].Phase+'">&nbsp;</div>';
  }

  if (addDateText) {
    out += '<div class="datetext">'+date.getDate()+'</div>';
  }

  if (typeof day.AstroMoon !== 'undefined') {
    out += '<div class="astro '+day.AstroMoon[0].Phase+'">&nbsp;</div>';
  }

  if (typeof day.MajorEvents !== 'undefined') {
    for (var i=0; i<day.MajorEvents.length; i++) {
      out += '<div class="major">'+day.MajorEvents[i].Summary+'</div>';
    }
  }

  if (typeof day.UposathaMoon !== 'undefined') {
    out += '<div class="season">'+seasonText(day)+'</div>';
  }

  out += '</td>';

  return out;
}

function dateLi(date) {
  var out = '';
  var isodate = date.isoShort();

  // Being compact is more useful: only show uposathas and half-moons and major events
  var day = _.find(DAYS[date.getFullYear()], function(d){
    var ok = false;
    if (d.Date.substr(0, 10) === isodate) {
      if (typeof d.UposathaMoon !== 'undefined') {
        ok = true;
      }
      if (typeof d.HalfMoon !== 'undefined') {
        ok = true;
      }
      if (typeof d.MajorEvents !== 'undefined') {
        ok = true;
      }
    }
    return ok;
  });

  // Find any day with information for this date
  //var day = _.find(DAYS[date.getFullYear()], function(d){ return d.Date.substr(0, 10) === isodate; });

  if (typeof day === 'undefined') {
    return out;
  }

  out += '<li>';

  out += '<ul class="datetext">';

  if (date.getDay() === 0) {
    out += '<li class="weekday">'+weekdayNamesShort[6]+'</li>';
  } else {
    out += '<li class="weekday">'+weekdayNamesShort[date.getDay()-1]+'</li>';
  }
  out += '<li class="date">'+monthNamesShort[date.getMonth()]+' '+date.getDate()+'</li>';

  if (typeof DAYS[date.getFullYear()] === 'undefined') {
    return out + '</ul></li>';
  }

  // at least an empty li.moon for horizontal alignment
  var classes = ['moon'];

  if (typeof day.UposathaMoon !== 'undefined') {
    classes.push(day.UposathaMoon[0].Phase);
  }

  if (typeof day.HalfMoon !== 'undefined') {
    classes.push(day.HalfMoon[0].Phase);
  }

  out += '<li class="'+classes.join(' ')+'">&nbsp;</li>';

  // NOTE: this confuses the compact list, because we are not showing all astro phases.
  /*
  if (typeof day.AstroMoon !== 'undefined') {
    out += '<li class="astro '+day.AstroMoon[0].Phase+'">&nbsp;</li>';
  }
  */

  out += '<ul class="notes">';

  if (typeof day.MajorEvents !== 'undefined') {
    for (var i=0; i<day.MajorEvents.length; i++) {
      out += '<li class="major">'+day.MajorEvents[i].Summary+'</li>';
    }
  }

  if (typeof day.UposathaMoon !== 'undefined') {
    out += '<li class="season">'+seasonText(day)+'</li>';
  }

  out += '</ul>';

  out += '</ul>';
  out += '</li>';

  return out;
}

function calendarMonthTable(year, month) {
  month--;
  var monthStart = new Date(year, month, 1);
  // new Date with datestring?
  // Date.parse! returns utc
  //monthStart.setUTCDate(monthStart);
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

  var i;
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

  var month;
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

  var month;
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
        html = "<div class='list_month_wrap'>" + calendarMonthList(SplendidMoons.config.year, SplendidMoons.config.month) + "</div>";
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
    "calendar/:year": "calendarYear"
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

    if (typeof DAYS[SplendidMoons.config.year] !== 'undefined') {
      $("#calendar").removeClass('nodata');

      var messages = [];
      // TODO: display predicted message
      /*
      if (DAYS[SplendidMoons.config.year].mahanikaya.properties.status !== 'confirmed') {
        switch(DAYS[SplendidMoons.config.year].mahanikaya.properties.status) {
          case 'provisional':
            messages.push([ 'flash-info', "Provisional uposatha dates" ]);
        }
      }
      */

      /* TODO: find a less obtrusive way to display these.
      if (DAYS[SplendidMoons.config.year].mahanikaya.properties.adhikamasa === true) {
        messages.push([ 'flash-info', SplendidMoons.config.year+" has an adhikamāsa extra month." ]);
      }

      if (DAYS[SplendidMoons.config.year].mahanikaya.properties.adhikavara === true) {
        messages.push([ 'flash-info', SplendidMoons.config.year+" has an adhikavāra extra day." ]);
      }
      */

      var i;
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

    if (typeof DAYS[SplendidMoons.config.year] === 'undefined') {
      console.log("no data for year: " + SplendidMoons.config.year);
      this.calendarDoRender();
      // TODO: load from the admin app url
      /*
      var that = this;
      $.ajax({
        url: '/data/moons-'+SplendidMoons.config.year+'.json',
        success: function(data) {
          DAYS[SplendidMoons.config.year] = data;
        },
        complete: function() {
          that.calendarDoRender();
        },
        dataType: 'json',
      });
      */
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
          //console.log(e.keyCode);
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
          //console.log(e.keyCode);
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

