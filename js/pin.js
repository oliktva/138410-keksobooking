'use strict';

var checkKey = require('./utils/check-key.js');

(function () {
  /** @enum {number} */
  var PlaceDimension = {
    PIN_WIDTH: 56,
    PIN_HEIGHT: 72
  };

  /**
   * @param  {Array<Object>} data
   * @param  {Function} callback
   */
  var Pin = function (data, callback) {
    var pin = this;
    this.element = (function () {
      var element = document.createElement('div');
      var img = '<img src="' + data.author.avatar + '" class="rounded" width="40" height="40">';
      element.classList.add('pin');
      element.setAttribute('tabindex', '0');
      element.style.left = (data.location.x - Math.floor(PlaceDimension.PIN_WIDTH / 2)) + 'px';
      element.style.top = (data.location.y - PlaceDimension.PIN_HEIGHT) + 'px';
      element.insertAdjacentHTML('afterBegin', img);
      return element;
    })();
    this.data = data;
    this.active = false;
    this.onClick = function () {
      callback(pin);
    };
    this.onKeydown = function (evt) {
      if (checkKey.isEnter(evt)) {
        callback(pin);
      }
    };

    this.element.addEventListener('click', this.onClick);
    this.element.addEventListener('keydown', this.onKeydown);
  };

  Pin.prototype.remove = function () {
    this.element.removeEventListener('click', this.onClick);
    this.element.removeEventListener('keydown', this.onKeydown);
  };

  /**
   * delete pin--active class if is exist
   */
  Pin.prototype.unsetActive = function () {
    this.element.classList.remove('pin--active');
    this.active = false;
  };

  /**
   * add pin--active class
   */
  Pin.prototype.setActive = function () {
    this.element.classList.add('pin--active');
    this.active = true;
  };

  module.exports = Pin;
})();
