const btnMessage = document.getElementById('btn-message');
const btnSpinner = document.getElementById('btn-spinner');
const spinner = document.getElementById('spinner');
const dialog = document.getElementById('favDialog');

const handleMessage = () => {
  alert('메세지 2 (이벤트 삭제됨)');
};

btnMessage.addEventListener('click', () => alert('메세지 1 (한번만 실행)'), {
  once: true,
});
btnMessage.addEventListener('click', handleMessage);
btnMessage.addEventListener('click', () => {
  alert('메세지 3');
  btnMessage.removeEventListener('click', handleMessage);
});

let interval = 0;
let timer = 0;
const LIMIT_SEC = 5;

const intervalFunc = () => {
  if (timer === LIMIT_SEC) {
    // end
    clearInterval(interval);
    document.dispatchEvent(new CustomEvent('busy', { detail: false }));
    btnSpinner.disabled = false;
    btnSpinner.innerText = '클릭(spinner)';
    dialog.close();
    timer = null;
  } else {
    btnSpinner.innerText = `${LIMIT_SEC - timer}초`;
  }
  if (timer === 0) {
    // start
    document.dispatchEvent(new CustomEvent('busy', { detail: true }));
    btnSpinner.disabled = true;
    dialog.showModal();
  }

  timer += 1;
};

const showSpinner = () => {
  spinner.classList.add('spinner');
};

const hiddenSpinner = () => {
  spinner.classList.remove('spinner');
};

document.addEventListener('busy', (e) => {
  if (e.detail) {
    showSpinner();
  } else {
    hiddenSpinner();
  }
});

const debounce = (func, delay) => {
  let timerId;

  return function (...args) {
    clearTimeout(timerId);
    timerId = setTimeout(() => {
      func(...args);
    }, delay);
  };
};

const handleClick = () => {
  timer = 0;
  interval = setInterval(intervalFunc, 1000);
};

const debounceClickHandler = debounce(handleClick, 300);

btnSpinner.addEventListener('click', debounceClickHandler);
