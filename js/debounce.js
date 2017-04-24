'use strict';

(function () {
  var DEBOUNCE_INTERVAL = 300; // ms
  var lastTimeout;

  /**
   * @param  {Function} callback
   * @param {number} interval
   */
  window.debounce = function (callback, interval) {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    var timeout = interval || DEBOUNCE_INTERVAL;
    lastTimeout = window.setTimeout(callback, timeout);
  };
})();
