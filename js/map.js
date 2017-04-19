'use strict';

(function () {
  /** @constant {string} */
  var URL = 'https://intensive-javascript-server-kjgvxfepjl.now.sh/keksobooking/data';

  /**
   * @param  {Array<Object>} places
   */
  var addPinsToMap = function (places) {
    window.data.sortPlacesByLocationY(places);
    window.pin.renderPins(places, function (place, pinElement) {
      window.pin.setActivePin(pinElement);
      window.showCard(place, window.pin.unsetActivePin);
    });
    window.showCard(places[0], window.pin.unsetActivePin);

    var pin = window.pin.getPinsElements()[0];
    window.pin.setActivePin(pin);
  };

  window.load(URL, addPinsToMap);
  window.mainPin.setDraggable();
})();
