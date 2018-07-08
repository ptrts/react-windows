const OLD_FF_EVENT_DOM_MOUSE_SCROLL = 'DOMMouseScroll';

import {
  KEY_CODE_LEFT,
  KEY_CODE_UP,
  KEY_CODE_RIGHT,
  KEY_CODE_DOWN
} from './keyCodes';

import {preventDefault} from './preventDefault';

const KEYS_TO_PREVENT = {
  [KEY_CODE_LEFT]: 1,
  [KEY_CODE_UP]: 1,
  [KEY_CODE_RIGHT]: 1,
  [KEY_CODE_DOWN]: 1
};

function preventDefaultForScrollKeys(e) {

  // В объекте события должно быть поле, которое показывает,
  // какая кнопка была нажата
  let keyCode = e.keyCode;

  if (KEYS_TO_PREVENT[keyCode]) {
    preventDefault(e);
    return false;
  }
}

function disableScroll() {

  // Для старого FireFox
  // Вешаем на событие скроллинга отмену стандартной реакции
  if (window.addEventListener) {
    window.addEventListener(OLD_FF_EVENT_DOM_MOUSE_SCROLL, preventDefault, false);
  }

  // Для современных браузеров
  window.onwheel = preventDefault;

  // Для IE и совсем старых браузеров
  window.onmousewheel = document.onmousewheel = preventDefault;

  // Для мобилок
  window.ontouchmove = preventDefault;

  // Для отмены скроллинга с клавиатуры
  document.onkeydown = preventDefaultForScrollKeys;
}

function enableScroll() {

  // Для старого FireFox
  if (window.removeEventListener) {
    window.removeEventListener(OLD_FF_EVENT_DOM_MOUSE_SCROLL, preventDefault, false);
  }

  // Для современных браузеров
  window.onwheel = null;

  // Для IE и совсем старых браузеров
  window.onmousewheel = document.onmousewheel = null;

  // Для мобилок
  window.ontouchmove = null;

  // Для отмены скроллинга с клавиатуры
  document.onkeydown = null;
}

export {disableScroll, enableScroll};
