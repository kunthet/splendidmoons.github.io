
// hey

$(function(){

  // Some useful data

  var monthNames = [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ];
  var weekdayNamesShort = [ 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun' ];

  // Helper functions

  function dateText(date) {
    var out = '';
    var isodate = date.toISOString().substr(0, 10);

    var m = _.find(MOONS['mahanikaya'][date.getFullYear()], function(d){ return d[0] === isodate; });
    if (typeof m === 'undefined') {
      out += '<div class="datetext">'+date.getDate()+'</div>';
    } else {
      out += '<div class="datetext '+m[1]+'">&nbsp;</div>';
    }

    var a = _.find(MOONS['astro'][date.getFullYear()], function(d){ return d[0] === isodate; });
    if (typeof a !== 'undefined') {
      out += '<div class="astro '+a[1]+'">&nbsp;</div>';
    }

    var n = _.find(NOTES['mahanikaya'][date.getFullYear()], function(d){ return d[0] === isodate; });
    if (typeof n !== 'undefined') {
      out += '<div class="notes">'+n[1]+'</div>';
    }

    if (typeof m !== 'undefined') {
      if (m[1] === 'full') {
        out += '<div class="season">15th Hemanta n/m</div>';
      } else if (m[1] === 'new') {
        // TODO
      }
    }

    return out;
  }

  function renderCalendarMonth(year, month) {
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

  // TODO: this is only a dummy with one month for now.
  function renderCalendarYear(year) {
    var yearStart = new Date(year, 1, 1);
    var yearEnd = new Date(year+1, 0, 0);

    var out = '';

    var d = new Date(year, 1, 1);
    var janEnd = new Date(year, 2, 0);
    var m = 0;

    out += '<table><thead>';
    out += '<tr>';
    // month name column
    out += '<th></th>';
    while (d < janEnd) {
      // TODO: this is only necessary b/c weekdayNamesShort start with
      // Monday, but JS week starts on Sunday. Change weekdayNamesShort
      // and align where used later.
      m = (d.getDay() === 0) ? 6 : d.getDay()-1;
      out += '<th>' + weekdayNamesShort[m] + '</th>';
      d.setDate(d.getDate()+1);
    }
    out += '</tr></thead>';

    d = new Date(year, 1, 1);

    out += '<tbody><tr>';
    out += '<td>'+monthNames[0]+'</td>';
    while (d < janEnd) {
      // TODO: this is only necessary b/c weekdayNamesShort start with
      // Monday, but JS week starts on Sunday. Change weekdayNamesShort
      // and align where used later.
      m = (d.getDay() === 0) ? 6 : d.getDay()-1;
      out += '<td>' + dateText(d) + '</td>';
      d.setDate(d.getDate()+1);
    }

    out += '</tr></tbody>';

    return out;
  }

  // == Models ==
  // ...
  // === Collections ===
  // ...

  // === Views ===

  var CalendarMonthView = Backbone.View.extend({
    el: $('#calendar'),

    initialize: function() {
      this.calendar_nav = $('#calendar_nav');
    },

    render: function(year, month) {
      if (typeof year !== 'number') { var year = new Number(year); }
      if (typeof month !== 'number') { var month = new Number(month); }
      // TODO: no no no
      this.month = month;
      this.year = year;
      month--;
      var yearBE = year + 543;
      // TODO: no no no
      this.calendar_nav.html('<ul><li>'+year+' / '+yearBE+'</li><li>'+monthNames[month]+'</li></ul>');
      this.$el.html(renderCalendarMonth(year, month));
      return this;
    },

  });

  var CalendarYearView = Backbone.View.extend({
    el: $('#calendar'),

    initialize: function() {
      this.calendar_nav = $('#calendar_nav');
    },

    render: function(year) {
      if (typeof year !== 'number') { var year = new Number(year); }
      // TODO: no no no
      this.year = year;
      var yearBE = year + 543;
      // TODO: no no no
      this.calendar_nav.html('<ul><li>'+year+' / '+yearBE+'</li></ul>');
      this.$el.html(renderCalendarYear(year));
      return this;
    },

  });

  // === The App ==

  var AppView = Backbone.View.extend({
    el: $("#thai_moons_app"),

    initialize: function() {
      this.calendar_nav = $('#calendar_nav');

      // TODO: Do this with the calendar nav elements in the DOM for
      // auto-update and easy retrieve
      var today = new Date();
      this.year = today.getFullYear();
      this.month = today.getMonth();
    },

    //render: function() {},

  });

  // Kick off!

  var App = new AppView;
  var CalendarMonth = new CalendarMonthView;
  var CalendarYear = new CalendarYearView;

  // === Routes ===

  var AppRouter = Backbone.Router.extend({

    routes: {
      //"help":                 "help",    // #help
      //"search/:query":        "search",  // #search/kiwis
      "": "index",
      "calendar/:year/:month":  "calendarMonth",
      "calendar/:year":  "calendarYear",
    },

    help: function() {
    },

    index: function() {
      var today = new Date();
      var year = today.getFullYear();
      var month = today.getMonth();
      month++;
      Router.navigate('calendar/'+year+'/'+month, { trigger: true });
    },

    calendarMonth: function(year, month) {
      CalendarMonth.render(year, month);
    },

    calendarYear: function(year) {
      CalendarYear.render(year);
    },

  });

  var Router = new AppRouter;
  Backbone.history.start();

  $('li.menu').click(function(){
    $(this).toggleClass('active');
    $('#pages').fadeToggle();
  });

  function keyNav(e) {
    switch (e.keyCode) {

      // left
      case 37:
      // k
      case 75:
        var month = --App.month;
        var year = App.year;
        if (month < 1) { year--; month = 12; }
        Router.navigate('calendar/'+year+'/'+month, { trigger: true });
        break;

      // right
      case 39:
      // j
      case 74:
        var month = ++App.month;
        var year = App.year;
        if (month > 12) { year++; month = 1; }
        Router.navigate('calendar/'+year+'/'+month, { trigger: true });
        break;

      default:
        console.log(e.keyCode);
        return;
    }
  }

  $('body').keydown(function(e){ keyNav(e); });

});

