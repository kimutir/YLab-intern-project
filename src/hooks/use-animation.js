import throttle from "lodash.throttle";
import React from "react";

export default function useAnimate(callback, isStarted, limit = 0) {
  const requestRef = React.useRef();
  const prevTimeRef = React.useRef(0);
  const startTimeRef = React.useRef();
  const currentTimeRef = React.useRef(0);
  const veryBeginingTimeRef = React.useRef(0);

  const animate = React.useCallback(
    throttle(() => {
      currentTimeRef.current =
        prevTimeRef.current + Date.now() - startTimeRef.current;
      callback(currentTimeRef.current);
      requestRef.current = requestAnimationFrame(animate);
    }, limit),
    []
  );

  React.useEffect(() => {
    if (isStarted) {
      if (!veryBeginingTimeRef.current) {
        veryBeginingTimeRef.current = Date.now();
      }
      startTimeRef.current = Date.now();
      requestRef.current = requestAnimationFrame(animate);
    } else {
      //запоминаем сколько длилась анимация до паузы
      prevTimeRef.current = currentTimeRef.current;

      cancelAnimationFrame(requestRef.current);
    }
  }, [isStarted]);

  return {
    startTime: veryBeginingTimeRef.current,
  };
}
