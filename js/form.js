'use strict';

(function () {
  /** @constant {Array} */
  var TYPES = ['flat', 'hovel', 'palace'];

  /** @constant {Array} */
  var PRICES = ['1000', '0', '10000'];

  /** @constant {Array} */
  var ROOMS = ['room_1', 'rooms_2', 'rooms_100'];

  /** @constant {Array} */
  var GUESTS = ['no_guests', 'guests_3', 'guests_3'];

  /** @constant {Array} */
  var TIME = ['12', '13', '14'];

  /** @constant {number} */
  var ONE = 1;

  /** @constant {number} */
  var MAX_NUMBER = 16;

  var noticeForm = document.querySelector('.notice__form');
  var price = noticeForm.querySelector('#price');
  var type = noticeForm.querySelector('#type');
  var roomNumber = noticeForm.querySelector('#room_number');
  var capacity = noticeForm.querySelector('#capacity');
  var time = noticeForm.querySelector('#time');
  var timeout = noticeForm.querySelector('#timeout');
  var address = noticeForm.querySelector('#address');

  var avatarFileChooser = document.querySelector('.notice__photo .upload input[type=file]');
  var avatarPreviewList = document.querySelectorAll('.notice__preview-image');
  var photoFileChooser = document.querySelector('.form__photo-container .upload input[type=file]');
  var photoPreviewList = document.querySelectorAll('.form__photo');

  /**
   * @param {event} evt
   */
  var setInputValid = function (evt) {
    if (evt.target.value.length > 0) {
      evt.target.classList.remove('invalid');
      evt.target.removeEventListener('keyup', setInputValid);
    }
  };

  /**
   * @param {Element} element
   * @param {string} value
   */
  var setMinValue = function (element, value) {
    element.setAttribute('min', value);
  };

  /**
   * @param {Element} element
   * @param {string} value
   */
  var setValueToElement = function (element, value) {
    element.value = value;
  };

  /**
   * @param {event} evt
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
    window.synchronizeFields(type, price, TYPES, PRICES, setMinValue);
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

  window.mainPin.addDropListener(address, getCoordsValue);

/**
   * @param {Element} elements
   * @param {FileReader} reader
   */
  var loadImage = function (elements, reader) {
    reader.addEventListener('load', function () {
      elements[0].src = reader.result;
    });
  };

  /**
   * @param {Element} elements
   * @param {FileReader} reader
   * @param {number} index
   */
  var loadNextImage = function (elements, reader, index) {
    reader.addEventListener('load', function () {
      elements[index].innerHTML = '<img src="' + reader.result + '"/>';
    });
  };

  window.uploadImages(avatarFileChooser, avatarPreviewList, ONE, loadImage);
  window.uploadImages(photoFileChooser, photoPreviewList, MAX_NUMBER, loadNextImage);
})();
