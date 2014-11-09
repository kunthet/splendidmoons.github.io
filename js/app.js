
// hey

$(function(){

  // Some useful data

  var monthNames = [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ];
  var weekdayNamesShort = [ 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun' ];

  // Helper functions

  function dateText(date) {
    var m = _.find(MOONS['thai'][date.getFullYear()], function(d){ return d[0] === date.toISOString().substr(0, 10); });
    if (typeof m === 'undefined') {
      return date.getDate();
    } else {
      return m[1];
    }
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

  // == Models ==
  // ...
  // === Collections ===
  // ...

  // === The App ==

  var AppView = Backbone.View.extend({
    el: $("#thai_moons_app"),

    initialize: function() {
      this.calendar = $('#calendar');
      this.calendar_nav = $('#calendar_nav');

      // Do this with the calendar nav elements in the DOM for
      // auto-update and easy retrieve
      var today = new Date();
      this.year = today.getFullYear();
      this.month = today.getMonth();
    },

    render: function(year, month) {
      if (typeof year !== 'number') { var year = new Number(year); }
      if (typeof month !== 'number') { var month = new Number(month); }
      this.month = month;
      this.year = year;
      month--;
      var yearBE = year + 543;
      this.calendar_nav.html('<ul><li>'+year+' / '+yearBE+'</li><li>'+monthNames[month]+'</li></ul>');
      this.calendar.html(renderCalendarMonth(year, month));
      return this;
    },

  });

  // Kick off!

  var App = new AppView;

  // === Routes ===

  var AppRouter = Backbone.Router.extend({

    routes: {
      //"help":                 "help",    // #help
      //"search/:query":        "search",  // #search/kiwis
      "": "index",
      "calendar/:year/:month":  "calendar",
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

    calendar: function(year, month) {
      App.render(year,month);
    }

  });

  var Router = new AppRouter;
  Backbone.history.start();

  $('a.sidebar-trigger').click(function(){
    $('#sidebar').fadeIn();
  });

  $('.closebar').click(function(){
    $(this).parent().fadeOut();
  });


  function keyNav(e) {
    switch (e.keyCode) {

      // left
      case 37:
        var month = --App.month;
        var year = App.year;
        if (month < 1) { year--; month = 12; }
        Router.navigate('calendar/'+year+'/'+month, { trigger: true });
        break;

      // right
      case 39:
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

