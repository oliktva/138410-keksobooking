'use strict';

window.setDraggable = (function () {
  var element = null;
  var coordsState = null;

  /**
   * @param  {Event} moveEvt
   */
  var onMouseMove = function (moveEvt) {
    moveEvt.preventDefault();
    var shift = {
      x: coordsState.x - moveEvt.clientX,
      y: coordsState.y - moveEvt.clientY
    };

    coordsState = {
      x: moveEvt.clientX,
      y: moveEvt.clientY
    };

    element.style.top = (element.offsetTop - shift.y) + 'px';
    element.style.left = (element.offsetLeft - shift.x) + 'px';
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
  var onPinDrag = function (evt) {
    evt.preventDefault();
    coordsState = {
      x: evt.clientX,
      y: evt.clientY
    };
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  /**
   * @param  {Element} _element
   */
  var setDraggable = function (_element) {
    element = _element;
    element.addEventListener('mousedown', onPinDrag);
  };

  return setDraggable;
})();
