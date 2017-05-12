'use strict';

module.exports = (function () {
  /**
   * @param {Element} field
   * @param {Array} array
   * @return {number}
   */
  var getSelectedIndex = function (field, array) {
    return array.indexOf(field.options[field.selectedIndex].value);
  };

  /**
   * @param {ELement} elementFrom
   * @param {Element} elementTo
   * @param {Array} arrayKey
   * @param {Array} arrayValue
   * @param {Function} callback
   */
  return function (elementFrom, elementTo, arrayKey, arrayValue, callback) {
    var value = arrayValue[getSelectedIndex(elementFrom, arrayKey)];
    callback(elementTo, value);
  };
})();
