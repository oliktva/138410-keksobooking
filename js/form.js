'use strict';

(function () {
  var noticeForm = document.querySelector('.notice__form');
  var price = noticeForm.querySelector('#price');
  var type = noticeForm.querySelector('#type');
  var roomNumber = noticeForm.querySelector('#room_number');
  var capacity = noticeForm.querySelector('#capacity');
  var time = noticeForm.querySelector('#time');
  var timeout = noticeForm.querySelector('#timeout');
  var address = noticeForm.querySelector('#address');

  var priceForType = {'flat': '1000', 'hovel': '0', 'palace': '10000'};
  var guestsForRooms = {'room_1': 'no_guests', 'rooms_2': 'guests_3', 'rooms_100': 'guests_3'};

  /**
   * @param  {Element} field - necessarily select
   * @return {string}
   */
  var getSelectedValue = function (field) {
    return field.options[field.selectedIndex].value;
  };

  /**
   * @param  {event} evt
   */
  var setInputValid = function (evt) {
    if (evt.target.value.length > 0) {
      evt.target.classList.remove('invalid');
      evt.target.removeEventListener('keyup', setInputValid);
    }
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
    var typeValue = priceForType[getSelectedValue(type)];
    price.setAttribute('min', typeValue);
  });

  roomNumber.addEventListener('change', function () {
    var guestsValue = guestsForRooms[getSelectedValue(roomNumber)];
    capacity.value = guestsValue;
  });

  time.addEventListener('change', function () {
    var timeValue = getSelectedValue(time);
    timeout.value = timeValue;
  });

  noticeForm.addEventListener('invalid', onInvalidForm, true);
  noticeForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    noticeForm.reset();
  });

  window.mainPin.syncWithElement(address, getCoordsValue);
})();
