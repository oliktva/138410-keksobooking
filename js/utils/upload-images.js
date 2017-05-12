'use strict';

module.exports = (function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  /**
   * @param {string} fileName
   * @return {string}
   */
  var getMatches = function (fileName) {
    return FILE_TYPES.some(function (item) {
      return fileName.endsWith(item);
    });
  };

  /**
   * @param {Element} inputFileElement
   * @param {Array<Element>} previewElements
   * @param {number} max
   * @param {Function} callback
   */
  return function (inputFileElement, previewElements, max, callback) {
    var currentPreviewIndex = 0;
    inputFileElement.addEventListener('change', function () {
      if (max < inputFileElement.files.length) {
        window.showErrorWindow('Количество выбранных фотографий превосходит максимальное допустимое значение. Будет загружено ' + max + ' фотографий.');
      }

      for (var i = 0; i < Math.min(max, inputFileElement.files.length); i++) {
        var file = inputFileElement.files[i];
        var fileName = file.name.toLowerCase();

        if (getMatches(fileName)) {
          var reader = new FileReader();
          callback(previewElements, reader, currentPreviewIndex);
          reader.readAsDataURL(file);
          currentPreviewIndex++;
        } else {
          window.showErrorWindow('Загружаемый файл не является фотографией :(');
        }
      }
      if (currentPreviewIndex === max) {
        currentPreviewIndex = 0;
        inputFileElement.value = '';
      }
    });
  };
})();
