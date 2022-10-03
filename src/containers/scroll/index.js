import React, { useCallback } from "react";
import divisibleByFive from "@src/utils/divisible-by-five";

function Scroll(props) {
  const [isInitialLoaded, setIsInitialLoaded] = React.useState(false);

  // loading 1st page
  React.useEffect(() => {
    props.onInitialLoadItems(props.params);
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
            props.onPaginate(
              props.object.params.page,
              props.object.params.limit,
              requestedLimit - props.object.params.limit
            );
          setIsInitialLoaded(true);

          props.setNewParams(requestedLimit);
          observer.unobserve(props.target.current);
        } else {
          props.onPaginate(
            props.object.params.page + 1,
            props.object.params.page * props.object.params.limit,
            props.object.params.limit
          );

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

// scroll with element measures
// const handleScroll = React.useCallback((event) => {
//   if (
//     event.target.scrollHeight -
//       (event.target.clientHeight + event.target.scrollTop) <
//     200
//   ) {
//     setLoad(true);
//   }
// }, []);

// const paginationFunc = React.useCallback(async () => {
//   await callbacks.onPaginate({ page });
//   setPage((prev) => prev + 1);
//   setLoad(false);
// }, [page]);

// loading items
// React.useEffect(() => {
//   if (load) {
//     paginationFunc();
//   }
// }, [load]);
