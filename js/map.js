'use strict';

/** @enum {number} */
var PlaceDimension = {
  PIN_WIDTH: 56,
  PIN_HEIGHT: 72
};

/** @enum {number} */
var PlaceValue = {
  MIN_PRICE: 1000,
  MAX_PRICE: 1000000,
  MIN_ROOMS: 1,
  MAX_ROOMS: 5,
  MIN_FEATURES: 1,
  NUMBER_OF_PLACES: 8
};

/** @constant {Object} */
var TYPES_MAP = {flat: 'Квартира', house: 'Дом', bungalo: 'Бунгало'};

/** @enum {Array} */
var PlaceData = {
  AVATARS: [1, 2, 3, 4, 5, 6, 7, 8],
  OFFER_TITLES: ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'],
  OFFER_TYPES: ['flat', 'house', 'bungalo'],
  CHECK_TIMES: ['12:00', '13:00', '14:00'],
  OFFER_FEATURES: ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner']
};

/** @enum {number} */
var KeyCode = {
  ESC_KEY_CODE: 27,
  ENTER_KEY_CODE: 13
};

/** @constant {string} */
var HIDDEN_CLASS = 'hidden';

var pinMap = document.querySelector('.tokyo__pin-map');
var lodgeTemplate = document.querySelector('#lodge-template').content;
var offerDialog = document.querySelector('#offer-dialog');
var dialogClose = offerDialog.querySelector('.dialog__close');

/**
 * generates integer random value from min to max inclusive
 * @param  {number} min
 * @param  {number} max
 * @return {number}
 */
var getRandom = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

/**
 * exchanges two elements of array
 * @param  {Array} array
 * @param  {number} i
 * @param  {number} j
 */
var exchangeArrayElements = function (array, i, j) {
  var tmp = array[i];
  array[i] = array[j];
  array[j] = tmp;
};

/**
 * shuffles of array by "Fisher–Yates shuffle (The modern algorithm)"
 * @param  {Array} array
 * @return {Array}
 */
var shuffleArray = function (array) {
  var localArray = array.slice(0);
  for (var i = array.length - 1; i > 0; i--) {
    var j = getRandom(0, i + 1);
    exchangeArrayElements(array, i, j);
  }
  return localArray;
};

/**
 * Coordinates on a two-dimensional space
 * @typedef {Object} Location
 * @property {number} x - abscissa
 * @property {number} y - ordinate
 */

/**
 * creates Location with integer x and y properties
 * @return {Location}
 */
var createLocation = function () {
  return {x: getRandom(300, 901), y: getRandom(100, 501)};
};

/**
 * creates list of string values of random length
 * @param  {number} min
 * @param  {Array} array
 * @return {Array}
 */
var createArrayRandomLength = function (min, array) {
  var num = getRandom(min, array.length + 1);
  return shuffleArray(array).slice(0, num + 1);
};

/**
 * Object with data about author
 * @typedef {Object} Author
 * @property {string} avatar - path to avatar's image
 */

/**
 * Object with data about offer
 * @typedef {Object} Offer
 * @property {string} title - offer's title from offerTitles
 * @property {string} address - offer's address
 * @property {number} price - offer's price
 * @property {string} type - offer's type from offerTypes
 * @property {number} rooms - offer's number of rooms
 * @property {number} guests - offer's number of guests
 * @property {string} checkin - offer's checkin time from checkTimes
 * @property {string} checkout - offer's checkout time from checkTimes
 * @property {Array<string>} features - offer's features from offerFeatures
 * @property {string} descriotion - offer's description
 * @property {Array<string>} photos - offer's photos
 */

 /**
  * Object with data about place
  * @typedef {Object} Place
  * @property {Author} author - data about author
  * @property {Offer} offer - data about offer
  * @property {Location} location - data about location
  */

/**
 * creates place object with random values (except avatar and title)
 * @param  {string} avatarNumber
 * @param  {string} offerTitle
 * @return {Place}
 */
var createPlace = function (avatarNumber, offerTitle) {
  var place = {};
  var avatarPath = 'img/avatars/user0' + avatarNumber + '.png';
  place.author = {avatar: avatarPath};

  place.location = createLocation();

  place.offer = {
    title: offerTitle,
    address: place.location.x + ', ' + place.location.y,
    price: getRandom(PlaceValue.MIN_PRICE, PlaceValue.MAX_PRICE + 1),
    type: PlaceData.OFFER_TYPES[getRandom(0, PlaceData.OFFER_TYPES.length)],
    rooms: getRandom(PlaceValue.MIN_ROOMS, PlaceValue.MAX_ROOMS + 1),
    guests: getRandom(PlaceValue.MIN_ROOMS + 3, PlaceValue.MAX_ROOMS + 4),
    checkin: PlaceData.CHECK_TIMES[getRandom(0, PlaceData.CHECK_TIMES.length)],
    checkout: PlaceData.CHECK_TIMES[getRandom(0, PlaceData.CHECK_TIMES.length)],
    features: createArrayRandomLength(PlaceValue.MIN_FEATURES, PlaceData.OFFER_FEATURES),
    description: '',
    photos: []
  };

  return place;
};

/**
 * creates array of places of given length
 * @param  {number} number
 * @return {Array<Place>}
 */
var createPlaces = function (number) {
  var places = [];
  var avatars = shuffleArray(PlaceData.AVATARS);
  var offerTitles = shuffleArray(PlaceData.OFFER_TITLES);
  for (var i = 0; i < number; i++) {
    places[i] = createPlace(avatars[i], offerTitles[i]);
  }
  return places;
};

/**
 * formats value dividing into digits
 * @param  {number} price
 * @return {string}
 */
