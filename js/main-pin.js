'use strict';

window.mainPin = (function () {
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
   * @param  {Element} element
   * @param  {Function} callback
   */
  var addDropListener = function (element, callback) {
    mainPin.addEventListener('mouseup', function (evt) {
      element.value = callback();
    });
  };

  /**
   * set main pin draggable
   */
  var setDraggable = function () {
    window.setDraggable(mainPin);
  };

  return {
    getCoords: getCoords,
    addDropListener: addDropListener,
    setDraggable: setDraggable
  };
})();
