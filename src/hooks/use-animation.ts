import React from "react";

export default function useAnimate(callback: () => void, isStarted: boolean) {
  const requestRef = React.useRef<number>(0);

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
