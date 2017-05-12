'use strict';

module.exports = (function () {
  /**
   * @param {number} status
   * @return {string}
   */
  var getMessage = function (status) {
    switch (status) {
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
   * @param {string} url
   * @param {Function} onLoad
   */
  return function (url, onLoad) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.open('GET', url);
    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoad(xhr.response);
      } else {
        window.showErrorWindow(getMessage(xhr.status));
      }
    });
    xhr.send();
  };
})();
