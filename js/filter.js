'use strict';

window.filter = (function () {
  var places = [];
  var filteredPlaces = [];
  var renderCallback = null;
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
   * @param {array} array
   * @param {string} field
   * @param {string} value
   * @param {Function} filterFunction
   * @return {Array<Object>}
   */
  var getFilteredData = function (array, field, value, filterFunction) {
    return array.filter(function (item) {
      return filterFunction(item, field, value);
    });
  };

  /**
   * @param  {Object} item
   * @param  {string} field
   * @param  {string} value
   * @return {boolean}
   */
  var isEqual = function (item, field, value) {
    if (field === 'guests' || field === 'rooms') {
      return item.offer[field] === parseInt(value, 10);
    } else {
      return item.offer[field] === value;
    }
  };

  /**
   * @param  {Object} item
   * @param  {string} field
   * @param  {string} value
   * @return {boolean}
   */
  var isContain = function (item, field, value) {
    return item.offer[field].indexOf(value) !== -1;
  };

  /**
   * @param  {Object} item
   * @param  {string} field
   * @param  {string} value
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
   * @param  {Object} item
   * @param  {string} field
   * @param  {string} value
   * @return {boolean}
   */
  var isSuitableValue = function (item, field, value) {
    if (value === 'any') {
      return true;
    } else {
      return isEqual(item, field, value);
    }
  };

  var filterPlaces = function () {
    filteredPlaces = getFilteredData(places, 'type', getValueFromFilter(type), isSuitableValue);
    filteredPlaces = getFilteredData(filteredPlaces, 'price', getValueFromFilter(price), isSuitablePrice);
    filteredPlaces = getFilteredData(filteredPlaces, 'rooms', getValueFromFilter(roomNumber), isSuitableValue);
    filteredPlaces = getFilteredData(filteredPlaces, 'guests', getValueFromFilter(guestsNumber), isSuitableValue);
    filteredPlaces = [].reduce.call(featuresList, function (previousValue, currentItem) {
      if (currentItem.checked) {
        var value = currentItem.getAttribute('value');
        return getFilteredData(previousValue, 'features', value, isContain);
      } else {
        return previousValue;
      }
    }, filteredPlaces);
    renderCallback(filteredPlaces);
  };

  var onFilterChange = function () {
    window.debounce(filterPlaces, 250);
  };

  /**
   * @param  {Array<Object>} _places
   * @param  {Function} _callback
   */
  return function (_places, _callback) {
    places = _places;
    filteredPlaces = _places;
    renderCallback = _callback;
    [].map.call(form.querySelectorAll('.tokyo__filter'), function (item) {
      filterPlaces(item);
    });
    renderCallback(filteredPlaces);
    form.addEventListener('change', onFilterChange);
  };
})();
