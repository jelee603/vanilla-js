const getWeek = (num) => {
  const week = ['일', '월', '화', '수', '목', '금', '토'];

  return week[num];
};

const padToZero = (number) => {
  return number >= 10 ? `${number}` : `0${number}`;
};

const getToday = () => {
  const currentTime = new Date();
  const MM = currentTime.getMonth() + 1;
  const DD = currentTime.getDate();
  const week = getWeek(currentTime.getDay());
  const hh = currentTime.getHours();
  const mm = currentTime.getMinutes();

  return `${MM}/${DD}(${week}) ${hh}:${padToZero(mm)}`;
};

const getStorageTime = () => {
  return localStorage.getItem('study_timer');
};
const saveStartTime = () => {
  const storageTime = getStorageTime();
  let time = storageTime;
  if (time) {
    const map = storageTime.split(',');
    map.push(getToday());

    localStorage.setItem('study_timer', map.join(','));
  } else {
    localStorage.setItem('study_timer', getToday());
  }
};

const deleteStartTime = () => {
  const storageTime = getStorageTime();
  const map = storageTime.split(',');
  map.splice(0, 1);
  localStorage.setItem('study_timer', map.join(','));
};

const renderList = () => {
  const $list = document.getElementById('list');
  const $fragments = document.createDocumentFragment();
  const colorSet = ['#92a8d1', '#c5b9cd', '#f7cac9', '#eaa8b3', '#dd869c'];
  const colorCount = colorSet.length - 1;
  const storageTime = localStorage.getItem('study_timer');

  // clear
  $list.innerHTML = '';
  if (!storageTime) {
    const $span = document.createElement('span');
    $span.innerText = 'No DATA';
    $fragments.appendChild($span);
  } else {
    const map = storageTime.split(',');
    // const map = new Array(50).fill('test');
    map.forEach((date) => {
      const $el = document.createElement('div');
      $el.innerHTML = date;
      $el.style.backgroundColor =
        colorSet[Math.floor(Math.random() * colorCount)];
      $fragments.append($el);
    });
  }

  $list.appendChild($fragments);
};

export { renderList, saveStartTime, deleteStartTime };
