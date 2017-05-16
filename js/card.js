'use strict';

var dataUtils = require('./utils/data-utils.js');
var visibility = require('./utils/visibility.js');
var checkKey = require('./utils/check-key.js');

(function () {
  var lodgeTemplate = document.querySelector('#lodge-template').content;
  var offerDialog = document.querySelector('#offer-dialog');
  var dialogClose = offerDialog.querySelector('.dialog__close');

  /**
   * generates element: window with certain element of places
   * @param {Place} place
   * @return {Element}
   */
  var getElement = function (place) {
    var lodgeElement = lodgeTemplate.cloneNode(true);
    lodgeElement.querySelector('.lodge__title').textContent = place.offer.title;
    lodgeElement.querySelector('.lodge__address').textContent = place.offer.address;
    lodgeElement.querySelector('.lodge__price').innerHTML = dataUtils.getFormattedPrice(place.offer.price) + ' &#x20bd;/ночь';
    lodgeElement.querySelector('.lodge__type').textContent = dataUtils.TYPES_MAP[place.offer.type];
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
   * generates element: window with certain element of places
   * @param {Place} place
   * @return {string}
   */
  var getAvatar = function (place) {
    return place.author.avatar;
  };

  var Card = function (pin) {
    var card = this;
    this.pin = pin;
    this.element = getElement(pin.data);
    this.onCardCloseClick = function (evt) {
      evt.preventDefault();
      card.close();
      card.pin.unsetActive();
    };
    this.onDocumentEscKeydown = function (evt) {
      if (checkKey.isEsc(evt)) {
        card.close();
        card.pin.unsetActive();
      }
    };
    this.onCardKeydown = function (evt) {
      if (checkKey.isEnter(evt)) {
        card.close();
        card.pin.unsetActive();
      }
    };
  };

  Card.prototype.render = function () {
    offerDialog.replaceChild(this.element.cloneNode(true), offerDialog.querySelector('.dialog__panel'));
    offerDialog.querySelector('.dialog__title').querySelector('img').setAttribute('src', getAvatar(this.pin.data));
  };

  Card.prototype.show = function () {
    this.render();
    if (visibility.isElementInvisible(offerDialog)) {
      visibility.setElementVisible(offerDialog, true);
    }

    dialogClose.addEventListener('click', this.onCardCloseClick);
    dialogClose.addEventListener('keydown', this.onCardKeydown);
    document.addEventListener('keydown', this.onDocumentEscKeydown);
  };

  Card.prototype.close = function () {
    visibility.setElementVisible(offerDialog, false);

    dialogClose.removeEventListener('keydown', this.onCardKeydown);
    document.removeEventListener('keydown', this.onDocumentEscKeydown);
  };
  module.exports = Card;
})();
