'use strict';

(function () {
  /** @constant {string} */
  var URL = 'https://intensive-javascript-server-kjgvxfepjl.now.sh/keksobooking/data';

  var map = document.querySelector('.tokyo img');

  /**
   * @param  {Array<Object>} places
   */
  var onDataChange = function (places) {
    window.pin.renderPins(places, function (place, pinElement) {
      window.pin.setActivePin(pinElement);
      window.showCard(place, window.pin.unsetActivePin);
    });
    if (places.length > 0) {
      window.showCard(places[0], window.pin.unsetActivePin);

      window.pin.setActivePin(window.pin.getPinsElements()[0]);
    }
  };

  /**
   * @param  {Array<Object>} places
   */
  var addPinsToMap = function (places) {
    window.data.sortPlacesByLocationY(places);

    window.filter(places, onDataChange);
  };

  window.load(URL, addPinsToMap);
  window.mainPin.setDraggable(map);
})();
