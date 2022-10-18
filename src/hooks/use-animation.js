import React from "react";

export default function useAnimate(callback, isStarted) {
  const requestRef = React.useRef();
  const prevTimeRef = React.useRef(0);
  const startTimeRef = React.useRef();
  const currentTimeRef = React.useRef(0);
  const veryBeginingTimeRef = React.useRef(0);

  const fun = React.useCallback(() => {
    // currentTimeRef.current =
    //   prevTimeRef.current + Date.now() - startTimeRef.current;
    callback(Date.now());
    requestRef.current = requestAnimationFrame(fun);
  }, []);

  React.useEffect(() => {
    if (isStarted) {
      // if (!veryBeginingTimeRef.current) {
      //   veryBeginingTimeRef.current = Date.now();
      // }
      console.log("animation");
      // startTimeRef.current = Date.now();
      requestRef.current = requestAnimationFrame(fun);
    } else {
      //запоминаем сколько длилась анимация до паузы
      // prevTimeRef.current = currentTimeRef.current;

      cancelAnimationFrame(requestRef.current);
    }
  }, [isStarted]);

  return {
    startTime: startTimeRef.current,
  };
}
