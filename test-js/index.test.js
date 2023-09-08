const wordCounts = (text) => {
  // 1번째 조건
  //   return [
  //     ['no', 2],
  //     ['pain', 1],
  //     ['gain', 1],
  //   ];

  // 2번째 조건
  //   const counts = {
  //     no: 2,
  //     pain: 1,
  //     gain: 1,
  //   };

  // 3번째 조건
  //   const counts = {};
  //   ['no', 'pain', 'no', 'gain'].forEach((word) => {
  //     counts[word] = (counts[word] || 0) + 1;
  //   });

  const counts = {};
  text.split(' ').forEach((word) => {
    counts[word] = (counts[word] || 0) + 1;
  });

  return Object.entries(counts);
};

const findMostFrequentWord = (text) => {
  const words = wordCounts(text)
    .sort(([, a], [, b]) => b - a)
    .map(([word]) => word);

  return words[0];
};

test('wordCounts는 단어 빈도수를 가진 목록을 반환한다.', () => {
  expect(wordCounts('no pain no gain')).toEqual([
    ['no', 2],
    ['pain', 1],
    ['gain', 1],
  ]);
});

test('findMostFrequentWord는 가장 많이 나온 단어를 반환한다.', () => {
  expect(findMostFrequentWord('no pain no gain')).toBe('no');
});
