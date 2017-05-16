'use strict';

module.exports = (function () {
  /** @constant {Object} */
  var TYPES_MAP = {'flat': 'Квартира', 'house': 'Дом', 'bungalo': 'Бунгало'};

  /**
   * generates integer random value from min to max inclusive
   * @param  {number} min
   * @param  {number} max
   * @return {number}
   */
  var getRandom = function (min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  };

  /**
   * exchanges two elements of array
   * @param  {Array} array
   * @param  {number} i
   * @param  {number} j
   */
  var exchangeArrayElements = function (array, i, j) {
    var tmp = array[i];
    array[i] = array[j];
    array[j] = tmp;
  };

  /**
   * shuffles of array by "Fisher–Yates shuffle (The modern algorithm)"
   * @param  {Array} array
   * @return {Array}
   */
  var shuffleArray = function (array) {
    var localArray = array.slice(0);
    for (var i = localArray.length - 1; i > 0; i--) {
      var j = getRandom(0, i + 1);
      exchangeArrayElements(localArray, i, j);
    }
    return localArray;
  };

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

  /**
   * @param {Element} element
   * @return {string}
   */
  var getValueFromFilter = function (element) {
    return element.options[element.selectedIndex].value;
  };

  return {
    TYPES_MAP: TYPES_MAP,
    shuffleArray: shuffleArray,
    getFormattedPrice: getFormattedPrice,
    sortPlacesByLocationY: sortPlacesByLocationY,
    getValueFromFilter: getValueFromFilter
  };
})();
