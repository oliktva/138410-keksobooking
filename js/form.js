'use strict';

var mainPin = require('./main-pin.js');
var synchronizeFields = require('./utils/synchronize-fields.js');
var setDraggable = require('./utils/set-draggable.js');
var uploadImages = require('./utils/upload-images.js');

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
  var MAX_NUMBER = 16;

  var noticeForm = document.querySelector('.notice__form');
  var price = noticeForm.querySelector('#price');
  var type = noticeForm.querySelector('#type');
  var roomNumber = noticeForm.querySelector('#room_number');
  var capacity = noticeForm.querySelector('#capacity');
  var time = noticeForm.querySelector('#time');
  var timeout = noticeForm.querySelector('#timeout');
  var address = noticeForm.querySelector('#address');

  var map = document.querySelector('.tokyo img');

  var avatarFileChooser = document.querySelector('.notice__photo .upload input[type=file]');
  var avatarPreviewList = document.querySelectorAll('.notice__preview-image');
  var photoFileChooser = document.querySelector('.form__photo-container .upload input[type=file]');
  var photoPreviewList = document.querySelectorAll('.form__photo');

  /**
   * @param {Event} evt
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
    element.setAttribute('placeholder', value);
  };

  /**
   * @param {Element} element
   * @param {string} value
   */
  var setValueToElement = function (element, value) {
    element.value = value;
  };

  /**
   * @param {Event} evt
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
    return 'x: ' + mainPin.getCoords().x + ' y: ' + mainPin.getCoords().y;
  };

  address.setAttribute('readonly', 'readonly');
  address.value = getCoordsValue();

  type.addEventListener('change', function () {
    synchronizeFields(type, price, TYPES, PRICES, setMinValue);
  });

  roomNumber.addEventListener('change', function () {
    synchronizeFields(roomNumber, capacity, ROOMS, GUESTS, setValueToElement);
  });

  capacity.addEventListener('change', function () {
    synchronizeFields(capacity, roomNumber, GUESTS, ROOMS, setValueToElement);
  });

  time.addEventListener('change', function () {
    synchronizeFields(time, timeout, TIME, TIME, setValueToElement);
  });

  timeout.addEventListener('change', function () {
    synchronizeFields(timeout, time, TIME, TIME, setValueToElement);
  });

  noticeForm.addEventListener('invalid', onInvalidForm, true);
  noticeForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    noticeForm.reset();
  });

  setDraggable(mainPin.element, map);
  mainPin.addDropListener(address, getCoordsValue);

/**
   * @param {Array<Element>} elements
   * @param {FileReader} reader
   */
  var loadImage = function (elements, reader) {
    reader.addEventListener('load', function () {
      elements[0].src = reader.result;
    });
  };

  /**
   * @param {Array<Element>} elements
   * @param {FileReader} reader
   * @param {number} index
   */
  var loadNextImage = function (elements, reader, index) {
    reader.addEventListener('load', function () {
      elements[index].innerHTML = '<img src="' + reader.result + '"/>';
    });
  };

  uploadImages(avatarFileChooser, avatarPreviewList, 1, loadImage);
  uploadImages(photoFileChooser, photoPreviewList, MAX_NUMBER, loadNextImage);
})();
