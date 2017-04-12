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
  var mainPin = window.pin.getMainPinElement();

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
  address.setAttribute('disabled', 'disabled');
  address.value = 'x: ' + (mainPin.offsetLeft + Math.floor(window.pin.getMainPinDimension().width / 2))
  + ' y: ' + (mainPin.offsetTop + window.pin.getMainPinDimension().height);

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

  mainPin.addEventListener('mouseup', function (evt) {
    var element = evt.target.tagName.toLowerCase() === 'div' ? evt.target : evt.target.parentNode;
    var x = element.offsetLeft + Math.floor(window.pin.getMainPinDimension().width / 2);
    var y = element.offsetTop + window.pin.getMainPinDimension().height;
    address.value = 'x: ' + x + ' y: ' + y;
  });
})();
