'use strict';

var PinClass = require('./pin.js');
var CardClass = require('./card.js');
var dataUtils = require('./utils/data-utils.js');
var filter = require('./utils/filter.js');
var load = require('./utils/load.js');

var debounce = require('./utils/debounce.js');

(function () {
  /** @constant {string} */
  var URL = 'https://intensive-javascript-server-kjgvxfepjl.now.sh/keksobooking/data';

  /** @constant {number} */
  var MAX_NUMBER = 3;

  var pinMap = document.querySelector('.tokyo__pin-map');
  var filterForm = document.querySelector('.tokyo__filters');
  var type = filterForm.querySelector('#housing_type');
  var price = filterForm.querySelector('#housing_price');
  var roomNumber = filterForm.querySelector('#housing_room-number');
  var guestsNumber = filterForm.querySelector('#housing_guests-number');
  var featuresList = filterForm.querySelectorAll('input[name="feature"]');

  var pinsList = [];
  var cardsList = [];

  /**
   * render pins on the page
   * @param {Array<Place>} places
   * @param {Function} callback
   */
  var renderPins = function (places, callback) {
    pinsList.forEach(function (item) {
      item.element.remove();
    });

    var fragment = document.createDocumentFragment();
    places.forEach(function (item) {
      var pin = new PinClass(item, callback);
      pinsList.push(pin);
      cardsList.push(new CardClass(pin));
      fragment.appendChild(pin.element);
    });

    pinMap.appendChild(fragment);
  };

  /**
   * @param {Array<Object>} array
   * @return {Array<Element>}
   */
  var getActivePin = function (array) {
    return array.filter(function (item) {
      return item.active === true;
    })[0];
  };

  /**
   * @param {Object} pin
   * @param {Object} data
   */
  var showPinsAndCard = function (pin) {
    var active = getActivePin(pinsList);
    if (active) {
      active.unsetActive();
    }
    pin.setActive();
    cardsList[pinsList.indexOf(pin)].show();
  };

  /**
   * @param  {Array<Objects>} places
   * @return {Array<Objects>}
   */
  var getFilteredData = function (places) {
    var filteredPlaces = filter.byEquality(places, 'type', dataUtils.getValueFromFilter(type));
    filteredPlaces = filter.bySuitablePrice(places, 'price', dataUtils.getValueFromFilter(price));
    filteredPlaces = filter.byEquality(filteredPlaces, 'rooms', dataUtils.getValueFromFilter(roomNumber));
    filteredPlaces = filter.byEquality(filteredPlaces, 'guests', dataUtils.getValueFromFilter(guestsNumber));
    filteredPlaces = [].reduce.call(featuresList, function (previousValue, currentItem) {
      if (currentItem.checked) {
        var value = currentItem.getAttribute('value');
        return filter.byPresence(previousValue, 'features', value);
      } else {
        return previousValue;
      }
    }, filteredPlaces);
    return filteredPlaces;
  };

  /**
   * @param {Array<Object>} places
   */
  var renderFilteredData = function (places) {
    var active = getActivePin(pinsList);
    if (active) {
      cardsList[pinsList.indexOf(active)].close();
      active.unsetActive();
    }
    renderPins(places, function (pin) {
      showPinsAndCard(pin);
    });
  };

  /**
   * @param {Array<Object>} places
   */
  var addPinsToMap = function (places) {
    dataUtils.sortPlacesByLocationY(places);
    if (places.length > 0) {
      var randomPlaces = dataUtils.shuffleArray(places).slice(0, MAX_NUMBER);
      renderPins(randomPlaces, function (pin) {
        showPinsAndCard(pin);
      });
      showPinsAndCard(pinsList[0]);
    }
    filterForm.addEventListener('change', function () {
      debounce(function () {
        renderFilteredData(getFilteredData(places));
      }, 500);
    });
  };

  load(URL, addPinsToMap);
})();
