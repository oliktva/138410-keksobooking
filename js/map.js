'use strict';


var PIN_HALF_WIDTH = 28;
var PIN_HEIGHT = 72;
var MIN_PRICE = 1000;
var MAX_PRICE = 1000000;
var MIN_ROOMS = 1;
var MAX_ROOMS = 5;

var pinMap = document.querySelector('.tokyo__pin-map');
var lodgeTemplate = document.querySelector('#lodge-template').content;
var offerDialog = document.querySelector('#offer-dialog');
var dialogPanel = offerDialog.querySelector('.dialog__panel');
var dialogTitle = offerDialog.querySelector('.dialog__title');

var avatars = [1, 2, 3, 4, 5, 6, 7, 8];
var offerTitles = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var offerTypes = ['flat', 'house', 'bungalo'];
var checkTimes = ['12:00', '13:00', '14:00'];
var offerFeatures = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

/**
 * it generates integer random value from min to max inclusive
 * @param  {int} min - min value
 * @param  {int} max - max value
 * @return {int}     - integer random value
 */
var getRandom = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

/**
 * it exchange the elements of array
 * @param  {Array} array - array for changing
 * @param  {int} i     - index of first element
 * @param  {int} j     - index of second element
 */
var exchangeArrayElements = function (array, i, j) {
  var tmp = array[i];
  array[i] = array[j];
  array[j] = tmp;
};

/**
 * it shuffle of array by "Fisher–Yates shuffle (The modern algorithm)"
 * @param  {Array} array - array for shuffle
 */
var shuffleArray = function (array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = getRandom(0, i + 1);
    exchangeArrayElements(array, i, j);
  }
};

/**
 * Coordinates on a two-dimensional space
 * @typedef {Object} Location
 * @property {int} x - abscissa
 * @property {int} y - ordinate
 */

/**
 * it create Location with integer x and y properties
 * @return {Location} - random point on the map
 */
var createLocation = function () {
  return {x: getRandom(300, 901), y: getRandom(100, 501)};
};

/**
 * it creates list of string values of random length
 * @return {Array<string>} - array random string values from offerFeatures
 */
var createFeatures = function () {
  var num = getRandom(2, offerFeatures.length + 1);
  shuffleArray(offerFeatures);
  var features = [];
  for (var i = 0; i < num; i++) {
    features[i] = offerFeatures[i];
  }
  return features;
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
 * @property {int} price - offer's price
 * @property {string} type - offer's type from offerTypes
 * @property {int} rooms - offer's number of rooms
 * @property {int} guests - offer's number of guests
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
 * it creates place object with random values (except avatar and title)
 * @param  {[type]} avatarNumber - avatar path
 * @param  {[type]} title        - title value
 * @return {Place}              - generated data about place
 */
var createPlace = function (avatarNumber, title) {
  var place = {};
  var avatarPath = 'img/avatars/user0' + avatarNumber + '.png';
  place.author = {avatar: avatarPath};

  place.location = createLocation();

  var offer = {};
  offer.title = title;
  offer.address = place.location.x + ', ' + place.location.y;
  offer.price = getRandom(MIN_PRICE, MAX_PRICE + 1);
  offer.type = offerTypes[getRandom(0, offerTypes.length)];
  offer.rooms = getRandom(MIN_ROOMS, MAX_ROOMS + 1);
  offer.guests = getRandom(MIN_ROOMS + 3, MAX_ROOMS + 4);
  offer.checkin = checkTimes[getRandom(0, checkTimes.length)];
  offer.checkout = checkTimes[getRandom(0, checkTimes.length)];
  offer.features = createFeatures();
  offer.description = '';
  offer.photos = [];

  place.offer = offer;
  return place;
};

/**
 * it creates array of places of given length
 * @param  {int} number - number of generated objects
 * @return {Array<Place>}        - array of Place objects
 */
var createPlaces = function (number) {
  var places = [];
  shuffleArray(avatars);
  shuffleArray(offerTitles);
  for (var i = 0; i < number; i++) {
    places[i] = createPlace(avatars[i], offerTitles[i]);
  }
  return places;
};

/**
 * it formats value dividing into digits
 * @param  {int} price - value for formatting
 * @return {string}       - formatting value
 */
var getFormattedPrice = function (price) {
  if (price > 10000) {
    return price.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
  } else {
    return price.toString();
  }
};

/**
 * it correlate offer value from offerTypes to ru localization
 * @param  {string} type - string value from offerTypes
 * @return {string}      - localization value for type
 */
var getOfferType = function (type) {
  var typesMap = {
    flat: 'Квартира',
    house: 'Дом',
    bungalo: 'Бунгало'
  };
  return typesMap[type];
};

/**
 * sorting array of places by location.y
 * @param  {Array<Place>} array - array for sorting
 */
var sortingPlacesByLocationY = function (array) {
  array.sort(function (a, b) {
    return a.location.y - b.location.y;
  });
};

/**
 * it create DOM element for pin
 * @param  {Author} author   - object with data about author
 * @param  {Location} location - object with data about location
 * @return {Element}        - element for pin
 */
var getPinElement = function (author, location) {
  var img = '<img src="' + author.avatar + '" class="rounded" width="40" height="40">';
  var pinElement = document.createElement('div');
  pinElement.classList.add('pin');
  pinElement.style.left = (location.x - PIN_HALF_WIDTH) + 'px';
  pinElement.style.top = (location.y - PIN_HEIGHT) + 'px';
  pinElement.insertAdjacentHTML('afterBegin', img);
  return pinElement;
};

/**
 * it render pins on the page
 * @param  {Array<Place>} places - array of Place
 */
var renderPins = function (places) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < places.length; i++) {
    fragment.appendChild(getPinElement(places[i].author, places[i].location));
  }
  pinMap.appendChild(fragment);
};

/**
 * it render window with certain element of places
 * @param  {Place} place - certain element of places
 * @return {Element}       - element with window
 */
var renderOfferDialog = function (place) {
  var lodgeElement = lodgeTemplate.cloneNode(true);
  lodgeElement.querySelector('.lodge__title').textContent = place.offer.title;
  lodgeElement.querySelector('.lodge__address').textContent = place.offer.address;
  lodgeElement.querySelector('.lodge__price').innerHTML = getFormattedPrice(place.offer.price) + ' &#x20bd;/ночь';
  lodgeElement.querySelector('.lodge__type').textContent = getOfferType(place.offer.type);
  lodgeElement.querySelector('.lodge__rooms-and-guests').textContent = 'Для ' + place.offer.guests + ' гостей в ' + place.offer.rooms + ' комнатах';
  lodgeElement.querySelector('.lodge__checkin-time').textContent = 'Заезд после ' + place.offer.checkin + ', выезд до ' + place.offer.checkout;
  for (var i = 0; i < place.offer.features.length; i++) {
    var html = '<span class = "feature__image feature__image--' + place.offer.features[i] + '"></span>';
    lodgeElement.querySelector('.lodge__features').insertAdjacentHTML('beforeEnd', html);
  }
  lodgeElement.querySelector('.lodge__description').textContent = place.offer.description;
  return lodgeElement;
};


var places = createPlaces(8);
sortingPlacesByLocationY(places);
renderPins(places);
offerDialog.replaceChild(renderOfferDialog(places[0]), dialogPanel);
dialogTitle.querySelector('img').setAttribute('src', places[0].author.avatar);
