import { IClicked, IPrimitiveClicked } from "../type";

export default function clicked({ figure, cursor, scroll, scale }: IClicked) {
  if (figure.type === "circle") {
    return clickedCircle({
      coordinates: figure.coordinates,
      cursor,
      scroll,
      scale,
    });
  }

  if (figure.type === "triangle") {
    return clickedTriangle({
      coordinates: figure.coordinates,
      cursor,
      scroll,
      scale,
    });
  }
  if (figure.type === "leaf") {
    return clickedLeave({
      coordinates: figure.coordinates,
      cursor,
      scroll,
      scale,
    });
  }
}

function clickedCircle({
  coordinates,
  cursor,
  scroll,
  scale,
}: IPrimitiveClicked): boolean {
  const [x, y, r] = coordinates;
  const distance = Math.sqrt(
    Math.pow(cursor.x + scroll.x - x * scale, 2) +
      Math.pow(cursor.y + scroll.y - y * scale, 2)
  );
  if (distance <= r * scale) return true;
  return false;
}

function clickedTriangle({
  coordinates,
  cursor,
  scroll,
  scale,
}: IPrimitiveClicked): boolean {
  const x: number[] = [];
  const y: number[] = [];

  if (coordinates.length) {
    coordinates.forEach((i) => {
      x.push(i[0]);
      y.push(i[1]);
    });
  }

  const a =
    (x[0] * scale - cursor.x - scroll.x) * (y[1] - y[0]) -
    (x[1] - x[0]) * (y[0] * scale - cursor.y - scroll.y);
  const b =
    (x[1] * scale - cursor.x - scroll.x) * (y[2] - y[1]) -
    (x[2] - x[1]) * (y[1] * scale - cursor.y - scroll.y);
  const c =
    (x[2] * scale - cursor.x - scroll.x) * (y[0] - y[2]) -
    (x[0] - x[2]) * (y[2] * scale - cursor.y - scroll.y);
  return Math.sign(a) === Math.sign(b) && Math.sign(b) === Math.sign(c);
}

function clickedLeave({
  coordinates,
  cursor,
  scale,
  scroll,
}: IPrimitiveClicked): boolean {
  const [x, y, width] = coordinates;

  if (
    cursor.x + scroll.x > x * scale &&
    cursor.x + scroll.x < x * scale + width &&
    cursor.y + scroll.y > y * scale &&
    cursor.y + scroll.y < y * scale + width
  ) {
    return true;
  }

  return false;
}
