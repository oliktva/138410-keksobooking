'use strict';

window.filter = (function () {
  var places = [];
  var filteredPlaces = [];
  var callbackForRender = null;
  var form = document.querySelector('.tokyo__filters');
  var type = form.querySelector('#housing_type');
  var price = form.querySelector('#housing_price');
  var roomNumber = form.querySelector('#housing_room-number');
  var guestsNumber = form.querySelector('#housing_guests-number');
  var featuresList = form.querySelectorAll('input[name="feature"]');

  /**
   * @param  {Element} element
   * @return {string}
   */
  var getValueFromFilter = function (element) {
    return element.options[element.selectedIndex].value;
  };

  /**
   * @param {string} field
   * @param {Element} element
   * @param {Function} callback
   * @return {Array<Object>}
   */
  var getFilteredData = function (field, element, callback) {
    return filteredPlaces.filter(function (item) {
      return callback(item, field, element);
    });
  };

  /**
   * @param  {Object} item
   * @param  {string} field
   * @param  {Element} element
   * @return {boolean}
   */
  var isEqual = function (item, field, element) {
    var value = getValueFromFilter(element);
    if (field === 'guests' || field === 'rooms') {
      value = parseInt(value, 10);
    }
    return item.offer[field] === value;
  };

  /**
   * @param  {Object} item
   * @param  {string} field
   * @param  {Element} element
   * @return {boolean}
   */
  var isContains = function (item, field, element) {
    if (element.checked) {
      return item.offer[field].indexOf(element.getAttribute('value')) !== -1;
    } else {
      return true;
    }
  };

  /**
   * @param  {Object} item
   * @param  {string} field
   * @param  {Element} element
   * @return {boolean}
   */
  var isSuitablePrice = function (item, field, element) {
    switch (getValueFromFilter(element)) {
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
   * @param  {Object} item
   * @param  {string} field
   * @param  {Element} element
   * @return {boolean}
   */
  var isSuitableValue = function (item, field, element) {
    var value = getValueFromFilter(element);
    if (value === 'any') {
      return true;
    } else {
      return isEqual(item, field, element);
    }
  };

  var filterPlaces = function () {
    filteredPlaces = places;
    filteredPlaces = getFilteredData('type', type, isSuitableValue);
    filteredPlaces = getFilteredData('price', price, isSuitablePrice);
    filteredPlaces = getFilteredData('rooms', roomNumber, isSuitableValue);
    filteredPlaces = getFilteredData('guests', guestsNumber, isSuitableValue);
    [].map.call(featuresList, function (item) {
      filteredPlaces = getFilteredData('features', item, isContains);
    });
    callbackForRender(filteredPlaces);
  };

  var onFilterChange = function () {
    window.debounce(filterPlaces);
  };

  /**
   * @param  {Array<Object>} _places
   * @param  {Function} _callback
   */
  return function (_places, _callback) {
    places = _places;
    filteredPlaces = _places;
    callbackForRender = _callback;
    [].map.call(form.querySelectorAll('.tokyo__filter'), function (item) {
      filterPlaces(item);
    });
    callbackForRender(filteredPlaces);
    form.addEventListener('change', onFilterChange);
  };
})();
