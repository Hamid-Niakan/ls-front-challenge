export const useLazyCaller = (timerInstance = 0) => {
  let timerInstanceList = []

  function lazyCaller(callback, time = 200) {
    if (!time) return callback()
    clearTimeout(timerInstanceList[timerInstance])
    timerInstanceList[timerInstance] = setTimeout(() => {
      callback()
    }, time);
  }

  function abortLazyCall() {
    clearTimeout(timerInstanceList[timerInstance])
  }

  return { lazyCaller, abortLazyCall }
}