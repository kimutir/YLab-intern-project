import React from "react";

export default function useAnimate(callback, isStarted) {
  const requestRef = React.useRef();
  const prevTimeRef = React.useRef(0);
  const startTimeRef = React.useRef();
  const currentTimeRef = React.useRef(0);

  const animate = React.useCallback((time) => {
    currentTimeRef.current =
      prevTimeRef.current + Date.now() - startTimeRef.current;
    callback(currentTimeRef.current);
    requestRef.current = requestAnimationFrame(animate);
  }, []);

  React.useEffect(() => {
    if (isStarted) {
      startTimeRef.current = Date.now();
      requestRef.current = requestAnimationFrame(animate);
    } else {
      prevTimeRef.current = currentTimeRef.current;
      cancelAnimationFrame(requestRef.current);
    }
  }, [isStarted]);

  return { startTime: startTimeRef.current };
}
