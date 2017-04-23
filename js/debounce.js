'use strict';

(function () {
  var DEBOUNCE_INTERVAL = 300; // ms
  var lastTimeout;

  /**
   * @param  {Function} callback
   */
  window.debounce = function (callback) {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(callback, DEBOUNCE_INTERVAL);
  };
})();
