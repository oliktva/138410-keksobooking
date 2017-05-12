'use strict';

module.exports = (function () {
  /** @enum {number} */
  var PlaceDimension = {
    WIDTH: 75,
    HEIGHT: 94
  };

  var mainPin = document.querySelector('.pin__main');

  /**
   * @return {Object}
   */
  var getCoords = function () {
    return {
      x: mainPin.offsetLeft + Math.floor(PlaceDimension.WIDTH / 2),
      y: mainPin.offsetTop + PlaceDimension.HEIGHT
    };
  };

  /**
   * @param {Element} element
   * @param {Function} callback
   */
  var addDropListener = function (element, callback) {
    mainPin.addEventListener('mousemove', function (evt) {
      element.value = callback();
    });
  };

  return {
    element: mainPin,
    getCoords: getCoords,
    addDropListener: addDropListener
  };
})();
