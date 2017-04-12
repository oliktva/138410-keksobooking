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

  var mainPin = window.pin.getMainPinElement();
  var coordsState = null;

  var onMouseMove = function (moveEvt) {
    moveEvt.preventDefault();
    var shift = {
      x: coordsState.x - moveEvt.clientX,
      y: coordsState.y - moveEvt.clientY
    };

    coordsState = {
      x: moveEvt.clientX,
      y: moveEvt.clientY
    };

    mainPin.style.top = (mainPin.offsetTop - shift.y) + 'px';
    mainPin.style.left = (mainPin.offsetLeft - shift.x) + 'px';
  };

  var onMouseUp = function (upEvt) {
    upEvt.preventDefault();

    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  };

  var onPinDrag = function (evt) {
    evt.preventDefault();
    coordsState = {
      x: evt.clientX,
      y: evt.clientY
    };
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  mainPin.addEventListener('mousedown', onPinDrag);
})();
