'use strict';

window.utils = (function () {
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
    for (var i = array.length - 1; i > 0; i--) {
      var j = getRandom(0, i + 1);
      exchangeArrayElements(array, i, j);
    }
    return localArray;
  };

  return {
    getRandom: getRandom,
    exchangeArrayElements: exchangeArrayElements,
    shuffleArray: shuffleArray
  };
})();
