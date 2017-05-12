'use strict';

module.exports = (function () {
  var element = null;
  var boundElement = null;
  var elementWidth = 0;
  var elementHeight = 0;

  /**
   * @param {Event} moveEvt
   */
  var onMouseMove = function (moveEvt) {
    moveEvt.preventDefault();
    var x = moveEvt.clientX - boundElement.getBoundingClientRect().left - Math.floor(elementWidth / 2);
    var y = moveEvt.clientY - boundElement.getBoundingClientRect().top - Math.floor(elementHeight / 2);

    if (x >= elementWidth && x <= boundElement.clientWidth - elementWidth &&
        y >= elementHeight && y <= boundElement.clientHeight - elementHeight) {
      element.style.left = x + 'px';
      element.style.top = y + 'px';
    }
  };

  /**
   * @param {Event} upEvt
   */
  var onMouseUp = function (upEvt) {
    upEvt.preventDefault();

    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  };

  /**
   * @param {Event} evt
   */
  var onDrag = function (evt) {
    evt.preventDefault();
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  /**
   * @param {Element} draggableElement
   * @param {Element} borderElement
   */
  var setDraggable = function (draggableElement, borderElement) {
    element = draggableElement;
    boundElement = borderElement;
    elementWidth = element.clientWidth;
    elementHeight = element.clientHeight;
    element.addEventListener('mousedown', onDrag);
  };

  return setDraggable;
})();