var getFormattedPrice = function (price) {
  if (price >= 10000) {
    return price.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
  } else {
    return price.toString();
  }
};

/**
 * sorting array of places by location.y
 * @param  {Array<Place>} array
 */
var sortPlacesByLocationY = function (array) {
  array.sort(function (a, b) {
    return a.location.y - b.location.y;
  });
};

/**
 * creates DOM element for pin
 * @param  {Author} author
 * @param  {Location} location
 * @param {number} index
 * @return {Element}
 */
var getPinElement = function (author, location) {
  var img = '<img src="' + author.avatar + '" class="rounded" width="40" height="40">';
  var pinElement = document.createElement('div');
  pinElement.classList.add('pin');
  pinElement.setAttribute('tabindex', '0');
  pinElement.style.left = (location.x - Math.floor(PlaceDimension.PIN_WIDTH / 2)) + 'px';
  pinElement.style.top = (location.y - PlaceDimension.PIN_HEIGHT) + 'px';
  pinElement.insertAdjacentHTML('afterBegin', img);
  return pinElement;
};

/**
 * render pins on the page
 * @param  {Array<Place>} places
 */
var renderPins = function (places) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < places.length; i++) {
    fragment.appendChild(getPinElement(places[i].author, places[i].location));
  }
  pinMap.appendChild(fragment);
};

/**
 * generates element: window with certain element of places
 * @param  {Place} place
 * @return {Element}
 */
var getOfferDialog = function (place) {
  var lodgeElement = lodgeTemplate.cloneNode(true);
  lodgeElement.querySelector('.lodge__title').textContent = place.offer.title;
  lodgeElement.querySelector('.lodge__address').textContent = place.offer.address;
  lodgeElement.querySelector('.lodge__price').innerHTML = getFormattedPrice(place.offer.price) + ' &#x20bd;/ночь';
  lodgeElement.querySelector('.lodge__type').textContent = TYPES_MAP[place.offer.type];
  lodgeElement.querySelector('.lodge__rooms-and-guests').textContent = 'Для ' + place.offer.guests + ' гостей в ' + place.offer.rooms + ' комнатах';
  lodgeElement.querySelector('.lodge__checkin-time').textContent = 'Заезд после ' + place.offer.checkin + ', выезд до ' + place.offer.checkout;
  for (var i = 0; i < place.offer.features.length; i++) {
    var html = '<span class = "feature__image feature__image--' + place.offer.features[i] + '"></span>';
    lodgeElement.querySelector('.lodge__features').insertAdjacentHTML('beforeEnd', html);
  }
  lodgeElement.querySelector('.lodge__description').textContent = place.offer.description;
  return lodgeElement;
};

/**
 * renders window with element of places
 * @param  {Place} place
 */
var renderOfferDialog = function (place) {
  offerDialog.replaceChild(getOfferDialog(place), offerDialog.querySelector('.dialog__panel'));
  offerDialog.querySelector('.dialog__title').querySelector('img').setAttribute('src', place.author.avatar);
};

/**
 * delete pin--active class if is exist
 */
var unsetActivePin = function () {
  var active = pinMap.querySelector('.pin--active');
  if (active !== null) {
    active.classList.remove('pin--active');
  }
};

/**
 * add pin--active class
 * @param  {Element} element
 */
var setActivePin = function (element) {
  unsetActivePin();
  element.classList.add('pin--active');
};

/**
 * set element visible
 * @param  {Element}  element
 * @param  {boolean} isVisible
 */
var setElementVisible = function (element, isVisible) {
  element.classList.toggle(HIDDEN_CLASS, !isVisible);
};

var isElementInvisible = function (element) {
  return element.classList.contains(HIDDEN_CLASS);
};

/**
 * open dialog window
 * @param  {Place} place
 */
var openOfferDialog = function (place) {
  renderOfferDialog(place);
  if (isElementInvisible(offerDialog)) {
    setElementVisible(offerDialog, true);
  }

  dialogClose.addEventListener('keydown', onOfferDialogKeydown);
  document.addEventListener('keydown', onDocumentEscKeydown);
};

/**
 * close dialog window
 */
var closeOfferDialog = function () {
  setElementVisible(offerDialog, false);
  unsetActivePin();

  dialogClose.removeEventListener('keydown', onOfferDialogKeydown);
  document.removeEventListener('keydown', onDocumentEscKeydown);
};

/**
 * @param  {event} evt
 */
var onDocumentEscKeydown = function (evt) {
  if (evt.keyCode === KeyCode.ESC_KEY_CODE) {
    closeOfferDialog();
  }
};

/**
 * @param  {event} evt
 */
var onOfferDialogKeydown = function (evt) {
  if (evt.keyCode === KeyCode.ENTER_KEY_CODE) {
    closeOfferDialog();
  }
};

/**
 * @param  {event} evt
 */
var onDialogCloseClick = function (evt) {
  evt.preventDefault();
  closeOfferDialog();
};

var places = createPlaces(PlaceValue.NUMBER_OF_PLACES);
sortPlacesByLocationY(places);
renderPins(places);
renderOfferDialog(places[0]);

var pins = pinMap.querySelectorAll('.pin:not(.pin__main)');
setActivePin(pins[0]);
places.forEach(function (item, i) {
  pins[i].addEventListener('click', function (evt) {
    setActivePin(evt.currentTarget);
    openOfferDialog(item);
  });
  pins[i].addEventListener('keydown', function (evt) {
    if (evt.keyCode === KeyCode.ENTER_KEY_CODE) {
      setActivePin(evt.currentTarget);
      openOfferDialog(item);
    }
  });
});

dialogClose.addEventListener('click', onDialogCloseClick);
