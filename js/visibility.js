'use strict';

window.visibility = (function () {
  /** @constant {string} */
  var HIDDEN_CLASS = 'hidden';

  /**
   * set element visible
   * @param  {Element}  element
   * @param  {boolean} isVisible
   */
  var setElementVisible = function (element, isVisible) {
    element.classList.toggle(HIDDEN_CLASS, !isVisible);
  };

  var isElementInvisible = function (element) {
    return element.classList.contains(HIDDEN_CLASS);
  };

  return {
    setElementVisible: setElementVisible,
    isElementInvisible: isElementInvisible
  };
})();
