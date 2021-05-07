export const formatTime = (timeInSecond) => {
  let minutes = Math.floor((timeInSecond / 60) % 60);
  minutes = minutes < 10 ? `0${minutes}` : minutes;
  let seconds = Math.floor(timeInSecond % 60);
  seconds = seconds < 10 ? `0${seconds}` : seconds;
  return isNaN(minutes) || isNaN(seconds) ? "--:--" : `${minutes}:${seconds}`;
};

export const calcRemainingTime = (duration, currentTime) => {
  const remainingTime = duration - currentTime;
  return formatTime(remainingTime);
};

export const urlWithQuery = (url, key, value) => {
  return `${url}?${key}=${value}`;
};

export const formatCollectionTime = (timeInSecond) => {
  const hours = Math.floor(((timeInSecond / 60) % 60) / 60);
  let minutes = Math.floor((timeInSecond / 60) % 60);
  minutes = minutes < 10 ? `0${minutes}` : minutes;
  return hours > 0 ? `${hours}hr ${minutes}min` : `${minutes}min`;
};

export const collectionTime = (collection) => {
  const totalTime = collection.reduce((acc, song) => acc + song.duration, 0);
  return formatCollectionTime(totalTime);
};
