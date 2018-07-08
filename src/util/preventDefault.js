export function preventDefault(e) {

  // Либо событие нам сюда передано, либо текущее событие сохранено в объекте окна
  e = e || window.event;

  // Если у события есть метод preventDefault, то вызываем его
  if (e.preventDefault) {
    e.preventDefault();
  }

  // Вдобавок, ставим в объект события флажок, что returnValue = false
  e.returnValue = false;
}
