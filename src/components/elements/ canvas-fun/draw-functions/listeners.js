export function addListener({ dom, callbacks }) {
  dom.addEventListener(e, callbacks);
  //   callbacks.forEach((callback) => dom.addEventListener(e, callback));
}

export function removeListener({ dom, callbacks }) {
  callbacks.forEach((callback) => dom.removeEvenListener(e, callback));
}
