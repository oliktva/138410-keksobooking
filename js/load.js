'use strict';

window.load = (function () {
  var xhr = new XMLHttpRequest();
  xhr.responseType = 'json';

  /**
   * @return {string}
   */
  var getMessage = function () {
    switch (xhr.status) {
      case 403:
        return 'Сервер нашел, что искал ты, но не покажет.';
      case 404:
        return 'Не найдено то, что ищешь ты.';
      case 500:
        return 'Не отвечает сервер, позже прийди ты.';
      default:
        return 'Ошибка неопознанная, подскажет к решению путь администратор.';
    }
  };

  /**
   * create and render error window
   */
  var renderErrorElement = function () {
    var error = document.createElement('div');
    var message = document.createElement('div');
    var btnWrapper = document.createElement('div');
    var btn = document.createElement('a');

    btn.textContent = 'Ну и ладно';
    btn.classList.add('error-btn');

    btnWrapper.classList.add('error-btn-wrapper');
    btnWrapper.appendChild(btn);
    message.textContent = getMessage();

    error.classList.add('error-window');
    error.appendChild(message);
    error.appendChild(btnWrapper);
    document.body.appendChild(error);

    var setElementHidden = function (evt) {
      evt.preventDefault();
      error.classList.add('hidden');

      btn.removeEventListener('click', setElementHidden);
    };

    btn.addEventListener('click', setElementHidden);
  };

  /**
   * @param  {string} url
   * @param  {Function} onLoad
   */
  var load = function (url, onLoad) {
    xhr.open('GET', url);
    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoad(xhr.response);
      } else {
        renderErrorElement(xhr.status);
      }
    });
    xhr.send();
  };

  return load;
})();
