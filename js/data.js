'use strict';

window.data = (function () {
  /** @enum {number} */
  var PlaceValue = {
    MIN_PRICE: 1000,
    MAX_PRICE: 1000000,
    MIN_ROOMS: 1,
    MAX_ROOMS: 5,
    MIN_FEATURES: 1
  };

  /** @constant {Object} */
  var TYPES_MAP = {'flat': 'Квартира', 'house': 'Дом', 'bungalo': 'Бунгало'};

  /** @enum {Array} */
  var PlaceData = {
    AVATARS: [1, 2, 3, 4, 5, 6, 7, 8],
    OFFER_TITLES: ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'],
    OFFER_TYPES: ['flat', 'house', 'bungalo'],
    CHECK_TIMES: ['12:00', '13:00', '14:00'],
    OFFER_FEATURES: ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner']
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
    return {x: window.utils.getRandom(300, 901), y: window.utils.getRandom(100, 501)};
  };

  /**
   * creates list of string values of random length
   * @param  {number} min
   * @param  {Array} array
   * @return {Array}
   */
  var createArrayRandomLength = function (min, array) {
    var num = window.utils.getRandom(min, array.length + 1);
    return window.utils.shuffleArray(array).slice(0, num + 1);
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
      price: window.utils.getRandom(PlaceValue.MIN_PRICE, PlaceValue.MAX_PRICE + 1),
      type: PlaceData.OFFER_TYPES[window.utils.getRandom(0, PlaceData.OFFER_TYPES.length)],
      rooms: window.utils.getRandom(PlaceValue.MIN_ROOMS, PlaceValue.MAX_ROOMS + 1),
      guests: window.utils.getRandom(PlaceValue.MIN_ROOMS + 3, PlaceValue.MAX_ROOMS + 4),
      checkin: PlaceData.CHECK_TIMES[window.utils.getRandom(0, PlaceData.CHECK_TIMES.length)],
      checkout: PlaceData.CHECK_TIMES[window.utils.getRandom(0, PlaceData.CHECK_TIMES.length)],
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
    var avatars = window.utils.shuffleArray(PlaceData.AVATARS);
    var offerTitles = window.utils.shuffleArray(PlaceData.OFFER_TITLES);
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

  return {
    TYPES_MAP: TYPES_MAP,
    PlaceData: PlaceData,
    createPlaces: createPlaces,
    getFormattedPrice: getFormattedPrice,
    createPlacesList: createPlaces,
    sortPlacesByLocationY: sortPlacesByLocationY
  };
})();
