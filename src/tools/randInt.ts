const randInt = (_min: number, _max: number) => {
  const min = Math.ceil(_min);
  const max = Math.floor(_max);

  return Math.floor(Math.random() * (max - min)) + min;
};

export default randInt;
