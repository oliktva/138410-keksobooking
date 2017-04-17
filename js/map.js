'use strict';

(function () {
  /** @constant {string} */
  var URL = 'https://intensive-javascript-server-kjgvxfepjl.now.sh/keksobooking/data';

  /**
   * @param  {Array<Object>} places
   */
  var addPinsToMap = function (places) {
    window.data.sortPlacesByLocationY(places);
    window.pin.renderPins(places);
    window.showCard(places[0], window.pin.unsetActivePin);

    var pins = window.pin.getPinsElements();
    window.pin.setActivePin(pins[0]);
    places.forEach(function (item, i) {
      pins[i].addEventListener('click', function (evt) {
        window.pin.setActivePin(evt.currentTarget);
        window.showCard(item, window.pin.unsetActivePin);
      });
      pins[i].addEventListener('keydown', function (evt) {
        if (window.checkKey.isEnter(evt)) {
          window.pin.setActivePin(evt.currentTarget);
          window.showCard(item, window.pin.unsetActivePin);
        }
      });
    });
  };

  window.load(URL, addPinsToMap);
  window.card.setCloseClickEvent();
  window.mainPin.setDraggable();
})();
