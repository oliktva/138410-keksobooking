'use strict';

window.setDraggable = (function () {
  var element = null;
  var boundElement = null;

  /**
   * @param  {Event} moveEvt
   */
  var onMouseMove = function (moveEvt) {
    moveEvt.preventDefault();
    var x = moveEvt.pageX - boundElement.offsetLeft - element.clientWidth;
    var y = moveEvt.pageY - boundElement.offsetTop - Math.floor(element.clientHeight / 2);

    if (x >= element.clientWidth && x <= boundElement.clientWidth - element.clientWidth &&
        y >= element.clientHeight && y <= boundElement.clientHeight - element.clientHeight) {
      element.style.left = x + 'px';
      element.style.top = y + 'px';
    }
  };

  /**
   * @param  {Event} upEvt
   */
  var onMouseUp = function (upEvt) {
    upEvt.preventDefault();

    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  };

  /**
   * @param  {Event} evt
   */
  var onDrag = function (evt) {
    evt.preventDefault();
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  /**
   * @param  {Element} _element
   * @param {Element} _boundElement
   */
  var setDraggable = function (_element, _boundElement) {
    element = _element;
    boundElement = _boundElement;
    element.addEventListener('mousedown', onDrag);
  };

  return setDraggable;
})();
