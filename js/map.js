'use strict';

(function () {
  /** @constant {number} */
  var NUMBER_OF_PLACES = 8;

  var places = window.data.createPlacesList(NUMBER_OF_PLACES);
  window.data.sortPlacesByLocationY(places);
  window.pin.renderPins(places);
  window.card.renderOfferDialog(places[0]);

  var pins = window.pin.getPinsElements();
  window.pin.setActivePin(pins[0]);
  places.forEach(function (item, i) {
    pins[i].addEventListener('click', function (evt) {
      window.pin.setActivePin(evt.currentTarget);
      window.card.openOfferDialog(item);
    });
    pins[i].addEventListener('keydown', function (evt) {
      if (window.checkKey.isEnter(evt)) {
        window.pin.setActivePin(evt.currentTarget);
        window.card.openOfferDialog(item);
      }
    });
  });
  window.card.setCloseClickEvent();
  window.mainPin.setDraggable();
})();
