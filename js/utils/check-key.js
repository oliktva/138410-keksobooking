'use strict';

module.exports = (function () {
  /** @enum {number} */
  var KeyCode = {
    ESC_KEY_CODE: 27,
    ENTER_KEY_CODE: 13
  };

  /**
   * @param {Event} evt
   * @return {boolean}
   */
  var isEnter = function (evt) {
    return evt.keyCode === KeyCode.ENTER_KEY_CODE;
  };

  /**
   * @param {Event} evt
   * @return {boolean}
   */
  var isEsc = function (evt) {
    return evt.keyCode === KeyCode.ESC_KEY_CODE;
  };

  return {
    isEnter: isEnter,
    isEsc: isEsc
  };
})();
