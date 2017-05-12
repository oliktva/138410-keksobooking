'use strict';

module.exports = (function () {
  var DEBOUNCE_INTERVAL = 300; // ms
  var lastTimeout = null;

  /**
   * @param {Function} callback
   * @param {number} interval
   */
  return function (callback, interval) {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    var timeout = interval || DEBOUNCE_INTERVAL;
    lastTimeout = window.setTimeout(callback, timeout);
  };
})();
