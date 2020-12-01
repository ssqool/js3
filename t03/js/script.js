"use strict";

let field = document.querySelector('#field');

let state = {
  offsetX: 0,
  offsetY: 0,
  target: null
};

field.addEventListener('mousedown', event => {
  if (event.target.classList.contains('movable')){
    state.target = event.target;
    state.offsetX = event.offsetX;
    state.offsetY = event.offsetY;
  }
});

field.addEventListener('mouseup', () => {
  state.target = null;
});

field.addEventListener('mousemove', e => {
  if (state.target) {
    state.target.style.left = (e.pageX - state.offsetX) + 'px';
    state.target.style.top = (e.pageY - state.offsetY) + 'px';
  }
});
