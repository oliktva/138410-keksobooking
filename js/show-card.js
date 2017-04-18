'use strict';

window.showCard = (function () {
  var offerDialog = document.querySelector('#offer-dialog');
  var lodgeTemplate = document.querySelector('#lodge-template').content;
  var dialogClose = offerDialog.querySelector('.dialog__close');
  var cb;

  /**
   * generates element: window with certain element of places
   * @param  {Place} place
   * @return {Element}
   */
  var getCardData = function (place) {
    var lodgeElement = lodgeTemplate.cloneNode(true);
    lodgeElement.querySelector('.lodge__title').textContent = place.offer.title;
    lodgeElement.querySelector('.lodge__address').textContent = place.offer.address;
    lodgeElement.querySelector('.lodge__price').innerHTML = window.data.getFormattedPrice(place.offer.price) + ' &#x20bd;/ночь';
    lodgeElement.querySelector('.lodge__type').textContent = window.data.TYPES_MAP[place.offer.type];
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
  var renderCard = function (place) {
    offerDialog.replaceChild(getCardData(place), offerDialog.querySelector('.dialog__panel'));
    offerDialog.querySelector('.dialog__title').querySelector('img').setAttribute('src', place.author.avatar);
  };

  /**
   * open dialog window
   * @param  {Place} place
   * @param {Function} callback
   */
  var showCard = function (place, callback) {
    cb = callback;
    renderCard(place);
    if (window.visibility.isElementInvisible(offerDialog)) {
      window.visibility.setElementVisible(offerDialog, true);
    }

    dialogClose.addEventListener('click', onCardCloseClick);
    dialogClose.addEventListener('keydown', onCardKeydown);
    document.addEventListener('keydown', onDocumentEscKeydown);
  };

  /**
   * close dialog window
   */
  var closeCard = function () {
    window.visibility.setElementVisible(offerDialog, false);
    cb();

    dialogClose.removeEventListener('keydown', onCardKeydown);
    document.removeEventListener('keydown', onDocumentEscKeydown);
  };

  /**
   * @param  {Event} evt
   */
  var onDocumentEscKeydown = function (evt) {
    if (window.checkKey.isEsc(evt)) {
      closeCard();
    }
  };

  /**
   * @param  {Event} evt
   */
  var onCardKeydown = function (evt) {
    if (window.checkKey.isEnter(evt)) {
      closeCard();
    }
  };

  /**
   * @param  {Event} evt
   */
  var onCardCloseClick = function (evt) {
    evt.preventDefault();
    closeCard();
  };

  return showCard;
})();
