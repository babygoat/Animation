export default function Timer(fn, t) {
  let timerObj;

  const stop = function stop() {
    if (timerObj) {
      clearInterval(timerObj);
      timerObj = null;
    }
  };

  const start = function start() {
    if (!timerObj) {
      this.stop();
      timerObj = setInterval(fn, t);
    }
  };

  return {
    start,
    stop,
  };
}
