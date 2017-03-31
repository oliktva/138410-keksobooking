'use strict';

var pinMap = document.querySelector('.tokyo__pin-map');
var lodgeTemplate = document.querySelector('#lodge-template').content;
var offerDialog = document.querySelector('#offer-dialog');
var dialogPanel = offerDialog.querySelector('.dialog__panel');

var avatars = [1, 2, 3, 4, 5, 6, 7, 8];
var offerTitles = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var offerTypes = ['flat', 'house', 'bungalo'];
var checkTimes = ['12:00', '13:00', '14:00'];
var offerFeatures = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

var getRandom = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

var exchangeArrayElements = function (array, i, j) {
  var tmp = array[i];
  array[i] = array[j];
  array[j] = tmp;
};

// Fisher–Yates shuffle (The modern algorithm)
var shuffleArray = function (array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = getRandom(0, i + 1);
    exchangeArrayElements(array, i, j);
  }
};

var createLocation = function () {
  return {x: getRandom(300, 901), y: getRandom(100, 501)};
};

var createFeatures = function () {
  var num = getRandom(2, offerFeatures.length + 1);
  shuffleArray(offerFeatures);
  var features = [];
  for (var i = 0; i < num; i++) {
    features[i] = offerFeatures[i];
  }
  return features;
};

var createPlace = function (avatarNumber, title) {
  var place = {};
  var avatarPath = 'img/avatars/user0' + avatarNumber + '.png';
  place.author = {avatar: avatarPath};

  place.location = createLocation();

  var offer = {};
  offer.title = title;
  offer.address = place.location.x + ', ' + place.location.y;
  offer.price = getRandom(1000, 1000001);
  offer.type = offerTypes[getRandom(0, offerTypes.length)];
  offer.rooms = getRandom(1, 6);
  offer.guests = getRandom(1, 6);
  offer.checkin = checkTimes[getRandom(0, checkTimes.length)];
  offer.checkout = checkTimes[getRandom(0, checkTimes.length)];
  offer.features = createFeatures();
  offer.description = '';
  offer.photos = [];

  place.offer = offer;
  return place;
};

var createPlaces = function (number) {
  var places = [];
  shuffleArray(avatars);
  shuffleArray(offerTitles);
  for (var i = 0; i < number; i++) {
    places[i] = createPlace(avatars[i], offerTitles[i]);
  }
  return places;
};

var getOfferType = function (type) {
  switch (type) {
    case 'flat':
      return 'Квартира';
    case 'house':
      return 'Дом';
    case 'bungalo':
      return 'Бунгало';
    default: return 'Здание';
  }
};

var renderPin = function (place) {
  var img = '<img src="' + place.author.avatar + '">';
  var pinElement = document.createElement('div');
  pinElement.classList.add('pin');
  pinElement.style = 'left: ' + (place.location.x - 28) + 'px; top: ' + (place.location.y - 72) + 'px';
  pinElement.insertAdjacentHTML('afterBegin', img);
  return pinElement;
};

var renderPins = function (places) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < places.length; i++) {
    fragment.appendChild(renderPin(places[i]));
  }
  pinMap.appendChild(fragment);
};

var renderOfferDialog = function (place) {
  var lodgeElement = lodgeTemplate.cloneNode(true);
  var offer = place.offer;
  lodgeElement.querySelector('.lodge__title').textContent = offer.title;
  lodgeElement.querySelector('.lodge__address').textContent = offer.address;
  lodgeElement.querySelector('.lodge__price').innerHTML = offer.price + ' &#x20bd;/ночь';
  lodgeElement.querySelector('.lodge__type').textContent = getOfferType(offer.type);
  lodgeElement.querySelector('.lodge__rooms-and-guests').textContent = 'Для ' + offer.guests + ' гостей в ' + offer.rooms + ' комнатах';
  lodgeElement.querySelector('.lodge__checkin-time').textContent = 'Заезд после ' + offer.checkin + ', выезд до ' + offer.checkout;
  for (var i = 0; i < offer.features.length; i++) {
    var html = '<span class = \'feature__image feature__image--' + offer.features[i] + '\'></span>';
    lodgeElement.querySelector('.lodge__features').insertAdjacentHTML('beforeEnd', html);
  }
  lodgeElement.querySelector('.lodge__description').textContent = offer.description;
  return lodgeElement;
};


var places = createPlaces(8);
renderPins(places);
offerDialog.removeChild(dialogPanel);
offerDialog.appendChild(renderOfferDialog(places[0]));
