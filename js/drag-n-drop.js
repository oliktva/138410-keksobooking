'use strict';

window.dragNdrop = (function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  /**
   * @param  {string} fileName
   * @return {string}
   */
  var getMatches = function (fileName) {
    return FILE_TYPES.some(function (item) {
      return fileName.endsWith(item);
    });
  };

  /**
   * @param  {Element} element
   * @param  {FileReader} reader
   */
  var loadImage = function (element, reader) {
    reader.addEventListener('load', function () {
      element.src = reader.result;
    });
  };

  /**
   * @param  {Element} elements
   * @param  {number} index
   * @param  {FileReader} reader
   */
  var loadNextImage = function (elements, index, reader) {
    reader.addEventListener('load', function () {
      elements[index].innerHTML = '<img src="' + reader.result + '"/>';
    });
  };

  /**
   * @param  {Element} inputFileElement
   * @param  {Element} previewElement
   */
  var oneImage = function (inputFileElement, previewElement) {
    inputFileElement.addEventListener('change', function () {
      var file = inputFileElement.files[0];
      var fileName = file.name.toLowerCase();

      if (getMatches(fileName)) {
        var reader = new FileReader();
        loadImage(previewElement, reader);
        reader.readAsDataURL(file);
      } else {
        window.showErrorWindow('Загружаемый файл не является фотографией :(');
      }
    });
  };

  /**
   * @param  {Eleemnt} inputFileElement [description]
   * @param  {Array<Element>} previewElements  [description]
   * @param  {number} max
   */
  var manyImages = function (inputFileElement, previewElements, max) {
    var maxNumber = max ? max : 5;
    var currentPreviewIndex = 0;
    inputFileElement.addEventListener('change', function () {
      for (var i = 0; i < inputFileElement.files.length; i++) {
        var file = inputFileElement.files[i];
        var fileName = file.name.toLowerCase();

        if (getMatches(fileName)) {
          if (currentPreviewIndex < maxNumber) {
            var reader = new FileReader();
            loadNextImage(previewElements, currentPreviewIndex, reader);
            reader.readAsDataURL(file);
            currentPreviewIndex++;
          } else {
            window.showErrorWindow('Нельзя большее фотографий количество загрузить :(');
          }
        } else {
          window.showErrorWindow('Загружаемый файл не является фотографией :(');
        }
      }
    });
  };

  return {
    oneImage: oneImage,
    manyImages: manyImages
  };
})();
