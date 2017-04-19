'use strict';

window.showErrorWindow = (function () {
  /**
   * @return {Element}
   */
  var renderWindow = function () {
    var errorTemplate = document.querySelector('#error-template').content.querySelector('.error');
    var error = errorTemplate.cloneNode(true);
    return error;
  };

  /**
   * @param  {string} message
   */
  return function (message) {
    var errorWindow = renderWindow(message);

    errorWindow.querySelector('.error__btn').textContent = 'Ну и ладно';
    errorWindow.querySelector('.error__message').textContent = message;

    document.body.appendChild(errorWindow);

    errorWindow.querySelector('.error__btn').addEventListener('click', function () {
      document.body.removeChild(errorWindow);
    });
  };
})();
