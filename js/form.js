'use strict';

(function () {
  var TYPES = ['flat', 'hovel', 'palace'];
  var PRICES = ['1000', '0', '10000'];
  var ROOMS = ['room_1', 'rooms_2', 'rooms_100'];
  var GUESTS = ['no_guests', 'guests_3', 'guests_3'];
  var TIME = ['12', '13', '14'];

  var noticeForm = document.querySelector('.notice__form');
  var price = noticeForm.querySelector('#price');
  var type = noticeForm.querySelector('#type');
  var roomNumber = noticeForm.querySelector('#room_number');
  var capacity = noticeForm.querySelector('#capacity');
  var time = noticeForm.querySelector('#time');
  var timeout = noticeForm.querySelector('#timeout');
  var address = noticeForm.querySelector('#address');

  /**
   * @param  {event} evt
   */
  var setInputValid = function (evt) {
    if (evt.target.value.length > 0) {
      evt.target.classList.remove('invalid');
      evt.target.removeEventListener('keyup', setInputValid);
    }
  };

  var setAttributeToElement = function (element, value) {
    element.setAttribute('min', value);
  };

  var setValueToElement = function (element, value) {
    element.value = value;
  };

  /**
   * @param  {event} evt
   */
  var onInvalidForm = function (evt) {
    var invalidElements = noticeForm.querySelectorAll(':invalid');
    for (var i = 0; i < invalidElements.length; i++) {
      invalidElements[i].classList.add('invalid');
      invalidElements[i].addEventListener('keyup', setInputValid);
    }
  };

  /**
   * @return {string}
   */
  var getCoordsValue = function () {
    return 'x: ' + window.mainPin.getCoords().x + ' y: ' + window.mainPin.getCoords().y;
  };

  address.setAttribute('readonly', 'readonly');
  address.value = getCoordsValue();

  type.addEventListener('change', function () {
    window.synchronizeFields(type, price, TYPES, PRICES, setAttributeToElement);
  });

  roomNumber.addEventListener('change', function () {
    window.synchronizeFields(roomNumber, capacity, ROOMS, GUESTS, setValueToElement);
  });

  time.addEventListener('change', function () {
    window.synchronizeFields(time, timeout, TIME, TIME, setValueToElement);
  });

  noticeForm.addEventListener('invalid', onInvalidForm, true);
  noticeForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    noticeForm.reset();
  });

  window.mainPin.syncWithElement(address, getCoordsValue);
})();
