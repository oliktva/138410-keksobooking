'use strict';

window.dataUtils = (function () {
  /** @constant {Object} */
  var TYPES_MAP = {'flat': 'Квартира', 'house': 'Дом', 'bungalo': 'Бунгало'};

  /**
   * sorting array of places by location.y
   * @param {Array<Place>} array
   */
  var sortPlacesByLocationY = function (array) {
    array.sort(function (a, b) {
      return a.location.y - b.location.y;
    });
  };

  /**
   * formats value dividing into digits
   * @param {number} price
   * @return {string}
   */
  var getFormattedPrice = function (price) {
    if (price >= 10000) {
      return price.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
    } else {
      return price.toString();
    }
  };

  return {
    TYPES_MAP: TYPES_MAP,
    getFormattedPrice: getFormattedPrice,
    sortPlacesByLocationY: sortPlacesByLocationY
  };
})();
