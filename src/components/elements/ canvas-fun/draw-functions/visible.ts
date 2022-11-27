import { IVisible } from "../type";

export default function visible({ figure, border }: IVisible) {
  if (figure.type === "circle") {
    return visibleCircle({ figure, border });
  }
  if (figure.type === "triangle") {
    return visibleTriangle({ figure, border });
  }
  if (figure.type === "leaf") {
    return visibleLeave({ figure, border });
  }
}

function visibleCircle({ figure, border }: IVisible) {
  const [x, y, r] = figure.coordinates as number[];
  return (
    x - r < border.x2 &&
    x + r > border.x1 &&
    y - r < border.y2 &&
    y + r > border.y1
  );
}
function visibleTriangle({ figure, border }: IVisible) {
  const x: number[] = [];
  const y: number[] = [];
  figure.coordinates.forEach((i) => {
    x.push(i[0]);
    y.push(i[1]);
  });
  const xMax = Math.max(...x);
  const xMin = Math.min(...x);
  const yMax = Math.max(...y);
  const yMin = Math.min(...y);

  return (
    xMin < border.x2 && xMax > border.x1 && yMin < border.y2 && yMax > border.y1
  );
}
function visibleLeave({ figure, border }: IVisible) {
  const [x, y, width] = figure.coordinates as number[];
  return (
    x < border.x2 &&
    x + width > border.x1 &&
    y < border.y2 &&
    y + width > border.y1
  );
}
