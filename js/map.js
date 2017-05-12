'use strict';

var PinClass = require('./pin.js');
var showCard = require('./show-card.js');
var dataUtils = require('./utils/data-utils.js');
var filter = require('./filter.js');
var load = require('./utils/load.js');

(function () {
  /** @constant {string} */
  var URL = 'https://intensive-javascript-server-kjgvxfepjl.now.sh/keksobooking/data';

  /** @constant {number} */
  var MAX_NUMBER = 3;

  var pinMap = document.querySelector('.tokyo__pin-map');
  var pinsList = [];

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
    });
  };

  /**
   * @param {Object} pin
   * @param {Object} data
   */
  var showPinsAndCard = function (pin) {
    var active = getActivePin(pinsList);
    if (active.length > 0) {
      active.forEach(function (item) {
        item.unsetActivePin();
      });
    }
    pin.setActivePin();
    var callback = getActivePin(pinsList) > 0 ? getActivePin(pinsList)[0].unsetActivePin : function () {};
    showCard.open(pin.data, callback);
  };

  /**
   * @param {Array<Object>} places
   */
  var onDataChange = function (places) {
    renderPins(places, function (pin) {
      showPinsAndCard(pin);
    });
    showCard.close();
  };
  /**
   * @param {Array<Object>} places
   */
  var addPinsToMap = function (places) {
    dataUtils.sortPlacesByLocationY(places);
    filter(places, onDataChange);
    if (places.length > 0) {
      var randomPlaces = dataUtils.shuffleArray(places).slice(0, MAX_NUMBER);
      renderPins(randomPlaces, function (pin) {
        showPinsAndCard(pin);
      });
      showPinsAndCard(pinsList[0]);
    }
  };

  load(URL, addPinsToMap);
})();
