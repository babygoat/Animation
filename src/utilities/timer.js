export default function Timer(fn, t) {
  let timerObj = null;

  const stop = function stopTimer() {
    if (timerObj) {
      clearInterval(timerObj);
      timerObj = null;
    }
  };

  const start = function startTimer() {
    if (!timerObj) {
      stop();
    }
    timerObj = setInterval(fn, t);
  };

  return {
    start,
    stop,
  };
}
