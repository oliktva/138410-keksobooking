'use strict';

window.pin = (function () {
  /** @enum {number} */
  var PlaceDimension = {
    PIN_WIDTH: 56,
    PIN_HEIGHT: 72
  };

  var pinMap = document.querySelector('.tokyo__pin-map');

  /**
   * creates DOM element for pin
   * @param  {Author} author
   * @param  {Location} location
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

  var getPinsElements = function () {
    return pinMap.querySelectorAll('.pin:not(.pin__main)');
  };

  return {
    renderPins: renderPins,
    unsetActivePin: unsetActivePin,
    setActivePin: setActivePin,
    getPinsElements: getPinsElements
  };
})();
