'use strict';


module.exports = (function () {
  /**
   * @param {Object} item
   * @param {string} field
   * @param {string} value
   * @return {boolean}
   */
  var isSuitablePrice = function (item, field, value) {
    switch (value) {
      case 'middle':
        return item.offer[field] >= 10000 && item.offer[field] <= 50000;
      case 'low':
        return item.offer[field] <= 10000;
      case 'high':
        return item.offer[field] >= 50000;
      default:
        return false;
    }
  };

  /**
   * @param {Array<Object>} array
   * @param {string} field
   * @param {string} value
   * @return {boolean}
   */
  var byEquality = function (array, field, value) {
    if (value === 'any') {
      return array;
    } else {
      return array.filter(function (item) {
        return item.offer[field] + '' === value + '';
      });
    }
  };

  /**
   * @param {Array<Object>} array
   * @param {string} field
   * @param {string} value
   * @return {boolean}
   */
  var byPresence = function (array, field, value) {
    if (value === 'any') {
      return array;
    } else {
      return array.filter(function (item) {
        return item.offer[field].indexOf(value) !== -1;
      });
    }
  };

  /**
   * @param {Array<Object>} array
   * @param {string} field
   * @param {string} value
   * @return {boolean}
   */
  var bySuitablePrice = function (array, field, value) {
    if (value === 'any') {
      return array;
    } else {
      return array.filter(function (item) {
        return isSuitablePrice(item, field, value);
      });
    }
  };

  return {
    byEquality: byEquality,
    byPresence: byPresence,
    bySuitablePrice: bySuitablePrice
  };
})();
