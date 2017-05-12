'use strict';

module.exports = (function () {
  var map = require('./map.js');
  var filter = require('./filter.js');
  var form = require('./form.js');

  return {
    map: map,
    filter: filter,
    form: form
  };
})();
