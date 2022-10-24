export default function clicked({ figure, cursor, scroll }) {
  if (figure.type === "circle") {
    return clickedCircle({ coordinates: figure.coordinates, cursor, scroll });
  }

  if (figure.type === "rect") {
    return clickedRect({});
  }
}

function clickedCircle({ coordinates, cursor, scroll }) {
  const [x, y, r] = coordinates;
  const distance = Math.sqrt(
    Math.pow(cursor.x + scroll.x - x, 2) + Math.pow(cursor.y + scroll.y - y, 2)
  );
  if (distance <= r) return true;
}

function clickedRect() {}
