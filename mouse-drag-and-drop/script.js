const ball = document.getElementById('ball');

ball.onmousedown = function (event) {
  ball.style.position = 'absolute';
  ball.style.zIndex = 1000;

  document.body.append(ball);

  function moveAt(pageX, pageY) {
    ball.style.left = pageX - ball.offsetWidth / 2 + 'px';
    ball.style.top = pageY - ball.offsetHeight / 2 + 'px';
  }

  moveAt(event.pageX, event.pageY);

  let currentDroppable = null;
  function onMouseMove(event) {
    moveAt(event.pageX, event.pageY);

    ball.hidden = true; // 이벤트가 일어난 위치에 엘리먼트를 찾기 위해 공을 숨긴다.
    let eleBelow = document.elementFromPoint(event.clientX, event.clientY);
    ball.hidden = false; // 엘리먼트를 찾고 나면, 공을 다시 보여준다.
    if (!eleBelow) return;

    let droppableBelow = eleBelow.closest('.droppable');

    function enterDroppable(elem) {
      elem.style.background = 'pink';
    }

    function leaveDroppable(elem) {
      elem.style.background = '';
    }

    if (currentDroppable != droppableBelow) {
      if (currentDroppable) {
        leaveDroppable(currentDroppable);
      }
      currentDroppable = droppableBelow;
      if (currentDroppable) {
        enterDroppable(currentDroppable);
      }
    }
  }

  document.addEventListener('mousemove', onMouseMove);

  ball.onmouseup = function () {
    ball.ondragstart = function () {
      return false;
    };
    document.removeEventListener('mousemove', onMouseMove);
    ball.onmouseup = null;
  };
};
