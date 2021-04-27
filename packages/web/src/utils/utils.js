export const formatTime = (timeInSecond) => {
  let minutes = Math.floor((timeInSecond / 60) % 60);
  minutes = minutes < 10 ? `0${minutes}` : minutes;
  let seconds = Math.floor(timeInSecond % 60);
  seconds = seconds < 10 ? `0${seconds}` : seconds;
  return `${minutes}:${seconds}`;
};

export const calcRemainingTime = (duration, currentTime) => {
  const remainingTime = duration - currentTime;
  return formatTime(remainingTime);
};

export const urlWithQuery = (url, key, value) => {
  return `${url}?${key}=${value}`;
};
