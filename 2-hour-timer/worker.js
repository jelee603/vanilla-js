let timer;
onmessage = function (e) {
  let delay = 1000;

  if (e.data === 'start') {
    timer = setInterval(() => {
      this.postMessage(null);
    }, delay);
  } else if ((e.data = 'stop')) {
    clearInterval(timer);
  }
};
