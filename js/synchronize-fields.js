'use strict';

window.synchronizeFields = (function () {
  /**
   * @param  {Element} field - necessarily select
   * @return {string}
   */
  var getSelectedValue = function (field) {
    return field.options[field.selectedIndex].value;
  };

  /**
   * @param  {Element} element1
   * @param  {Element} element2
   * @param  {Object} map
   * @param  {Function} callback
   */
  var synchronizeFields = function (element1, element2, map, callback) {
    var value = map[getSelectedValue(element1)];
    callback(element2, value);
  };

  return synchronizeFields;
})();
