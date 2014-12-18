// vim: foldmethod=indent foldlevel=0

// Some useful data

var monthNames = [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ];
var weekdayNamesShort = [ 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun' ];

// TODO: automate including the moons data

var MOONS = [];

MOONS[2013] = {
  mahanikaya: [
    { date: '2013-01-05', phase: 'waning' },
    { date: '2013-01-11', phase: 'new' },
    { date: '2013-01-19', phase: 'waxing' },
    { date: '2013-01-26', phase: 'full' },
    { date: '2013-02-03', phase: 'waning' },
    { date: '2013-02-10', phase: 'new' },
    { date: '2013-02-18', phase: 'waxing' },
    { date: '2013-02-25', phase: 'full' },
    { date: '2013-03-05', phase: 'waning' },
    { date: '2013-03-11', phase: 'new' },
    { date: '2013-03-19', phase: 'waxing' },
    { date: '2013-03-26', phase: 'full' },
    { date: '2013-04-03', phase: 'waning' },
    { date: '2013-04-10', phase: 'new' },
    { date: '2013-04-18', phase: 'waxing' },
    { date: '2013-04-25', phase: 'full' },
    { date: '2013-05-03', phase: 'waning' },
    { date: '2013-05-09', phase: 'new' },
    { date: '2013-05-17', phase: 'waxing' },
    { date: '2013-05-24', phase: 'full' },
    { date: '2013-06-01', phase: 'waning' },
    { date: '2013-06-08', phase: 'new' },
    { date: '2013-06-16', phase: 'waxing' },
    { date: '2013-06-23', phase: 'full' },
    { date: '2013-07-01', phase: 'waning' },
    { date: '2013-07-07', phase: 'new' },
    { date: '2013-07-15', phase: 'waxing' },
    { date: '2013-07-22', phase: 'full' },
    { date: '2013-07-30', phase: 'waning' },
    { date: '2013-08-06', phase: 'new' },
    { date: '2013-08-14', phase: 'waxing' },
    { date: '2013-08-21', phase: 'full' },
    { date: '2013-08-29', phase: 'waning' },
    { date: '2013-09-04', phase: 'new' },
    { date: '2013-09-12', phase: 'waxing' },
    { date: '2013-09-19', phase: 'full' },
    { date: '2013-09-27', phase: 'waning' },
    { date: '2013-10-04', phase: 'new' },
    { date: '2013-10-12', phase: 'waxing' },
    { date: '2013-10-19', phase: 'full' },
    { date: '2013-10-27', phase: 'waning' },
    { date: '2013-11-02', phase: 'new' },
    { date: '2013-11-10', phase: 'waxing' },
    { date: '2013-11-17', phase: 'full' },
    { date: '2013-11-25', phase: 'waning' },
    { date: '2013-12-02', phase: 'new' },
    { date: '2013-12-10', phase: 'waxing' },
    { date: '2013-12-17', phase: 'full' },
    { date: '2013-12-25', phase: 'waning' },
    { date: '2013-12-31', phase: 'new' },
  ],

  astro: [
    { date: '2013-01-05', phase: 'waning' },
    { date: '2013-01-11', phase: 'new' },
    { date: '2013-01-18', phase: 'waxing' },
    { date: '2013-01-27', phase: 'full' },
    { date: '2013-02-03', phase: 'waning' },
    { date: '2013-02-10', phase: 'new' },
    { date: '2013-02-17', phase: 'waxing' },
    { date: '2013-02-25', phase: 'full' },
    { date: '2013-03-04', phase: 'waning' },
    { date: '2013-03-11', phase: 'new' },
    { date: '2013-03-19', phase: 'waxing' },
    { date: '2013-03-27', phase: 'full' },
    { date: '2013-04-03', phase: 'waning' },
    { date: '2013-04-10', phase: 'new' },
    { date: '2013-04-18', phase: 'waxing' },
    { date: '2013-04-25', phase: 'full' },
    { date: '2013-05-02', phase: 'waning' },
    { date: '2013-05-10', phase: 'new' },
    { date: '2013-05-18', phase: 'waxing' },
    { date: '2013-05-25', phase: 'full' },
    { date: '2013-05-31', phase: 'waning' },
    { date: '2013-06-08', phase: 'new' },
    { date: '2013-06-16', phase: 'waxing' },
    { date: '2013-06-23', phase: 'full' },
    { date: '2013-06-30', phase: 'waning' },
    { date: '2013-07-08', phase: 'new' },
    { date: '2013-07-16', phase: 'waxing' },
    { date: '2013-07-22', phase: 'full' },
    { date: '2013-07-29', phase: 'waning' },
    { date: '2013-08-06', phase: 'new' },
    { date: '2013-08-14', phase: 'waxing' },
    { date: '2013-08-21', phase: 'full' },
    { date: '2013-08-28', phase: 'waning' },
    { date: '2013-09-05', phase: 'new' },
    { date: '2013-09-12', phase: 'waxing' },
    { date: '2013-09-19', phase: 'full' },
    { date: '2013-09-27', phase: 'waning' },
    { date: '2013-10-05', phase: 'new' },
    { date: '2013-10-11', phase: 'waxing' },
    { date: '2013-10-18', phase: 'full' },
    { date: '2013-10-26', phase: 'waning' },
    { date: '2013-11-03', phase: 'new' },
    { date: '2013-11-10', phase: 'waxing' },
    { date: '2013-11-17', phase: 'full' },
    { date: '2013-11-25', phase: 'waning' },
    { date: '2013-12-03', phase: 'new' },
    { date: '2013-12-09', phase: 'waxing' },
    { date: '2013-12-17', phase: 'full' },
    { date: '2013-12-25', phase: 'waning' },
  ],
};

MOONS[2014] = {
  mahanikaya: [
    { date: '2014-01-08', phase: 'waxing' },
    { date: '2014-01-15', phase: 'full' },
    { date: '2014-01-23', phase: 'waning' },
    { date: '2014-01-30', phase: 'new' },
    { date: '2014-02-07', phase: 'waxing' },
    { date: '2014-02-14', phase: 'full' },
    { date: '2014-02-22', phase: 'waning' },
    { date: '2014-02-28', phase: 'new' },
    { date: '2014-03-08', phase: 'waxing' },
    { date: '2014-03-15', phase: 'full' },
    { date: '2014-03-23', phase: 'waning' },
    { date: '2014-03-30', phase: 'new' },
    { date: '2014-04-07', phase: 'waxing' },
    { date: '2014-04-14', phase: 'full' },
    { date: '2014-04-22', phase: 'waning' },
    { date: '2014-04-28', phase: 'new' },
    { date: '2014-05-06', phase: 'waxing' },
    { date: '2014-05-13', phase: 'full' },
    { date: '2014-05-21', phase: 'waning' },
    { date: '2014-05-28', phase: 'new' },
    { date: '2014-06-05', phase: 'waxing' },
    { date: '2014-06-12', phase: 'full' },
    { date: '2014-06-20', phase: 'waning' },
    { date: '2014-06-26', phase: 'new' },
    { date: '2014-07-04', phase: 'waxing' },
    { date: '2014-07-11', phase: 'full' },
    { date: '2014-07-19', phase: 'waning' },
    { date: '2014-07-26', phase: 'new' },
    { date: '2014-08-03', phase: 'waxing' },
    { date: '2014-08-10', phase: 'full' },
    { date: '2014-08-18', phase: 'waning' },
    { date: '2014-08-24', phase: 'new' },
    { date: '2014-09-01', phase: 'waxing' },
    { date: '2014-09-08', phase: 'full' },
    { date: '2014-09-16', phase: 'waning' },
    { date: '2014-09-23', phase: 'new' },
    { date: '2014-10-01', phase: 'waxing' },
    { date: '2014-10-08', phase: 'full' },
    { date: '2014-10-16', phase: 'waning' },
    { date: '2014-10-22', phase: 'new' },
    { date: '2014-10-30', phase: 'waxing' },
    { date: '2014-11-06', phase: 'full' },
    { date: '2014-11-14', phase: 'waning' },
    { date: '2014-11-21', phase: 'new' },
    { date: '2014-11-29', phase: 'waxing' },
    { date: '2014-12-06', phase: 'full' },
    { date: '2014-12-14', phase: 'waning' },
    { date: '2014-12-20', phase: 'new' },
    { date: '2014-12-28', phase: 'waxing' },
  ],

  astro: [
    { date: '2014-01-01', phase: 'new' },
    { date: '2014-01-08', phase: 'waxing' },
    { date: '2014-01-16', phase: 'full' },
    { date: '2014-01-24', phase: 'waning' },
    { date: '2014-01-30', phase: 'new' },
    { date: '2014-02-06', phase: 'waxing' },
    { date: '2014-02-14', phase: 'full' },
    { date: '2014-02-22', phase: 'waning' },
    { date: '2014-03-01', phase: 'new' },
    { date: '2014-03-08', phase: 'waxing' },
    { date: '2014-03-16', phase: 'full' },
    { date: '2014-03-24', phase: 'waning' },
    { date: '2014-03-30', phase: 'new' },
    { date: '2014-04-07', phase: 'waxing' },
    { date: '2014-04-15', phase: 'full' },
    { date: '2014-04-22', phase: 'waning' },
    { date: '2014-04-29', phase: 'new' },
    { date: '2014-05-07', phase: 'waxing' },
    { date: '2014-05-14', phase: 'full' },
    { date: '2014-05-21', phase: 'waning' },
    { date: '2014-05-28', phase: 'new' },
    { date: '2014-06-05', phase: 'waxing' },
    { date: '2014-06-13', phase: 'full' },
    { date: '2014-06-19', phase: 'waning' },
    { date: '2014-06-27', phase: 'new' },
    { date: '2014-07-05', phase: 'waxing' },
    { date: '2014-07-12', phase: 'full' },
    { date: '2014-07-19', phase: 'waning' },
    { date: '2014-07-26', phase: 'new' },
    { date: '2014-08-04', phase: 'waxing' },
    { date: '2014-08-10', phase: 'full' },
    { date: '2014-08-17', phase: 'waning' },
    { date: '2014-08-25', phase: 'new' },
    { date: '2014-09-02', phase: 'waxing' },
    { date: '2014-09-09', phase: 'full' },
    { date: '2014-09-16', phase: 'waning' },
    { date: '2014-09-24', phase: 'new' },
    { date: '2014-10-01', phase: 'waxing' },
    { date: '2014-10-08', phase: 'full' },
    { date: '2014-10-15', phase: 'waning' },
    { date: '2014-10-23', phase: 'new' },
    { date: '2014-10-31', phase: 'waxing' },
    { date: '2014-11-06', phase: 'full' },
    { date: '2014-11-14', phase: 'waning' },
    { date: '2014-11-22', phase: 'new' },
    { date: '2014-11-29', phase: 'waxing' },
    { date: '2014-12-06', phase: 'full' },
    { date: '2014-12-14', phase: 'waning' },
    { date: '2014-12-22', phase: 'new' },
    { date: '2014-12-28', phase: 'waxing' },
  ],
};

MOONS[2015] = {
  mahanikaya: [
    { date: '2015-01-04', phase: 'full' },
    { date: '2015-01-12', phase: 'waning' },
    { date: '2015-01-19', phase: 'new' },
    { date: '2015-01-27', phase: 'waxing' },
    { date: '2015-02-03', phase: 'full' },
    { date: '2015-02-11', phase: 'waning' },
    { date: '2015-02-17', phase: 'new' },
    { date: '2015-02-25', phase: 'waxing' },
    { date: '2015-03-04', phase: 'full' },
    { date: '2015-03-12', phase: 'waning' },
    { date: '2015-03-19', phase: 'new' },
    { date: '2015-03-27', phase: 'waxing' },
    { date: '2015-04-03', phase: 'full' },
    { date: '2015-04-11', phase: 'waning' },
    { date: '2015-04-17', phase: 'new' },
    { date: '2015-04-25', phase: 'waxing' },
    { date: '2015-05-02', phase: 'full' },
    { date: '2015-05-10', phase: 'waning' },
    { date: '2015-05-17', phase: 'new' },
    { date: '2015-05-25', phase: 'waxing' },
    { date: '2015-06-01', phase: 'full' },
    { date: '2015-06-09', phase: 'waning' },
    { date: '2015-06-15', phase: 'new' },
    { date: '2015-06-23', phase: 'waxing' },
    { date: '2015-06-30', phase: 'full' },
    { date: '2015-07-08', phase: 'waning' },
    { date: '2015-07-15', phase: 'new' },
    { date: '2015-07-23', phase: 'waxing' },
    { date: '2015-07-30', phase: 'full' },
    { date: '2015-08-08', phase: 'waning' },
    { date: '2015-08-14', phase: 'new' },
    { date: '2015-08-22', phase: 'waxing' },
    { date: '2015-08-29', phase: 'full' },
    { date: '2015-09-06', phase: 'waning' },
    { date: '2015-09-13', phase: 'new' },
    { date: '2015-09-21', phase: 'waxing' },
    { date: '2015-09-28', phase: 'full' },
    { date: '2015-10-06', phase: 'waning' },
    { date: '2015-10-12', phase: 'new' },
    { date: '2015-10-20', phase: 'waxing' },
    { date: '2015-10-27', phase: 'full' },
    { date: '2015-11-04', phase: 'waning' },
    { date: '2015-11-11', phase: 'new' },
    { date: '2015-11-19', phase: 'waxing' },
    { date: '2015-11-26', phase: 'full' },
    { date: '2015-12-04', phase: 'waning' },
    { date: '2015-12-10', phase: 'new' },
    { date: '2015-12-18', phase: 'waxing' },
    { date: '2015-12-25', phase: 'full' },
  ],

  astro: [
    { date: '2015-01-05', phase: 'full' },
    { date: '2015-01-13', phase: 'waning' },
    { date: '2015-01-20', phase: 'new' },
    { date: '2015-01-27', phase: 'waxing' },
    { date: '2015-02-03', phase: 'full' },
    { date: '2015-02-12', phase: 'waning' },
    { date: '2015-02-18', phase: 'new' },
    { date: '2015-02-25', phase: 'waxing' },
    { date: '2015-03-05', phase: 'full' },
    { date: '2015-03-13', phase: 'waning' },
    { date: '2015-03-20', phase: 'new' },
    { date: '2015-03-27', phase: 'waxing' },
    { date: '2015-04-04', phase: 'full' },
    { date: '2015-04-12', phase: 'waning' },
    { date: '2015-04-18', phase: 'new' },
    { date: '2015-04-25', phase: 'waxing' },
    { date: '2015-05-04', phase: 'full' },
    { date: '2015-05-11', phase: 'waning' },
    { date: '2015-05-18', phase: 'new' },
    { date: '2015-05-25', phase: 'waxing' },
    { date: '2015-06-02', phase: 'full' },
    { date: '2015-06-09', phase: 'waning' },
    { date: '2015-06-16', phase: 'new' },
    { date: '2015-06-24', phase: 'waxing' },
    { date: '2015-07-02', phase: 'full' },
    { date: '2015-07-08', phase: 'waning' },
    { date: '2015-07-16', phase: 'new' },
    { date: '2015-07-24', phase: 'waxing' },
    { date: '2015-07-31', phase: 'full' },
    { date: '2015-08-07', phase: 'waning' },
    { date: '2015-08-14', phase: 'new' },
    { date: '2015-08-22', phase: 'waxing' },
    { date: '2015-08-29', phase: 'full' },
    { date: '2015-09-05', phase: 'waning' },
    { date: '2015-09-13', phase: 'new' },
    { date: '2015-09-21', phase: 'waxing' },
    { date: '2015-09-28', phase: 'full' },
    { date: '2015-10-04', phase: 'waning' },
    { date: '2015-10-13', phase: 'new' },
    { date: '2015-10-20', phase: 'waxing' },
    { date: '2015-10-27', phase: 'full' },
    { date: '2015-11-03', phase: 'waning' },
    { date: '2015-11-11', phase: 'new' },
    { date: '2015-11-19', phase: 'waxing' },
    { date: '2015-11-25', phase: 'full' },
    { date: '2015-12-03', phase: 'waning' },
    { date: '2015-12-11', phase: 'new' },
    { date: '2015-12-18', phase: 'waxing' },
    { date: '2015-12-25', phase: 'full' },
  ],
};

MOONS[2016] = {
  mahanikaya: [
    { date: '2016-01-02', phase: 'waning' },
    { date: '2016-01-08', phase: 'new' },
    { date: '2016-01-16', phase: 'waxing' },
    { date: '2016-01-23', phase: 'full' },
    { date: '2016-01-31', phase: 'waning' },
    { date: '2016-02-07', phase: 'new' },
    { date: '2016-02-15', phase: 'waxing' },
    { date: '2016-02-22', phase: 'full' },
    { date: '2016-03-01', phase: 'waning' },
    { date: '2016-03-07', phase: 'new' },
    { date: '2016-03-15', phase: 'waxing' },
    { date: '2016-03-22', phase: 'full' },
    { date: '2016-03-30', phase: 'waning' },
    { date: '2016-04-06', phase: 'new' },
    { date: '2016-04-14', phase: 'waxing' },
    { date: '2016-04-21', phase: 'full' },
    { date: '2016-04-29', phase: 'waning' },
    { date: '2016-05-05', phase: 'new' },
    { date: '2016-05-13', phase: 'waxing' },
    { date: '2016-05-20', phase: 'full' },
    { date: '2016-05-28', phase: 'waning' },
    { date: '2016-06-04', phase: 'new' },
    { date: '2016-06-12', phase: 'waxing' },
    { date: '2016-06-19', phase: 'full' },
    { date: '2016-06-27', phase: 'waning' },
    { date: '2016-07-04', phase: 'new' },
    { date: '2016-07-12', phase: 'waxing' },
    { date: '2016-07-19', phase: 'full' },
    { date: '2016-07-27', phase: 'waning' },
    { date: '2016-08-03', phase: 'new' },
    { date: '2016-08-11', phase: 'waxing' },
    { date: '2016-08-18', phase: 'full' },
    { date: '2016-08-26', phase: 'waning' },
    { date: '2016-09-01', phase: 'new' },
    { date: '2016-09-09', phase: 'waxing' },
    { date: '2016-09-16', phase: 'full' },
    { date: '2016-09-24', phase: 'waning' },
    { date: '2016-10-01', phase: 'new' },
    { date: '2016-10-09', phase: 'waxing' },
    { date: '2016-10-16', phase: 'full' },
    { date: '2016-10-24', phase: 'waning' },
    { date: '2016-10-30', phase: 'new' },
    { date: '2016-11-07', phase: 'waxing' },
    { date: '2016-11-14', phase: 'full' },
    { date: '2016-11-22', phase: 'waning' },
    { date: '2016-11-29', phase: 'new' },
    { date: '2016-12-07', phase: 'waxing' },
    { date: '2016-12-14', phase: 'full' },
    { date: '2016-12-22', phase: 'waning' },
    { date: '2016-12-28', phase: 'new' },
  ],

  astro: [
    { date: '2016-01-02', phase: 'waning' },
    { date: '2016-01-10', phase: 'new' },
    { date: '2016-01-16', phase: 'waxing' },
    { date: '2016-01-24', phase: 'full' },
    { date: '2016-02-01', phase: 'waning' },
    { date: '2016-02-08', phase: 'new' },
    { date: '2016-02-15', phase: 'waxing' },
    { date: '2016-02-22', phase: 'full' },
    { date: '2016-03-01', phase: 'waning' },
    { date: '2016-03-09', phase: 'new' },
    { date: '2016-03-15', phase: 'waxing' },
    { date: '2016-03-23', phase: 'full' },
    { date: '2016-03-31', phase: 'waning' },
    { date: '2016-04-07', phase: 'new' },
    { date: '2016-04-14', phase: 'waxing' },
    { date: '2016-04-22', phase: 'full' },
    { date: '2016-04-30', phase: 'waning' },
    { date: '2016-05-06', phase: 'new' },
    { date: '2016-05-13', phase: 'waxing' },
    { date: '2016-05-21', phase: 'full' },
    { date: '2016-05-29', phase: 'waning' },
    { date: '2016-06-05', phase: 'new' },
    { date: '2016-06-12', phase: 'waxing' },
    { date: '2016-06-20', phase: 'full' },
    { date: '2016-06-27', phase: 'waning' },
    { date: '2016-07-04', phase: 'new' },
    { date: '2016-07-12', phase: 'waxing' },
    { date: '2016-07-19', phase: 'full' },
    { date: '2016-07-26', phase: 'waning' },
    { date: '2016-08-02', phase: 'new' },
    { date: '2016-08-10', phase: 'waxing' },
    { date: '2016-08-18', phase: 'full' },
    { date: '2016-08-25', phase: 'waning' },
    { date: '2016-09-01', phase: 'new' },
    { date: '2016-09-09', phase: 'waxing' },
    { date: '2016-09-16', phase: 'full' },
    { date: '2016-09-23', phase: 'waning' },
    { date: '2016-10-01', phase: 'new' },
    { date: '2016-10-09', phase: 'waxing' },
    { date: '2016-10-16', phase: 'full' },
    { date: '2016-10-22', phase: 'waning' },
    { date: '2016-10-30', phase: 'new' },
    { date: '2016-11-07', phase: 'waxing' },
    { date: '2016-11-14', phase: 'full' },
    { date: '2016-11-21', phase: 'waning' },
    { date: '2016-11-29', phase: 'new' },
    { date: '2016-12-07', phase: 'waxing' },
    { date: '2016-12-14', phase: 'full' },
    { date: '2016-12-21', phase: 'waning' },
    { date: '2016-12-29', phase: 'new' },
  ],
};

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

// === Helpers ===

function dateText(date) {
  var out = '';
  var isodate = date.toISOString().substr(0, 10);

  if (typeof MOONS[date.getFullYear()] === 'undefined') {
    return '<div class="datetext">'+date.getDate()+'</div>';
  }

  var m = _.find(MOONS[date.getFullYear()].mahanikaya, function(d){ return d.date === isodate; });

  if (typeof m === 'undefined') {
    out += '<div class="datetext">'+date.getDate()+'</div>';
  } else {
    out += '<div class="datetext '+m.phase+'">&nbsp;</div>';
  }

  var a = _.find(MOONS[date.getFullYear()].astro, function(d){ return d.date === isodate; });
  if (typeof a !== 'undefined') {
    out += '<div class="astro '+a.phase+'">&nbsp;</div>';
  }

  //var n = _.find(NOTES['mahanikaya'][date.getFullYear()], function(d){ return d.date === isodate; });
  //if (typeof n !== 'undefined') {
  //  out += '<div class="notes">'+n.note+'</div>';
  //}

  //if (typeof m !== 'undefined') {
  //  if (m.phase === 'full') {
  //    out += '<div class="season">15th Hemanta n/m</div>';
  //  } else if (m.phase === 'new') {
  //    // TODO
  //  }
  //}

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
    out += '<li>'+dateText(d)+'</li>';
  }

  out += "</ul>";

  return out;
}

function calendarYearTable(year) {
  var out = "";

  for (month = 1; month <= 12; month++) {
    out += "<div class='month_wrap'>";
    out += "<h3>"+monthNames[month-1]+"</h3>";
    out += calendarMonthTable(year, month);
    out += "</div>";
  }

  return out;
}

function calendarYearList(year) {
  var out = "";

  for (month = 1; month <= 12; month++) {
    out += "<div class='month_wrap'>";
    out += "<h3>"+monthNames[month-1]+"</h3>";
    out += calendarMonthList(year, month);
    out += "</div>";
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

