'use strict';

module.exports = (function () {
  /**
   * @return {Element}
   */
  var renderWindow = function () {
    var errorTemplate = document.querySelector('#error-template').content.querySelector('.error');
    return errorTemplate.cloneNode(true);
  };

  var onCloseErrorClick = function () {
    document.querySelector('.error__btn').removeEventListener('click', onCloseErrorClick);
    document.body.removeChild(document.querySelector('.error'));
  };

  /**
   * @param {string} message
   */
  return function (message) {
    var errorWindow = renderWindow();

    var btn = errorWindow.querySelector('.error__btn');
    btn.textContent = 'Ну и ладно';
    errorWindow.querySelector('.error__message').textContent = message;

    document.body.appendChild(errorWindow);

    btn.addEventListener('click', onCloseErrorClick);
  };
})();
