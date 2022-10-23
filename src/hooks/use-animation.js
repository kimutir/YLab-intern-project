import React from "react";

export default function useAnimate(callback, isStarted) {
  const requestRef = React.useRef();

  const fun = React.useCallback(() => {
    callback();
    requestRef.current = requestAnimationFrame(fun);
  }, []);

  React.useEffect(() => {
    if (isStarted) {
      requestRef.current = requestAnimationFrame(fun);
    } else {
      cancelAnimationFrame(requestRef.current);
    }
  }, [isStarted]);
}
