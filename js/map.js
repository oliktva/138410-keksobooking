'use strict';

(function () {
  /** @constant {string} */
  var URL = 'https://intensive-javascript-server-kjgvxfepjl.now.sh/keksobooking/data';

  /** @constant {number} */
  var MAX_NUMBER = 3;

  /**
   * @param {Element} element
   * @param {Object} data
   */
  var showPinsAndCard = function (element, data) {
    window.pin.setActivePin(element);
    window.showCard.open(data, window.pin.unsetActivePin);
  };

  /**
   * @param {Array<Object>} places
   */
  var onDataChange = function (places) {
    window.pin.renderPins(places, function (place, pinElement) {
      showPinsAndCard(pinElement, place);
    });
    window.showCard.close();
  };
  /**
   * @param {Array<Object>} places
   */
  var addPinsToMap = function (places) {
    window.dataUtils.sortPlacesByLocationY(places);
    window.filter(places, onDataChange);
    if (places.length > 0) {
      var randomPlaces = window.dataUtils.shuffleArray(places).slice(0, MAX_NUMBER);
      window.pin.renderPins(randomPlaces, function (place, pinElement) {
        showPinsAndCard(pinElement, place);
      });
      showPinsAndCard(window.pin.getPinsElements()[0], randomPlaces[0]);
    }
  };

  window.load(URL, addPinsToMap);
})();
