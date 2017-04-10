'use strict';

window.card = (function () {
  var offerDialog = document.querySelector('#offer-dialog');
  var lodgeTemplate = document.querySelector('#lodge-template').content;
  var dialogClose = offerDialog.querySelector('.dialog__close');

  /**
   * generates element: window with certain element of places
   * @param  {Place} place
   * @return {Element}
   */
  var getOfferDialog = function (place) {
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
  var renderOfferDialog = function (place) {
    offerDialog.replaceChild(getOfferDialog(place), offerDialog.querySelector('.dialog__panel'));
    offerDialog.querySelector('.dialog__title').querySelector('img').setAttribute('src', place.author.avatar);
  };

  /**
   * open dialog window
   * @param  {Place} place
   */
  var openOfferDialog = function (place) {
    renderOfferDialog(place);
    if (window.visibility.isElementInvisible(offerDialog)) {
      window.visibility.setElementVisible(offerDialog, true);
    }

    dialogClose.addEventListener('keydown', onOfferDialogKeydown);
    document.addEventListener('keydown', onDocumentEscKeydown);
  };

  /**
   * close dialog window
   */
  var closeOfferDialog = function () {
    window.visibility.setElementVisible(offerDialog, false);
    window.pin.unsetActivePin();

    dialogClose.removeEventListener('keydown', onOfferDialogKeydown);
    document.removeEventListener('keydown', onDocumentEscKeydown);
  };

  /**
   * @param  {event} evt
   */
  var onDocumentEscKeydown = function (evt) {
    if (window.checkKey.isEsc(evt)) {
      closeOfferDialog();
    }
  };

  /**
   * @param  {event} evt
   */
  var onOfferDialogKeydown = function (evt) {
    if (window.checkKey.isEnter(evt)) {
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

  var setCloseClickEvent = function () {
    dialogClose.addEventListener('click', onDialogCloseClick);
  };

  return {
    renderOfferDialog: renderOfferDialog,
    openOfferDialog: openOfferDialog,
    setCloseClickEvent: setCloseClickEvent
  };
})();
