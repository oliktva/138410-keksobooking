'use strict';

(function () {
  var MAX_NUMBER = 16;
  var avatarFileChooser = document.querySelector('.notice__photo .upload input[type=file]');
  var avatarPreview = document.querySelector('.notice__preview img');
  var photoFileChooser = document.querySelector('.form__photo-container .upload input[type=file]');
  var photoPreviewList = document.querySelectorAll('.form__photo');

  window.dragNdrop.oneImage(avatarFileChooser, avatarPreview);
  window.dragNdrop.manyImages(photoFileChooser, photoPreviewList, MAX_NUMBER);
})();
