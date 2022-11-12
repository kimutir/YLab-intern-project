import React, { useCallback } from "react";
import divisibleByFive from "@src/utils/divisible-by-five";
import { useLocation } from "react-router-dom";

function Scroll(props) {
  const [isInitialLoaded, setIsInitialLoaded] = React.useState(false);
  const location = useLocation();

  // loading 1st page
  React.useEffect(() => {
    const query = location.search;
    const pageURL = query?.match(/page=(\d*)&/);
    const limitURL = query?.match(/limit=(\d*)&/);
    const limit = limitURL?.length ? limitURL[1] : 10;
    const page = pageURL?.length ? pageURL[1] : 1;

    if (limit !== 10) {
      props.setNewParams(Number(limit));
    }

    props.onPaginate(Number(page));

    return () => props.onReset && props.onReset();
  }, []);

  // options for observer
  const options = {
    root: props.root.current,
    rootMargin: "0px 0px 0px 0px",
    threshold: 0.1,
  };

  // callback when intersected
  const callback = React.useCallback(
    (entries, observer) => {
      if (
        entries[0].isIntersecting &&
        props.target.current &&
        props.object.params.page * props.object.params.limit <
          props.object.count
      ) {
        const root = props.root.current;
        if (
          !isInitialLoaded &&
          props.target.current?.offsetTop < root.offsetTop + root.clientHeight
        ) {
          const targetHeight = entries[0].boundingClientRect.height;
          const rootHeight = root.clientHeight;
          const initalItemsAmount = Math.ceil(rootHeight / targetHeight) + 2;
          const requestedLimit = divisibleByFive(initalItemsAmount);
          requestedLimit != props.object.params.limit &&
            props.setNewParams(requestedLimit);
          props.onAdditionalLoad(
            props.object.params.limit,
            requestedLimit - props.object.params.limit,
            false
          );
          setIsInitialLoaded(true);
          observer.unobserve(props.target.current);
        } else {
          props.onPaginate(props.object.params.page + 1);
          observer.unobserve(props.target.current);
        }
        setIsInitialLoaded(true);
      }
    },
    [
      props.object.params.page,
      props.target,
      props.object.params.limit,
      isInitialLoaded,
      props.object.items,
      props.root,
    ]
  );

  // subscribe target
  React.useEffect(() => {
    const observer = new IntersectionObserver(callback, options);

    if (props.target.current) {
      observer.unobserve(props.target.current);
    }
    const root = props.root.current;
    if (!isInitialLoaded) {
      props.target.current && observer.observe(props.target.current);
    } else if (
      props.target.current?.offsetTop >
      root.offsetTop + root.clientHeight
    ) {
      props.target.current && observer.observe(props.target.current);
    }
  }, [props.object.items, props.root]);

  return props.children;
}

export default React.memo(Scroll);
